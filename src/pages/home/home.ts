import { Component } from '@angular/core';
import { 
  NavController,
  AlertController,    //Controlador de alertas
  LoadingController,  //Controlador de carga
  Loading,            //Mensajes de carga
  Platform,           //Conocer en que plataforma se corre la app
  ToastController     //Mostrar mensajes toast
} from 'ionic-angular';

//Diagnostico de nuestro Hardware
import { Diagnostic } from '@ionic-native/diagnostic';
//Geoloclaización
import { Geolocation  } from '@ionic-native/geolocation';
//Permisos
import { AndroidPermissions } from '@ionic-native/android-permissions';

import {GmapsProvider} from '../../providers/gmaps/gmaps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[GmapsProvider]
})
export class HomePage {
  loading: Loading; //Objeto de carga
  m = <marker>{};
  direccion:string
  lat: number = 19.4299139;
  lng: number = -99.1391009;
  
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private toastCtrl:ToastController,
    private gmapsProvider:GmapsProvider) {
      this.m.lat = this.lat
      this.m.lng = this.lng
      this.m.draggable = true
  }

  async buscarUbicacion(){
    //Verificamos si estamos en un celular
    if(!this.platform.is("cordova")){
     this.mostrarToast("No es un celular")
      return;
    }
    //Mostrar mensaje
    this.showLoading()
    try{
      //Verificamos si esta autorizado el permiso de localizacion
      var authorized = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
      if (authorized){
        //Si esta autorizado verificamos si esta activado el GPS
        let locationEnabled = await this.diagnostic.isLocationEnabled()
        //Si esta activa la localizacion obtenemos la posicion
        if (locationEnabled){
          let location = await this.geolocation.getCurrentPosition()
          if(location!=null){
            this.lat = location.coords.latitude
            this.lng = location.coords.longitude
            this.gmapsProvider.getData(this.lat,this.lng)        
            .subscribe(
              response=>{
                try{
                  this.loading.dismissAll()
                  this.m.lat = this.lat
                  this.m.lng = this.lng
                  this.m.draggable = true
                  this.direccion = response.results[0].formatted_address
                  this.m.label = this.direccion
                  this.displayMessage(
                    'FIJA EL PIN DE LA UBICACION CORRECTA',
                    'Ubicacion Encontrada'
                  )
                }catch(error){
                    this.errorInterno()
                }
              },
              error=>{
                this.errorInterno()
              }
              
            )

            this.loading.dismissAll()
          }else{
            this.loading.dismissAll()
            throw Error('Location not found')
          }
        }else{
          this.loading.dismissAll()
          //Si no esta activa la localizacion mandamos al usuario a activarla
          this.displayMessageForPermission("Activa tu GPS","Advertencia")
        }
      }
      //Si no esta autorizado pedimos los permisos
      else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
        this.loading.dismissAll()
      }
    }catch(error){
      this.loading.dismissAll()
      this.displayMessage(error,'Error interno del sistema')
    }

  }

  private errorInterno(){
    this.loading.dismissAll()
    this.displayMessage('Ocurrio un error','error del sistema')
  }
  //función que se encarga de mostrar mensaje Alerta 
  private displayMessage(err:string,title:string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: err,
      buttons: [
        "Ok"
      ]
    });
    alert.present();
  }

  //Función que se encarga de mostrar un mensaje de alerta y al presionar OK
  //Mandamos al usuario a que active la geolocalizacion
  private displayMessageForPermission(err:string, title:string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: err,
      buttons: [
        {
          text:"Ok",
          handler: ()=>{
            this.diagnostic.switchToLocationSettings()
          }
        }
      ]
    });
    alert.present();
  }

  //función que se encarga de mostrar mensajes Toast 
  private mostrarToast(texto:string){
    this.toastCtrl.create(
      {
        message:texto,
        duration:3000
      }).present();
  }

  markerDraggable(m: marker, $event) {
    this.m.lat = $event.coords.lat
    this.m.lng = $event.coords.lng
    this.showLoading()
    this.gmapsProvider.getData(this.m.lat,this.m.lng).subscribe(
      response => {
        try {
          this.direccion = response.results[0].formatted_address
          this.m.label = this.direccion
          this.loading.dismissAll()
        } catch (error) {
          this.errorInterno()
        }
      },
      error => {
        this.errorInterno()
      }
    )
  }

  //función que se encarga de mostrar alerta de carga
  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espera...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
}
interface marker {
  lat:number;
  lng: number;
  label?: string;
  draggable:boolean;
}