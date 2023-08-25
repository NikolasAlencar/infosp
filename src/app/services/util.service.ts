import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  urlImg = environment.urlImg

  constructor() { }

  getImg(nameImg: string){
    return this.urlImg + nameImg + '.jpg'
  }
}
