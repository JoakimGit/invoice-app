import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-invoice-overview',
  templateUrl: './invoice-overview.component.html',
  styleUrls: ['./invoice-overview.component.scss']
})
export class InvoiceOverviewComponent implements OnInit {
  @ViewChild('invoiceAmount') invoiceAmount!: ElementRef<HTMLParagraphElement>;
  @ViewChild('filterText') filterText!: ElementRef;
  @ViewChild('addNewText') addNewText!: ElementRef;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 40 em)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log("Matched");
        } 
      });
    /* const mediaQuery = window.matchMedia('(min-width: 45em)');
    mediaQuery.addEventListener("change", this.handleMediaQuery);
    this.handleMediaQuery(mediaQuery); */
  }

  /* private handleMediaQuery(e: any): void {
    if(e.matches) {
      console.log(this.renderer.selectRootElement(".invoiceAmount"));
    }
  } */ 

}
