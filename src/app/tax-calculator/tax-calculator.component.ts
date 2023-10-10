import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss']
})
export class TaxCalculatorComponent implements OnInit {

  filing_status = 'Single';
  standard_deduction = 13850;
  gross_income = 90000;
  taxable_income = this.gross_income - this.standard_deduction;
  state_taxable_income = this.gross_income - 2000;
  estimated_taxes: number | undefined;
  estimated_state_taxes: number | undefined;
  taxesCalculated: boolean = false;
  estimated_social_security_taxes : number | undefined;
  estimated_medicare_taxes : number | undefined;
  estimated_employer_fica_contribution : number | undefined;
  estimated_total_taxes : number | undefined;
  estimated_net_income : number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  updateStandardDeduction() {
    switch (this.filing_status) {
      case 'Single':
        this.standard_deduction = 13850;
        break;
      case 'Married Filing Separately':
        this.standard_deduction = 13850;
        break;
      case 'Married Filing Jointly':
        this.standard_deduction = 27700;
        break;
    }
    this.updateTaxableIncome();
  }

  updateTaxableIncome() {
    if (this.gross_income > this.standard_deduction) {
      this.taxable_income = this.gross_income - this.standard_deduction;
      this.state_taxable_income = this.gross_income - 2000;
    }
  }

  calculateTaxes() {
    this.taxesCalculated = true;
    this.calculateStateTaxes();
    this.calculateFica();
    if (this.taxable_income > 11000) {
      this.estimated_taxes = 1100;
      if (this.taxable_income > 44725) {
        this.estimated_taxes += 4047;
      } else {
        this.estimated_taxes += Math.round((this.taxable_income - 11000) * .12);
        this.calculateTotalTaxes();
        return;
      }
      if (this.taxable_income > 95375) {
        this.estimated_taxes += 11143;
      } else {
        this.estimated_taxes += Math.round((this.taxable_income - 44725) * .22);
        this.calculateTotalTaxes();
        return;
      }
    } else {
      this.estimated_taxes = Math.round(this.taxable_income * .10);
      this.calculateTotalTaxes();
      return;
    }
    this.calculateTotalTaxes();
  }

  calculateStateTaxes(){
    if (this.state_taxable_income > 5000) {
      this.estimated_state_taxes = 118;
      if (this.state_taxable_income > 12500) {
        this.estimated_state_taxes += 236.25;
      } else {
        this.estimated_state_taxes += Math.round((this.state_taxable_income - 5000) * .0315);
        return;
      }
      if (this.state_taxable_income > 20000) {
        this.estimated_state_taxes += 265.5;
      } else {
        this.estimated_state_taxes += Math.round((this.state_taxable_income - 12500) * .0354);
        return;
      }
      if (this.state_taxable_income > 30000) {
        this.estimated_state_taxes += 472;
        this.estimated_state_taxes += Math.round((this.state_taxable_income - 30000) * .0512);
      } else {
        this.estimated_state_taxes += Math.round((this.state_taxable_income - 20000) * .0472);
        return;
      }
    } else {
      this.estimated_state_taxes = Math.round(this.state_taxable_income * .0236);
      return;
    }
  }

  calculateFica(){
    this.estimated_social_security_taxes = this.gross_income * .124;
    this.estimated_medicare_taxes = this.gross_income * .029;
    this.estimated_employer_fica_contribution = this.estimated_social_security_taxes * .5;
    this.estimated_employer_fica_contribution += this.estimated_medicare_taxes * .5;
  }

  calculateTotalTaxes(){
    this.estimated_total_taxes = (this.estimated_state_taxes ?? 0) + (this.estimated_social_security_taxes ?? 0) + (this.estimated_medicare_taxes ?? 0) + (this.estimated_taxes ?? 0) - (this.estimated_employer_fica_contribution ?? 0);
    this.estimated_net_income = this.gross_income - this.estimated_total_taxes;
  }
  resetData() {
    this.estimated_taxes = undefined;
    this.taxesCalculated = false;
  }

}
