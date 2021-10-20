import { Component, OnInit, OnDestroy } from '@angular/core';
import { ngIfAnimation } from '../_animations/ng-if-animation.animation';
import { Invoice } from '../_models/invoice';
import { InvoiceService } from '../_services/invoice.service';

@Component({
  selector: 'app-invoice-overview',
  templateUrl: './invoice-overview.component.html',
  styleUrls: ['./invoice-overview.component.scss'],
  animations: [ngIfAnimation],
})
export class InvoiceOverviewComponent implements OnInit {
  private invoices: Invoice[] = [];
  public filteredInvoices: Invoice[] = [];
  public isMobile: boolean = true;
  public showInvoiceForm: boolean = false;
  private mediaQuery = window.matchMedia('(min-width: 45em)');

  constructor(private invoiceService: InvoiceService) {
    this.mediaQuery.addEventListener("change", (e) => {
      e.matches ? this.isMobile = false : this.isMobile = true;
    });
    if (this.mediaQuery.matches) this.isMobile = false;
  }

  ngOnInit(): void {
    this.getInvoices();
  }

  public addInvoice() {
    this.showInvoiceForm = true;
  }

  public closeForm(invoice: Invoice) {    
    if (invoice) this.getInvoices();
    this.showInvoiceForm = false;
  }

  public trackByFn(index: any, item: any) {
    return item.id;
  }

  private getInvoices() {
    this.invoiceService.getInvoices().subscribe(resp => {
      this.invoices = resp;
      this.filteredInvoices = Object.assign([], this.invoices);
    });
  }

  public onChangeFilter(event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    if (status === 'All') {
      this.filteredInvoices = this.invoices;
    } else {
      this.filteredInvoices = this.invoices.filter(invoice => invoice.status === status);
    }
  }

}
