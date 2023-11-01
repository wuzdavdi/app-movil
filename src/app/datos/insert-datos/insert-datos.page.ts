import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Datos } from '../models/datos'
import { ConexionService } from 'src/app/services/conexion.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-insert-datos',
  templateUrl: './insert-datos.page.html',
  styleUrls: ['./insert-datos.page.scss'],
})
export class InsertDatosPage implements OnInit {

  @Input() datos!:Partial<Datos>
  isUpdate:boolean = false
  constructor(private conexion:ConexionService,
              private toastController:ToastController,
              private modalCtrl: ModalController) { }
              
  ngOnInit() {
    this.updateDatos()
  }

  form = new FormGroup({
    datNombre: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    datLanzamiento: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    datGenero: new FormControl('',[
      Validators.required,
    ]),
    datImagen: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    datDescripcion: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
  })

  updateDatos(){
    if(this.datos){
        this.isUpdate = true
        this.form.patchValue(
          {
            datNombre: this.datos.datNombre,
            datLanzamiento: this.datos.datLanzamiento,
            datGenero: this.datos.datGenero,
            datImagen: this.datos.datImagen,
            datDescripcion: this.datos.datDescripcion
          }
        )
    }
  }

  onSubmit(){
    console.log("ingresó")
   

    if(this.isUpdate){
      //Modificar

       const dat:Datos = {
        datId: this.datos.datId,
      datNombre: this.form.value.datNombre!,
      datLanzamiento: this.form.value.datLanzamiento!,
      datGenero: this.form.value.datGenero!,
      datImagen: this.form.value.datImagen!,
      datDescripcion: this.form.value.datDescripcion!
    } 
        
 this.conexion.updateDatos(dat).subscribe(
     () =>{
          this.presentToast('Datos modificados con éxito')
          this.closeModal()
      }, ()=>{
        this.presentToast('Error al modificar')
          this.closeModal()
      }
      )
    }else{
      //Guardar
    const dat = this.form.value
    this.conexion.insertarDatos(dat).subscribe(
      data=>{
          this.presentToast('Datos guardados con éxito')
          this.closeModal()
      }, error =>{
        this.presentToast('Error al guardar')
          this.closeModal()
      }
      )
    }
  }

  async closeModal(){
    this.modalCtrl.dismiss(null, 'closed')
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
