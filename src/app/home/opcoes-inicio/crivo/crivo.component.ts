import { Component, OnInit } from "@angular/core";
import { catchError } from "rxjs/operators";
import { ErrorService } from "src/app/services/error.service";
import { CrivoService } from "./services/crivo.service";

@Component({
  selector: "app-crivo",
  templateUrl: "./crivo.component.html",
  styleUrls: ["./crivo.component.scss"]
})
export class CrivoComponent implements OnInit {

  constructor(private service: CrivoService, private errorService: ErrorService){}

  options$ = this.service.getOptions('options-crivo').pipe(
    catchError(async (error) => this.errorService.trazerErro())
  )

  public legendas: Array<string> = ["green", "red", "yellow", "grey"];

  public status: string = `Aprovado`;
  public codAnalise: string = `0038ep`;

  public reprocessar(): void {
    console.log("REPROCESSAR");
  }

  public reprovar(): void {
    console.log("REPROVAR");
  }

  ngOnInit(): void {}
}
