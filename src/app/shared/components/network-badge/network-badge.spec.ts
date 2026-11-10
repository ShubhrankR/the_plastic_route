import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkBadgeComponent } from './network-badge';
import { describe, it, expect, beforeEach } from 'vitest';

describe('NetworkBadgeComponent', () => {
  let component: NetworkBadgeComponent;
  let fixture: ComponentFixture<NetworkBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should render Visa icon for Visa cards', () => {
    fixture.componentRef.setInput('network', 'Visa');
    fixture.detectChanges();

    const items = component.networkItems();
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Visa');
    expect(items[0].iconPath).toContain('visa.svg');
  });

  it('should render Mastercard icon for Mastercard cards', () => {
    fixture.componentRef.setInput('network', 'Mastercard');
    fixture.detectChanges();

    const items = component.networkItems();
    expect(items.length).toBe(1);
    expect(items[0].iconPath).toContain('mastercard.svg');
  });

  it('should render RuPay icon for RuPay cards', () => {
    fixture.componentRef.setInput('network', 'RuPay');
    fixture.detectChanges();

    const items = component.networkItems();
    expect(items.length).toBe(1);
    expect(items[0].iconPath).toContain('rupay.svg');
  });

  it('should render Amex icon for American Express cards', () => {
    fixture.componentRef.setInput('network', 'Amex');
    fixture.detectChanges();

    const items = component.networkItems();
    expect(items.length).toBe(1);
    expect(items[0].iconPath).toContain('amex.svg');
  });

  it('should render Diners Club icon for Diners Club cards', () => {
    fixture.componentRef.setInput('network', 'Diners Club');
    fixture.detectChanges();

    const items = component.networkItems();
    expect(items.length).toBe(1);
    expect(items[0].iconPath).toContain('diners.svg');
  });

  it('should render multiple icons for multi-network cards (Visa / RuPay)', () => {
    fixture.componentRef.setInput('network', 'Visa / RuPay');
    fixture.detectChanges();

    const items = component.networkItems();
    expect(items.length).toBe(2);
    expect(items[0].name).toBe('Visa');
    expect(items[0].iconPath).toContain('visa.svg');
    expect(items[1].name).toBe('RuPay');
    expect(items[1].iconPath).toContain('rupay.svg');
  });
});
