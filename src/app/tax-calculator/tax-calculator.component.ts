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
  estimated_taxes: number | undefined;
  taxesCalculated: boolean = false;

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
    }
  }

  calculateTaxes() {
    this.taxesCalculated = true;
    if (this.taxable_income > 11000) {
      this.estimated_taxes = 1100;
      if (this.taxable_income > 44725) {
        this.estimated_taxes += 4047;
      } else {
        this.estimated_taxes += Math.round((this.taxable_income - 11000) * .12);
        return;
      }
      if (this.taxable_income > 95375) {
        this.estimated_taxes += 11143;
      } else {
        this.estimated_taxes += Math.round((this.taxable_income - 44725) * .22);
        return;
      }
    } else {
      this.estimated_taxes = Math.round(this.taxable_income * .10);
      return;
    }
  }

  resetData() {
    this.estimated_taxes = undefined;
    this.taxesCalculated = false;
  }

}
