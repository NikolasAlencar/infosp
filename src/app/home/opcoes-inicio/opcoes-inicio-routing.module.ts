import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home.component";
import { CrivoComponent } from "./crivo/crivo.component";
import { DadosPessoaisComponent } from "./dados-pessoais/dados-pessoais.component";

const routes: Routes = [
  {path:"", pathMatch: "full", redirectTo: "dados-pessoais"},
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "dados-pessoais", component: DadosPessoaisComponent },
      { path: "crivo", component: CrivoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpcoesInicioRoutingModule {}
