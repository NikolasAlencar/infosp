import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationGuard } from "./authorization/authorization.guard";
import { ErroGenericoComponent } from "./erro-generico/erro-generico.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "home",
    loadChildren: () => import("./new-home/new-home.module").then(m => m.NewHomeModule),
    data: {
      header: {
        hasHeader: false
      }
    }
  },
  {
    path: "mapa",
    loadChildren: () => import("./mapa/mapa.module").then(m => m.MapaModule),
    data: {
      header: {
        hasHeader: false
      }
    }
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule),
    data: {
      header: {
        hasHeader: false
      }
    }
  },
  {
    path: "feed",
    loadChildren: () => import("./feed/feed.module").then(m => m.FeedModule),
    canLoad: [AuthorizationGuard],
    data: {
      header: {
        hasHeader: true,
        name: "Feed de Notícias"
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
