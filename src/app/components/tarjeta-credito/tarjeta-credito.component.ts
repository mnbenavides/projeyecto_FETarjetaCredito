import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';

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

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      titular:[''],
      numero_tarjeta:[''],
      fecha_expiracion:[''],
      cvv:['']
    });
  }


  ngOnInit():void{

  }

  agregarTarjeta(){
    const TARJETA: any = {
      titular: this.form.get('titular')?.value,
      numero_tarjeta: this.form.get('numero_tarjeta')?.value,
      fecha_expiracion: this.form.get('fecha_expiracion')?.value,
      cvv: this.form.get('cvv')?.value
    };
    this.listado_tarjetas.push(TARJETA);
    this.form.reset();
  }

}
