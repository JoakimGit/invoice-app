import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceOverviewComponent } from './invoice-overview/invoice-overview.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceOverviewComponent,
    SidebarComponent,
    AddEditInvoiceComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
