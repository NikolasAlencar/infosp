import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationGuard } from "./authorization/authorization.guard";
import { ErroGenericoComponent } from "./erro-generico/erro-generico.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "home",
    loadChildren: () => import("./new-home/new-home.module").then(m => m.NewHomeModule),
  },
  {
    path: "mapa",
    loadChildren: () => import("./mapa/mapa.module").then(m => m.MapaModule),
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule),
  },
  {
    path: "consulta",
    loadChildren: () => import("./consulta/consulta.module").then(m => m.ConsultaModule),
    canLoad: [AuthorizationGuard],
    data: {
      header: {
        hasHeader: true,
        name: "Consulta"
      }
    }
  },
  {
    path: "register",
    loadChildren: () => import("./register/register.module").then(m => m.RegisterModule),
    data: {
      header: {
        hasHeader: false
      }
    }
  },
  {
    path: "erro-generico",
    component: ErroGenericoComponent,
    data: {
      header: {
        hasHeader: false
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
