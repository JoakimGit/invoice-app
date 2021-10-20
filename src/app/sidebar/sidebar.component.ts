import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public theme: string = "sun";
  @Output() toggleThemeClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public toggleTheme() {
    if (this.theme === 'sun') this.theme = 'moon';
    else this.theme = 'sun';
    this.toggleThemeClicked.emit();
  }

}
