import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderModule } from "./header/header.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgxMaskModule } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";
import { RegisterModule } from "./register/register.module";
import { MatDialogModule } from "@angular/material/dialog";
import { ErroGenericoComponent } from "./erro-generico/erro-generico.component";
import { SharedModule } from "./shared/shared.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MapaModule } from "./mapa/mapa.module";
import { NewHomeModule } from "./new-home/new-home.module";
import { LoadingModule } from "./components/loading/loading.module";

@NgModule({
  declarations: [AppComponent, ErroGenericoComponent],
  imports: [
    BrowserModule,
    LoadingModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    LoginModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HeaderModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    RegisterModule,
    MatIconModule,
    SharedModule,
    MapaModule,
    NewHomeModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-BR" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
