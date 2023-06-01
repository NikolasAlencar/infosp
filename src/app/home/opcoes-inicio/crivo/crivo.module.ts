import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CrivoComponent } from "./crivo.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [CrivoComponent],
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule]
})
export class CrivoModule {}
