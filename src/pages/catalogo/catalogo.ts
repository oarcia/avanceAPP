import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html'
})
export class CatalogoPage {
    data:any
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data=navParams.get('data')
      console.log(this.data)
    }
  
    ionViewDidLoad() {
      console.log('se carga el catalogo ');
    }
  
  }