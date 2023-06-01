import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResumoCadastralComponent } from "./resumo-cadastral.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [ResumoCadastralComponent],
  imports: [CommonModule, SharedModule, MatListModule],
  exports: [ResumoCadastralComponent]
})
export class ResumoCadastralModule {}
