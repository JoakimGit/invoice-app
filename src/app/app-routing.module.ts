import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceOverviewComponent } from './invoice-overview/invoice-overview.component';

const routes: Routes = [
  { path: '', component: InvoiceOverviewComponent },
  { path: 'details/:id', component: InvoiceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
