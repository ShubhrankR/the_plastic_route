import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankBadgeComponent } from './bank-badge';
import { describe, it, expect, beforeEach } from 'vitest';

describe('BankBadgeComponent', () => {
  let component: BankBadgeComponent;
  let fixture: ComponentFixture<BankBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BankBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should map HDFC Bank to hdfc.svg', () => {
    fixture.componentRef.setInput('bank', 'HDFC Bank');
    fixture.detectChanges();

    const details = component.bankDetails();
    expect(details.name).toBe('HDFC Bank');
    expect(details.iconPath).toContain('hdfc.svg');
  });

  it('should map SBI Card to sbi.svg', () => {
    fixture.componentRef.setInput('bank', 'SBI Card');
    fixture.detectChanges();

    const details = component.bankDetails();
    expect(details.name).toBe('SBI Card');
    expect(details.iconPath).toContain('sbi.svg');
  });

  it('should map ICICI Bank to icici.svg', () => {
    fixture.componentRef.setInput('bank', 'ICICI Bank');
    fixture.detectChanges();

    const details = component.bankDetails();
    expect(details.name).toBe('ICICI Bank');
    expect(details.iconPath).toContain('icici.svg');
  });

  it('should map Axis Bank to axis.svg', () => {
    fixture.componentRef.setInput('bank', 'Axis Bank');
    fixture.detectChanges();

    const details = component.bankDetails();
    expect(details.name).toBe('Axis Bank');
    expect(details.iconPath).toContain('axis.svg');
  });

  it('should map IDFC FIRST Bank to idfc.svg', () => {
    fixture.componentRef.setInput('bank', 'IDFC FIRST Bank');
    fixture.detectChanges();

    const details = component.bankDetails();
    expect(details.name).toBe('IDFC FIRST');
    expect(details.iconPath).toContain('idfc.svg');
  });

  it('should fallback unknown bank to generic.svg', () => {
    fixture.componentRef.setInput('bank', 'Custom Neobank');
    fixture.detectChanges();

    const details = component.bankDetails();
    expect(details.iconPath).toContain('generic.svg');
  });
});
