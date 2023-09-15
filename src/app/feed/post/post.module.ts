import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { PostComponent } from "./post.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ViewPostModule } from "../view-post/view-post.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    ViewPostModule,
    FormsModule
  ],
  exports: [PostComponent]
})
export class PostModule {}
