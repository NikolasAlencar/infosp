import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { ViewPostComponent } from "./view-post.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ViewPostComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  exports: [ViewPostComponent]
})
export class ViewPostModule {}
