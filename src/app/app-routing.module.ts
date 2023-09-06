import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxCalculatorComponent } from './tax-calculator/tax-calculator.component';

const routes: Routes = [
  { path: '', component: TaxCalculatorComponent, data: {title : 'Home'} },
  { path: 'calculator', component: TaxCalculatorComponent, data: {title : 'Home'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
