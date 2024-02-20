import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  public listado_tarjetas: any[] = [];
  public form: FormGroup;
  public accion = 'Agregar'
  public id: number | undefined; 
  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private _tarjetaService: TarjetaService){
      //validacion
      this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion:['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }


  ngOnInit():void{
    this.obtenerTarjetas();
  }

  public obtenerTarjetas(){
    this._tarjetaService.gestListTarjetas().subscribe(data =>{
       this.listado_tarjetas = data;
      }, error => {
        console.log(error);
      }
    );
  }

  
  //Metodo que permite eliminar una tarjeta de la base de datos de acuerdo al id recibido
  public eliminarTarjeta(id : number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data =>{
      this.toastr.success('La tarjeta fue eliminada con éxito', 'Tarjeta eliminada');
      this.obtenerTarjetas();
      }, error => {
        this.toastr.error('Opps ocurrió un error', 'Error');
        console.log(error);
      }
    );
  }


  //Metodo que permite editar una tarjeta de la base de datos de acuerdo al id y datos recibidos
  public editarTarjeta(tarjeta : any){
    this.accion = "Editar";
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta : tarjeta.numeroTarjeta,
      fechaExpiracion : tarjeta.fechaExpiracion,
      cvv : tarjeta.cvv
    });
  }

  //Metodo que permite almacenar la tarjeta en la BD con los datos indicados
  guardarTarjeta(){
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    };
    console.log(this.id);
    if(!this.id){
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('La tarjeta fue registrada con éxito', 'Tarjeta registrada');
        this.form.reset();
        this.obtenerTarjetas();
       }, error => {
        this.toastr.error('Opps ocurrió un error', 'Error');
         console.log(error);
       }
     );
    }else{
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(tarjeta.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.success('La tarjeta fue editada con éxito', 'Tarjeta editada');
        this.obtenerTarjetas();
        }, error => {
          this.toastr.error('Opps ocurrió un error', 'Error');
          console.log(error);
        }
      );
    }

  }
}
