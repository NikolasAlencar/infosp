import { Component, OnInit } from "@angular/core";
import { ActivationStart, Router } from "@angular/router";
import { filter } from "rxjs";
import { Header } from "./header/model/Header";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "my-project.v2";

  header!: Header;

  constructor(public router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationStart)).subscribe((event: any) => {
        const temHeader = event?.snapshot?.routeConfig?.data?.header
        if(temHeader) this.header = temHeader
    })
  }

  opened = false;

  openOrClose($event: boolean){
    this.opened = this.opened === $event ? !$event : $event
  }

  ngOnInit(): void {}
}
