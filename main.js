$(document).ready(function() {
    let cardData = [];

    function updateThemeButton(theme) {
        if (theme === 'light') {
            $('#themeToggleBtn').html('🌙 Dark Mode').removeClass('btn-outline-light').addClass('btn-outline-dark');
        } else {
            $('#themeToggleBtn').html('☀️ Light Mode').removeClass('btn-outline-dark').addClass('btn-outline-light');
        }
    }

    // Initialize application
    function init() {
        // Theme Toggle Logic
        const currentTheme = localStorage.getItem('theme') || 'dark';
        $('body').attr('data-theme', currentTheme);
        updateThemeButton(currentTheme);

        $('#themeToggleBtn').on('click', function() {
            const newTheme = $('body').attr('data-theme') === 'dark' ? 'light' : 'dark';
            $('body').attr('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);
        });

        // Fetch cards configuration
        $.getJSON('cards.json', function(data) {
            cardData = data;
            populatePortfolioTable();
        }).fail(function(jqxhr, textStatus, error) {
            console.error("Failed to load cards.json:", textStatus, error);
            $('#results-placeholder').html('<h5 class="text-danger">Failed to load configuration. Please check local server.</h5>');
        });

        // Bind form submission
        $('#optimizer-form').on('submit', handleOptimization);
    }

    // Populate the dashboard table
    function populatePortfolioTable() {
        const $tbody = $('#portfolio-table tbody');
        $tbody.empty();

        cardData.forEach(card => {
            const tr = `
                <tr>
                    <td class="fw-semibold">
                        ${card.name}
                        <br><span class="badge bg-secondary opacity-75 fw-normal">${card.network}</span>
                    </td>
                    <td class="small opacity-75">${card.optimizationVector}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <span class="fs-6 me-2">${card.billingCycleStart}</span>
                            <span class="text-muted small">to</span>
                            <span class="fs-6 ms-2">${card.billingCycleEnd}</span>
                        </div>
                    </td>
                </tr>
            `;
            $tbody.append(tr);
        });
    }

    // Handle form submission and run optimization logic
    function handleOptimization(e) {
        e.preventDefault();
        
        if (cardData.length === 0) return;

        const amount = parseFloat($('#txAmount').val());
        const category = $('#txCategory').val();
        
        const today = new Date();
        const currentDay = today.getDate();

        // Exact mapping from reference logic
        const categoryMap = {
            amazon: { primaryId: "amazon_pay_icici", backupId: "federal_one_metal" },
            flipkart: { primaryId: "sbi_flipkart", backupId: "federal_one_metal" },
            bpcl: { primaryId: "sbi_bpcl_octane", backupId: "hdfc_indian_oil" },
            other_fuel: { primaryId: "hdfc_indian_oil", backupId: "sbi_bpcl_octane" },
            upi: { primaryId: "yes_bank_rupay", backupId: "hdfc_indian_oil" },
            forex: { primaryId: "bobcard_scapia", backupId: "federal_one_metal" },
            dining_travel: { primaryId: "idfc_first_wealth", backupId: "federal_one_metal" },
            gaming_wallet: { primaryId: "federal_one_metal", backupId: "idfc_first_wealth" },
            general: { primaryId: "idfc_first_wealth", backupId: "federal_one_metal" }
        };

        const route = categoryMap[category] || categoryMap.general;
        
        const bestCard = cardData.find(c => c.id === route.primaryId) || cardData[0];
        const backupCard = cardData.find(c => c.id === route.backupId) || cardData[1];

        // Calculate roughly how many days until the next bill is generated
        let daysUntilBill = bestCard.billingCycleStart - currentDay;
        if (daysUntilBill <= 0) daysUntilBill += 30; // Approximation
        let maxDays = daysUntilBill + 20; // Grace period

        let reason = bestCard.optimizationVector;
        if (bestCard.regulatoryUpdate) {
            reason += `<br><strong class="text-warning mt-2 d-block">🚨 Rule Change:</strong> <span class="text-muted">${bestCard.regulatoryUpdate}</span>`;
        }
        reason += `<br><span class="d-block mt-2 small opacity-75">Backup Card: ${backupCard.name}</span>`;

        renderResults(bestCard, maxDays, reason);
    }

    // Render results to the UI
    function renderResults(card, days, reason) {
        $('#results-placeholder').addClass('d-none');
        $('#results-container').removeClass('d-none').addClass('fade-in');

        // Reset animation
        setTimeout(() => $('#results-container').removeClass('fade-in'), 400);

        $('#recommended-card-name').text(card.name);
        $('#recommended-card-reason').text(reason);
        
        // Animate numbers
        $({ countNum: 0 }).animate({ countNum: days }, {
            duration: 1000,
            easing: 'swing',
            step: function() {
                $('#interest-free-days').html(Math.floor(this.countNum) + ' <span class="fs-6 fw-normal">days</span>');
            },
            complete: function() {
                $('#interest-free-days').html(this.countNum + ' <span class="fs-6 fw-normal">days</span>');
            }
        });

        // Calculate approximate due date
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + days);
        $('#due-date').text(dueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));

        // Lounge status
        if (card.loungeAccess.eligible) {
            let req = card.loungeAccess.spendThreshold > 0 ? `(Spend Req: ₹${card.loungeAccess.spendThreshold})` : '(No Spend Req)';
            $('#lounge-status').html(`<span class="text-success">Eligible</span> <span class="small text-muted fw-normal d-block mt-1">${req}</span>`);
        } else {
            $('#lounge-status').html('<span class="text-danger">Not Eligible</span>');
        }
    }

    // Boot
    init();
});
