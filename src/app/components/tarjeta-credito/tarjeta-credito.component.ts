import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  public tarjetas: any[] = [
    {nombre: 'Juan Perez', numero_tarjeta:'1546512', fecha_expiracion: '11/12', cvv:'123' },
    {nombre: 'Maria Benavides', numero_tarjeta:'15465157', fecha_expiracion: '09/12', cvv:'789' }
  ];
  
  ngOnInit():void{

  }

}
