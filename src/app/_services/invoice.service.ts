import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from "rxjs/operators";
import { environment as env } from 'src/environments/environment';
import { Invoice } from '../_models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  
  constructor(private http: HttpClient) { }

  private fakeData = [
    { id: "432551", name: "Viktor Henning", amount: 1500.00, dueDate: new Date("2021-10-20"), status: "Pending"},
    { id: "765842", name: "Sven Mikkelsen", amount: 499.99, dueDate: new Date("2021-09-14"), status: "Paid"},
    { id: "162523", name: "Lise Anne", amount: 2395.00, dueDate: new Date("2021-10-14"), status: "Draft"},
    { id: "141432", name: "Peter Nielsen", amount: 35.50, dueDate: new Date("2021-11-12"), status: "Pending"},
    { id: "568009", name: "Mads Sørensen", amount: 1000.00, dueDate: new Date("2021-08-25"), status: "Paid"}
  ]

  public getInvoices() {
    return this.http.get<Invoice[]>(env.api +'/invoices/.json').pipe(
      map(res => {
        let invoices: Invoice[] = [];
        for (let id in res) {
          let invoice: Invoice = res[id];
          invoice.id = id;
          invoice.invoiceDate = new Date(invoice.invoiceDate);
          invoice.dueDate = new Date(invoice.dueDate);
          invoices.push(invoice);
        }
        return invoices;
      })
    );
  }

  public getInvoice(id: string) {
    return this.http.get<Invoice>(env.api+ `/invoices/${id}.json`).pipe(
      map(res => {   
        const invoice: Invoice = res;
        invoice.id = id;
        invoice.invoiceDate = new Date(res.invoiceDate);
        invoice.dueDate = new Date(res.dueDate);
        return invoice;
      })
    );
  }

  public createInvoice(invoice: Invoice) {    
    return this.http.post<Invoice>(env.api +'/invoices/.json', invoice);
  }

  public updateInvoice(invoice: Invoice) {
    return this.http.put<Invoice>(env.api +`/invoices/${invoice.id}.json`, invoice);
  }

  public deleteInvoice(id: string) {
    return this.http.delete<Invoice>(env.api +`/invoices/${id}.json`);
  }

  public markInvoiceAsPaid(id: string) {
    return this.http.patch<Invoice>(env.api +`/invoices/${id}.json`, { status: "Paid" });
  }
}
