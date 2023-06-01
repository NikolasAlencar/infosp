import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NavigateService } from '../services/navigate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private navigate: NavigateService) { }

  open: boolean = false;

  @Output() openedOrClosed = new EventEmitter<boolean>()
  @Input() name?: string;

  openAndClose(openedOrClosed: boolean){
    this.open = openedOrClosed;
    this.openedOrClosed.emit(openedOrClosed)
  }

  navegarHome(): void{
    this.navigate.navegarParaHome()
  }

  voltar(): void{
    this.navigate.voltar()
  }

  ngOnInit(): void {}

}
