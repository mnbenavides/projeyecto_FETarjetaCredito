import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  public listado_tarjetas: any[] = [
    {titular: 'Juan Perez', numero_tarjeta:'1546512', fecha_expiracion: '11/12', cvv:'123' },
    {titular: 'Maria Benavides', numero_tarjeta:'15465157', fecha_expiracion: '09/12', cvv:'789' }
  ];
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService){
    this.form = this.fb.group({
      titular:['', Validators.required],
      numero_tarjeta:['', Validators.required, Validators.maxLength(16), Validators.minLength(16)],
      fecha_expiracion:['',  Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      cvv:['', Validators.required, Validators.maxLength(3), Validators.minLength(3)]
    });
  }


  ngOnInit():void{

  }

  //Metodo que permite agregar una tarjeta con los camspo: titular, numero de tarjeta, fecha de expiracion de la tarjeat y cvv en la base de datos
  public agregarTarjeta(){
    const TARJETA: any = {
      titular: this.form.get('titular')?.value,
      numero_tarjeta: this.form.get('numero_tarjeta')?.value,
      fecha_expiracion: this.form.get('fecha_expiracion')?.value,
      cvv: this.form.get('cvv')?.value
    };
    this.listado_tarjetas.push(TARJETA);
    this.toastr.success('La tarjeta fue registrada con éxito', 'Tarjeta registrada');
    this.form.reset();
  }
  
  //Metodo que permite eliminar una tarjeta de la base de datos de acuerdo al indice recibido
  public eliminarTarjeta(index:number){
    this.listado_tarjetas.splice(index, 1);
    this.toastr.error('La tarjeta fue eliminada con éxito', 'Tarjeta eliminada');
  }
}
