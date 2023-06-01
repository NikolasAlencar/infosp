import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastStepComponent } from './last-step/last-step.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'last-step',
    component: LastStepComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
