import { Product } from "./product";

export class Invoice {
  id: string;
  billerStreetAddress: string;
  billerCity: string;
  billerPostalCode: string;
  billerCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostalCode: string;
  clientCountry: string;
  invoiceDate: Date = new Date();
  dueDate: Date;
  paymentTerms: string;
  productDescription: string;
  items: Product[];
  total: number;
  status: string;
}