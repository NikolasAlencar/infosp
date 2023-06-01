import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewHomeComponent } from './new-home.component';
import { NewHomeRoutingModule } from './new-home-routing.module';

@NgModule({
  declarations: [NewHomeComponent],
  imports: [
    CommonModule,
    NewHomeRoutingModule
  ]
})
export class NewHomeModule { }
