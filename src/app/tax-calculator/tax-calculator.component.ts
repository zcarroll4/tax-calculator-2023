import { Component, OnInit } from '@angular/core';
import { resourceUsage } from 'process';

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss']
})
export class TaxCalculatorComponent implements OnInit {

  filing_state: string | undefined;
  filing_status: string | undefined;
  tax_year: | number | undefined;
  standard_deduction: number | undefined;
  gross_income: number | undefined;
  self_employment_income: number | undefined;
  taxable_income: number | undefined;
  state_taxable_income: number | undefined;
  estimated_taxes: number | undefined;
  estimated_state_taxes: number | undefined;
  traditional_retirement_contributions: number | undefined;
  hsa_contributions: number | undefined;
  taxesCalculated: boolean = false;
  hasSelfEmploymentIncome: boolean = false;
  hasRetirementContributions: boolean = false;
  hasHSAContributions: boolean = false;
  estimated_social_security_taxes: number | undefined;
  estimated_medicare_taxes: number | undefined;
  estimated_self_employed_social_security_taxes: number | undefined;
  estimated_self_employed_medicare_taxes: number | undefined;
  estimated_employer_fica_contribution: number | undefined;
  estimated_total_taxes: number | undefined;
  estimated_net_income: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.filing_state = 'WV';
    this.tax_year = 2023;
  }

  updateStandardDeduction() {
    if (this.tax_year == 2023) {
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
    }
    if (this.tax_year == 2022) {
      switch (this.filing_status) {
        case 'Single':
          this.standard_deduction = 12950;
          break;
        case 'Married Filing Separately':
          this.standard_deduction = 12950;
          break;
        case 'Married Filing Jointly':
          this.standard_deduction = 25900;
          break;
      }
    }
  }

  updateTaxableIncome() {
    if (!this.gross_income) return;
    if (!this.standard_deduction) return;
    if (!this.self_employment_income) {
      this.taxable_income = this.gross_income - this.standard_deduction -(this.traditional_retirement_contributions ?? 0) - (this.hsa_contributions ?? 0);
      this.state_taxable_income = this.gross_income - 2000 -(this.traditional_retirement_contributions ?? 0) - (this.hsa_contributions ?? 0);
    } else {
      this.taxable_income = +this.gross_income + +this.self_employment_income - this.standard_deduction -(this.traditional_retirement_contributions ?? 0) - (this.hsa_contributions ?? 0);
      this.state_taxable_income = +this.gross_income + +this.self_employment_income - 2000 -(this.traditional_retirement_contributions ?? 0) - (this.hsa_contributions ?? 0);
    }
  }

  calculateSelfEmploymentIncome() {
    this.hasSelfEmploymentIncome = true;
  }

  toggleRetirementContributions(){
    this.hasRetirementContributions = true;
  }

  toggleHSAContributions(){
    this.hasHSAContributions = true;
  }

  calculateTaxes() {
    //debug
    this.updateStandardDeduction();
    this.updateTaxableIncome();
    console.log(this.gross_income);
    console.log(this.standard_deduction);
    console.log(this.taxable_income);
    console.log(this.gross_income);
    console.log(this.state_taxable_income);
    console.log(this.filing_status);
    console.log(this.tax_year);
    console.log(this.self_employment_income);
    
    if (!this.taxable_income) return;
    if (this.hasSelfEmploymentIncome && !this.self_employment_income) this.hasSelfEmploymentIncome = false;
    this.taxesCalculated = true;
    this.calculateStateTaxes();
    this.calculateFica();
    if (this.tax_year == 2023) {
      if (this.filing_status == 'Single' || this.filing_status == 'Married Filing Separately') {
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
          if (this.taxable_income > 182100) {
            this.estimated_taxes += 20814;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 95375) * .24);
            this.calculateTotalTaxes();
            return;
          }
        } else {
          this.estimated_taxes = Math.round(this.taxable_income * .10);
          this.calculateTotalTaxes();
          return;
        }
      } else if (this.filing_status == 'Married Filing Jointly') {
        if (this.taxable_income > 22000) {
          this.estimated_taxes = 2200;
          if (this.taxable_income > 89450) {
            this.estimated_taxes += 8094;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 22000) * .12);
            this.calculateTotalTaxes();
            return;
          }
          if (this.taxable_income > 190750) {
            this.estimated_taxes += 22286;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 89450) * .22);
            this.calculateTotalTaxes();
            return;
          }
          if (this.taxable_income > 364200) {
            this.estimated_taxes += 41628;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 190750) * .24);
            this.calculateTotalTaxes();
            return;
          }
        } else {
          this.estimated_taxes = Math.round(this.taxable_income * .10);
          this.calculateTotalTaxes();
          return;
        }
      }
    }
    if (this.tax_year == 2022) {
      if (this.filing_status == 'Single' || this.filing_status == 'Married Filing Separately') {
        if (this.taxable_income > 10275) {
          this.estimated_taxes = 1027.5;
          if (this.taxable_income > 41775) {
            this.estimated_taxes += 3780;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 10275) * .12);
            this.calculateTotalTaxes();
            return;
          }
          if (this.taxable_income > 89075) {
            this.estimated_taxes += 10406;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 41775) * .22);
            this.calculateTotalTaxes();
            return;
          }
          if (this.taxable_income > 170050) {
            this.estimated_taxes += 19434;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 89075) * .24);
            this.calculateTotalTaxes();
            return;
          }
        } else {
          this.estimated_taxes = Math.round(this.taxable_income * .10);
          this.calculateTotalTaxes();
          return;
        }
      } else if (this.filing_status == 'Married Filing Jointly') {
        if (this.taxable_income > 20550) {
          this.estimated_taxes = 2055;
          if (this.taxable_income > 83550) {
            this.estimated_taxes += 7560;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 20550) * .12);
            this.calculateTotalTaxes();
            return;
          }
          if (this.taxable_income > 178150) {
            this.estimated_taxes += 20812;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 83550) * .22);
            this.calculateTotalTaxes();
            return;
          }
          if (this.taxable_income > 340100) {
            this.estimated_taxes += 38868;
          } else {
            this.estimated_taxes += Math.round((this.taxable_income - 178150) * .24);
            this.calculateTotalTaxes();
            return;
          }
        } else {
          this.estimated_taxes = Math.round(this.taxable_income * .10);
          this.calculateTotalTaxes();
          return;
        }
      }
    }
  }

  calculateStateTaxes() {
    if (!this.state_taxable_income) return;
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

  calculateFica() {
    if (!this.gross_income) return;
    this.estimated_social_security_taxes = this.gross_income * .062;
    this.estimated_medicare_taxes = this.gross_income * .0145;

    if (this.self_employment_income) {
      this.estimated_self_employed_social_security_taxes = this.self_employment_income * .124; //self employed
      this.estimated_self_employed_medicare_taxes = this.self_employment_income * .029; //self employed

      this.estimated_social_security_taxes += this.estimated_self_employed_social_security_taxes;
      this.estimated_medicare_taxes += this.estimated_self_employed_medicare_taxes;

    }

    // this.estimated_employer_fica_contribution = this.estimated_social_security_taxes * .5;
    // this.estimated_employer_fica_contribution += this.estimated_medicare_taxes * .5;
  }

  calculateTotalTaxes() {
    if (!this.gross_income) return;
    // this.estimated_total_taxes = (this.estimated_state_taxes ?? 0) + (this.estimated_social_security_taxes ?? 0) + (this.estimated_medicare_taxes ?? 0) + (this.estimated_taxes ?? 0) - (this.estimated_employer_fica_contribution ?? 0);
    this.estimated_total_taxes = (this.estimated_state_taxes ?? 0) + (this.estimated_social_security_taxes ?? 0) + (this.estimated_medicare_taxes ?? 0) + (this.estimated_taxes ?? 0);
    this.estimated_net_income = this.gross_income - this.estimated_total_taxes;
  }


  resetData() {
    this.estimated_taxes = undefined;
    this.taxesCalculated = false;
    if(!this.self_employment_income) this.hasSelfEmploymentIncome = false;
    if(!this.traditional_retirement_contributions) this.hasRetirementContributions = false;
    if(!this.hsa_contributions) this.hasHSAContributions = false;
    
  }

}
