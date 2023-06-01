import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-historico",
  templateUrl: "./historico.component.html",
  styleUrls: ["./historico.component.scss"]
})
export class HistoricoComponent implements OnInit {

  constructor() {}

  public bloquear(): void {
    console.log("BLOQUEAR");
  }

  public liberar(): void {
    console.log("LIBERAR");
  }

  ngOnInit(): void {}
}
