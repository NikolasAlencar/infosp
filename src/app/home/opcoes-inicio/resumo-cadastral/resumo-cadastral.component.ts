import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resumo-cadastral',
  templateUrl: './resumo-cadastral.component.html',
  styleUrls: ['./resumo-cadastral.component.scss']
})
export class ResumoCadastralComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @ViewChild('legenda', { static: true })
  legenda!: TemplateRef<any>

  verLegenda() {
    this.dialog.open(this.legenda)
  }

  ngOnInit(): void {
  }

}
