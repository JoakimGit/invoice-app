import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { slideInOutAnimation } from '../_animations/slide-in-out.animation';
import { Invoice } from '../_models/invoice';
import { Product } from '../_models/product';
import { InvoiceService } from '../_services/invoice.service';

@Component({
  selector: 'add-edit-invoice',
  templateUrl: './add-edit-invoice.component.html',
  styleUrls: ['./add-edit-invoice.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class AddEditInvoiceComponent implements OnInit {
  @Input() selectedInvoice: Invoice;
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();
  public invoiceItems: Product[] = [];
  public itemsForm: FormGroup;
  public invoiceForm: FormGroup;
  public title: string;
  public isAddMode: boolean = true;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    if (this.selectedInvoice) {
      this.isAddMode = false;
      this.invoiceItems = this.selectedInvoice.items;
    }
    else {
      this.selectedInvoice = new Invoice();
    }
    this.isAddMode ? this.title = this.title = "New Invoice" : "Edit Invoice";

    this.createFormGroups();
  }

  private createFormGroups() {
    this.invoiceForm = this.fb.group({
      billerStreetAddress: [this.selectedInvoice.billerStreetAddress],
      billerCity: [this.selectedInvoice.billerCity],
      billerPostalCode: [this.selectedInvoice.billerPostalCode],
      billerCountry: [this.selectedInvoice.billerCountry],
      clientName: [this.selectedInvoice.clientName],
      clientEmail: [this.selectedInvoice.clientEmail],
      clientStreetAddress: [this.selectedInvoice.clientStreetAddress],
      clientCity: [this.selectedInvoice.clientCity],
      clientPostalCode: [this.selectedInvoice.clientPostalCode],
      clientCountry: [this.selectedInvoice.clientCountry],
      invoiceDate: [{ value: this.selectedInvoice.invoiceDate, disabled: true }],
      paymentTerms: [this.selectedInvoice.paymentTerms],
      productDescription: [this.selectedInvoice.billerStreetAddress]
    });

    this.itemsForm = this.fb.group({
      name: '',
      qty: '',
      price: ''
    });
  }

  public closeInvoiceForm() {
    this.closeForm.emit();
  }

  public deleteItem(id: string) {
    this.invoiceItems = this.invoiceItems.filter(item => item.id !== id);
  }

  public onSubmit(submitType: string) {
    if (this.invoiceForm.valid) {
      this.selectedInvoice = { ...this.selectedInvoice, ...this.invoiceForm.value };
      this.selectedInvoice.items = this.invoiceItems;
      this.selectedInvoice.dueDate = this.addDaysToDate(this.selectedInvoice.invoiceDate, Number(this.invoiceForm.value.paymentTerms));
      this.selectedInvoice.total = this.invoiceItems.reduce((total, item) => total + item.total, 0);

      if (this.isAddMode) {
        submitType === 'save' ? this.selectedInvoice.status = "Pending" : this.selectedInvoice.status = "Draft";
        this.invoiceService.createInvoice(this.selectedInvoice).subscribe(resp => {
          this.closeForm.emit(resp);
        });
      } else {
        if (this.selectedInvoice.status !== "Paid") {
          submitType === 'save' ? this.selectedInvoice.status = "Pending" : this.selectedInvoice.status = "Draft";
        }
        this.invoiceService.updateInvoice(this.selectedInvoice).subscribe(resp => {          
          this.closeForm.emit(resp);
        });
      }
    }
  }

  private addDaysToDate(date: Date, days: number) {
    const futureDate = new Date(date);    
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  }

  public addItem() {
    const item = this.itemsForm.value;
    item.total = item.price * item.qty;
    item.id = this.genID();
    this.invoiceItems.push(item);
    this.itemsForm.reset();
  }

  public trackByFn(index: any, item: any) {
    return item.id;
  }

  private genID() {
    const nums = "0123456789";
    let id = '';
    for (let i = 0; i < nums.length; i++) {
      id += nums[Math.floor(Math.random()*nums.length)];      
    }
    return id;    
  }
}
