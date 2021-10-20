import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InvoiceOverviewComponent } from './invoice-overview/invoice-overview.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

import { HeaderInterceptor } from './_interceptors/header-interceptor';

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
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
