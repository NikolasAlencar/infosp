import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OpcoesInicioRoutingModule } from "./opcoes-inicio-routing.module";
import { OpcoesInicioComponent } from "./opcoes-inicio.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { DadosPessoaisModule } from "./dados-pessoais/dados-pessoais.module";
import { CrivoModule } from "./crivo/crivo.module";

@NgModule({
  declarations: [OpcoesInicioComponent],
  imports: [
    CommonModule,
    OpcoesInicioRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    DadosPessoaisModule,
    CrivoModule
  ]
})
export class OpcoesInicioModule {}
