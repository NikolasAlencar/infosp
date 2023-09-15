import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeedRoutingModule } from "./feed-routing.module";
import { FeedComponent } from "./feed.component";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { NgxMaskModule } from "ngx-mask";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { PostModule } from "./post/post.module";
import { NewPostModule } from "./new-post/new-post.module";

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FeedRoutingModule,
    SharedModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    NewPostModule,
    PostModule,
    NgxMaskModule.forChild()
  ],
  exports: [FeedComponent]
})
export class FeedModule {}
