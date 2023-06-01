import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { bodyReq } from "src/assets/util/bodyReq";
import { environment } from "src/environments/environment";
import { OptionsSidenav } from "../sidenav/model/OptionSidenav";

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  constructor(private http: HttpClient) {}

  getOptions(option: string): Observable<any> {
    const {headers, body} = bodyReq
    return this.http.post<OptionsSidenav>(`${environment.api}/obter/options/${option}`, body, {headers})
  }
}
