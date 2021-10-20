import { Component, OnInit } from '@angular/core';
import { ngIfAnimation } from '../_animations/ng-if-animation.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../_models/invoice';
import { InvoiceService } from '../_services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
  animations: [ngIfAnimation],
})
export class InvoiceDetailsComponent implements OnInit {
  public selectedInvoice: Invoice;
  public showInvoiceForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    if (id) {
      this.invoiceService.getInvoice(id).subscribe(resp => {
        console.log(resp);
        this.selectedInvoice = resp;
      });
    }
  }

  public editInvoice() {
    this.showInvoiceForm = true;
  }

  public deleteInvoice() {
    this.invoiceService.deleteInvoice(this.selectedInvoice.id).subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }

  public payInvoice() {
    this.invoiceService.markInvoiceAsPaid(this.selectedInvoice.id).subscribe(() => this.selectedInvoice.status = "Paid");
  }

  public closeForm(invoice: Invoice) {
    if (invoice) this.selectedInvoice = invoice;
    this.showInvoiceForm = false;
  }

}
