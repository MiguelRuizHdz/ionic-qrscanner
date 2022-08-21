import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor( private barcodeScanner: BarcodeScanner,
    private dataLocal: DataLocalService ) {}

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if ( !barcodeData.cancelled ) {
        this.dataLocal.guardarRegistro( barcodeData.format, barcodeData.text );
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  // Se ejecuta cuando se ha cargado la página. Este evento solo ocurre una vez por cada
  // página que se está creando. Si una página sale pero se almacena en caché, este evento
  // no se desencadenará de nuevo en una visualización posterior. El evento es un buen lugar
  // para poner el código de instalación de la página
  // ionViewDidLoad(){
  //   console.log('ionViewDidLoad');
  // }

  // 	Se ejecuta cuando la página está a punto de entrar y convertirse en la página activa.
  ionViewWillEnter(){
    // console.log('ionViewWillEnter');
  }
  // 	Se ejecuta cuando la página ha entrado completamente y ahora es la página activa.
  // Este evento se desencadenará, tanto si se trataba de la primera carga como de una
  // página almacenada en caché.
  ionViewDidEnter(){
    // console.log('ionViewDidEnter');
    this.scan();
  }

  // Se ejecuta cuando la página está a punto de salir y ya no es la página activa.
  ionViewWillLeave(){
    // console.log('ionViewWillLeave');
  }

  // 	Se ejecuta cuando la página ha terminado de salir y ya no es la página activa.
  ionViewDidLeave(){
    // console.log('ionViewDidLeave');
  }

  // 	Se ejecuta cuando la página está a punto de destruirse y se quitan sus elementos.
  // ionViewWillUnload(){
  //   console.log('ionViewWillUnload');
  // }

  // Se ejecuta antes de que la vista pueda entrar. Esto se puede usar como una especie
  // de "protección" en vistas autenticadas donde necesita comprobar los permisos antes de
  // que la vista pueda entrar.
  // ionViewCanEnter(){
  //   console.log('ionViewCanEnter');
  // }

  // Se ejecuta antes de que la vista pueda salir. Esto se puede usar como una especie de
  // "protección" en vistas autenticadas donde necesita comprobar los permisos antes de que
  // la vista pueda salir
  // ionViewCanLeave(){
  //   console.log('ionViewCanLeave');
  // }

}
