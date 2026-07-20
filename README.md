# 💳 The Plastic Route

An open-source, lightweight, privacy-first credit card spend optimizer and billing cycle tracker. 

Unlike closed ecosystems that scrape your SMS data or demand heavy permissions, **The Plastic Route** runs entirely in the browser, stores no personal financial data on servers, and lets *you* map the ultimate mathematical route for your wallet.

## 🚀 Live Demo
[Deploy your link here via GitHub Pages or Antigravity]

## ✨ Features
*   **Spend Optimizer:** Quick lookup tool to instantly see which primary or backup card to swipe based on the purchase category (Amazon, Fuel, Forex, UPI, etc.).
*   **Billing Cycle Tracker:** Real-time analysis of statement dates. Instantly see if a transaction today hits your *current bill* or safely rolls over to the *next bill* for maximum interest-free leverage.
*   **Privacy-First:** Zero backend, zero cookies, zero tracking. 

## 🛠️ Project Architecture
The project is intentionally kept simple using standard web technologies so that anyone can run it locally or host it instantly:
*   HTML5 / CSS3 (Bootstrap 5)
*   jQuery (DOM manipulation and date calculations)

## 🤝 How to Contribute (The Open-Source Way)
Banking rules, reward points, and lounge access thresholds change constantly. We rely on the community to keep this matrix sharp and updated.

### Adding or Updating Card Logic
The core spending matrix is driven by a single object in the script tag. If a bank changes its policy or you want to add a new category killer:
1. Fork this repository.
2. Update the `cardLogic` structure in `index.html`.
3. Open a Pull Request!

*Future Roadmap: Moving the card definitions to a separate `cards.json` file to make contributions even easier.*

## 📜 License
MIT License - feel free to fork, modify, and use it for your own portfolio.