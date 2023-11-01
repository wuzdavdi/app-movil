import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Datos } from './models/datos'
import { ConexionService } from '../services/conexion.service'
import { AlertController, ModalController, ToastController } from '@ionic/angular'
import { InsertDatosPage } from './insert-datos/insert-datos.page'

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss']

})

export class DatosPage implements OnInit {

  myNombre: string | null = ''
  //datos: Array<any> = []
  datos! : Datos[]
  constructor(private activateRoute:ActivatedRoute,
              private router: Router,
              private conexion: ConexionService,
              private modalCtrl:ModalController,
              private alertController: AlertController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.myNombre = this.activateRoute.snapshot.paramMap.get('nombre')
    this.visualizaDatos()
  }

  visualizaDatos(){
    this.conexion.consultaDatos().subscribe(
      data => {
        this.datos = data
      }
    )
  }

  insert(){
    this.modalCtrl.create({
      component: InsertDatosPage
    })
    .then((modal) =>{
      modal.present()
      return modal.onDidDismiss
    })
  }
  updateDatos(datos:Datos){
    this.modalCtrl.create({
      component: InsertDatosPage, componentProps: {datos}
    })
    .then((modal) =>{
      modal.present()
      return modal.onDidDismiss
    })
  }


  /* visualizaDatos(){
    this.datos=[
      {
        nombre: "The las of us"
        lanzamiento: "14 de junio de 2013",
        genero: "terror, acción y aventura ",
        imagen: "https://i.pinimg.com/236x/ec/92/cf/ec92cf5b969d67f800e4fd2bb79f4b61.jpg",
        descripcion:"The Last of Us es un videojuego de terror, acción y aventura desarrollado por la compañía estadounidense Naughty Dog y distribuido por Sony Computer Entertainment para la consola PlayStation 3 en 2013."
      },
      {
        nombre: "God of war Ragnarök ",
        lanzamiento: "9 de noviembre de 2022 ",
        genero: "aventura",
        imagen: "https://i.pinimg.com/236x/37/e2/6a/37e26a48714a8a753531470ea8ba3465.jpg",
        descripcion:"God of War Ragnarök es un videojuego de acción y aventuras desarrollado por Santa Monica Studio y publicado por Sony Interactive Entertainment (SIE). Se lanzó en todo el mundo el 9 de noviembre de 2022 para PlayStation 4 y PlayStation 5, lo que marca el primer lanzamiento entre generaciones de la serie"
      },
      {
        nombre: "resident evil 4",
        lanzamiento: "11 de enero de 2005",
        genero: "terror",
        imagen: "https://i.pinimg.com/236x/ce/8f/c9/ce8fc9ebfb01c19ed557b6b0edad40d3.jpg",
        descripcion:"Resident Evil 4, conocido en Japón como Biohazard 4, es un videojuego de acción-aventura y disparos en tercera persona de estilo terror y supervivencia desarrollado por Capcom Production Studio"
      } ,
      {
        nombre: "Call of Duty Black Ops II",
        lanzamiento: " 12 de noviembre de 2012",
        genero: "Disparos",
        imagen: "https://i.pinimg.com/236x/34/f9/13/34f9137091da782dfd63df77e14be083.jpg",
        descripcion:"Call of Duty: Black Ops II es un videojuego de disparos en primera persona desarrollado por Treyarch y distribuido por Activision en 2012"
      } ,
      {
        nombre: "Grand Theft Auto V ",
        lanzamiento: " 17 de septiembre de 2013",
        genero: "Acción-aventura",
        imagen: "https://i.pinimg.com/236x/b8/a6/96/b8a6968ed9e5b5fb06f1f6ef0b991e3c.jpg",
        descripcion:"Grand Theft Auto V es un videojuego de acción-aventura de mundo abierto en tercera persona desarrollado por el estudio escocés Rockstar North y distribuido por Rockstar Games. Fue lanzado el 17 de septiembre de 2013 para las consolas Xbox 360 y PlayStation 3"
        
        


      }
    ]
  } */

  futbol(){
    
      this.router.navigate(['../futbol'])
    
  }


doRefresh(event:any){
  this.datos = []
  this.conexion.consultaDatos().subscribe(
    response => {
      this.datos = response
      event.target.complete()
    }
  )
}

removeDatos(datId:any){
  let remove:any = {}
  remove["datId"] = datId

  this.alertController.create({
    header: 'Eliminar!',
    message: '¿Está seguro que desea ELIMINAR?',
    buttons: [
      {
        text: 'Cancelar',
        
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.conexion.removeDatos(remove).subscribe(
            data =>{
              this.presentToast("El usuario fué eliminado con éxito")
            })
        },
      },
    ],
  })
  .then((alertEl) => alertEl.present());
}

async presentToast(msg:string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}



}
