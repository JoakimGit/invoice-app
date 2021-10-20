import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InvoiceApp';
  public theme: string = 'dark';

  public toggleTheme() {
    if (this.theme === 'light') this.theme = 'dark';
    else this.theme = 'light';
  }
}
