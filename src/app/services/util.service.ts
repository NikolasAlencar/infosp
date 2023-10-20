import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  urlImg = environment.urlImg

  constructor() { }

  getImg(nameImg: string | undefined){
    return this.urlImg + nameImg + '.jpg'
  }
}
