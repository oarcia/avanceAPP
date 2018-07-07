import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AboutPage } from '../about/about';
//import { HomePage } from '../home/home';
import { CatalogoPage} from '../catalogo/catalogo';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  seleccion(tipo){
    let data ={}
    switch(tipo){
      case 1:
        data = {
          name: 'Sonido',
          identidad:'Sonido Profesional',
          about:'mitzu tiene los mejores bafles y sonido de calidad envolvente',
          link:'../about/about.html',
          tel:'55-55-55-55-55',
          image:'assets/imgs/bocina1.jpg',
        }
        break;
        case 2:
        data = {
          name: 'Computacion' ,
          identidad:'Accesorios para tu computadora',
          about:'en mitzu tenemos los accesorios mas completos para'+
          'tu computadora y a los mejores precios',
          link:'http://www.mitzu.com.mx',
          tel:'55-55-55-55-55',
          image:'assets/imgs/psp.jpg',
        }
        break;
        case 3:
        data = {
          name: 'Audifonos' ,
          identidad:'calidad en sonido personal',
          about:'tenemos todos los audifonos de calidad '+
          'asi como los mejores accesorios y sonido en calidad',
          link:'http://www.mitzu.com.mx',
          tel:'55-55-55-55-55',
          image:'assets/imgs/audifonos1.jpg',
        }
        break;
        case 4:
        data = {
          name: 'MasCategorias' ,
          identidad:'todas las categorias',
          about:'descubre con nosotros mas accesorios en electronica.',
          link:'http://www.mitzu.com.mx',
          tel:'55-55-55-55-55',
          image:'assets/imgs/mitz.png',
        }
        break;
        default:
        break
    }
    console.log(data)
    this.navCtrl.push(CatalogoPage, { 'data': data })
  }

}
