import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import { ErrorService } from "src/app/services/error.service";
import { HeaderService } from "../services/header.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent{
  constructor(private router: Router, private service: HeaderService, private errorService: ErrorService) {}

  options$ =  this.service.getOptions('options-sidenav')
    .pipe(catchError(async (error) => {
      this.errorService.trazerErro()
    }))

  @Output() exit = new EventEmitter<boolean>()

  navegar(option: any){
    option.name === "sair" ? this.exit.emit(false) : (this.router.navigate([option?.path]), this.exit.emit(false))
  }
}
