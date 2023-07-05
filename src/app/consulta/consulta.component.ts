import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.scss"]
})
export class ConsultaComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openNewPost()
  }

  @ViewChild('newPost', { static: true })
  newPost!: TemplateRef<any>

  isOpenOptions = false;

  openNewPost(){
    this.dialog.open(this.newPost)
  }

  handleOptions(){
    this.isOpenOptions = !this.isOpenOptions;
  }
}
