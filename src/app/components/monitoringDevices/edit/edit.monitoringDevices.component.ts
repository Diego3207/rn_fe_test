import { Component, OnDestroy, OnInit } from '@angular/core';
import { MiscService } from 'src/app/service/misc.service';
import { MonitoringDeviceService } from 'src/app/service/monitoringDevice.service';
import { CostumerService } from 'src/app/service/costumer.service';
import { OperationalAreaService } from 'src/app/service/operationalArea.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { AbstractControlOptions, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';


@Component({
    templateUrl: './edit.monitoringDevices.component.html'
})
export class EditMonitoringDeviceComponent implements OnInit, OnDestroy {
    submitted: boolean = false;
    id:number;
    form: FormGroup | any;
    typeDevices: any[] =  [];
    listCostumers: any[] = [];
    listOperationalAreas : any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private monitoringDeviceService: MonitoringDeviceService, 
        private costumerService: CostumerService,
        private operationalAreaService: OperationalAreaService,
        private messageService: MessageService, 
        private miscService:MiscService,
        private route: ActivatedRoute,
        private router: Router ) 
    {
    }

    ngAfterViewInit(): void 
    {

    }

    ngOnInit(): void 
	  {
        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; //MustMatch('password', 'confirmPassword') };
        this.id = parseInt(this.route.snapshot.params['idx']);
		    this.form = this.formBuilder.group
		({
            id:[this.id, Validators.required],
            monitoringDeviceName: [null, [Validators.required, Validators.maxLength(255)]],
            monitoringDeviceCostumerId: [null, Validators.required],
            monitoringDeviceOperationalAreaId: null,
            monitoringDeviceType: [null, Validators.required],
            monitoringDeviceProvider: [null, Validators.required],
         }, formOptions);
        this.list();
        this.typeDevices = [
          { name: 'Cámara'},
          { name: 'Panel'},
          { name: 'Sensor'},
          { name: 'Botón de Pánico'},
        ];	

        this.form.get("monitoringDeviceCostumerId").valueChanges.subscribe(selectedValue => 
          {
            if(selectedValue != null){
            
              this.getFilter(selectedValue);
            }
          });
    }

    ngOnDestroy() {
       
    }

    onSubmit() 
	  {
        // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
          this.save();
    }
    cancel(event) {
      event.preventDefault(); //
      this.router.navigate(['/monitoringDevices']);
    }

    private save()  
    {
    // En las siguientes variables se guardarán los valores del formulario
    let propertiesMonitoringDevice = {};  

    //Iteramos el objeto de formulario para guardar el valor en las variables arriba declaradas
    Object.keys(this.form.value).forEach(element => 
    {
      propertiesMonitoringDevice[element] = this.form.value[element];                       
    });

    //Parseamos los id a string
    propertiesMonitoringDevice['monitoringDeviceCostumerId'] = (propertiesMonitoringDevice['monitoringDeviceCostumerId']).toString();
    if(propertiesMonitoringDevice['monitoringDeviceOperationalAreaId']) propertiesMonitoringDevice['monitoringDeviceOperationalAreaId'] = (propertiesMonitoringDevice['monitoringDeviceOperationalAreaId']).toString();

    this.monitoringDeviceService.update(propertiesMonitoringDevice)
    .subscribe(data =>
    {
      this.miscService.endRquest();
      this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa',  life: 3000 });
      this.router.navigate(['/monitoringDevices']);  
    }, (err : any) => 
    {
      this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Problemas al guardar', life: 3000 });
      this.miscService.endRquest();
    }); 
    } 
      
    list(){

      this.miscService.startRequest();
      //Método para listar métodos de Pago
      const costumers =this.costumerService.getAll(0,1,'[{"id":"asc"}]')
      .pipe(
        catchError((error) => 
        {
          this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo", detail:error.message });
          return of(null); 
        })
      );
      
      //Hacemos fork join para mandar las peticiones
      forkJoin([costumers]).subscribe(([dataCostumers] )=>
      {
        console.log(dataCostumers);
        //Envia los Clientes
        if(dataCostumers != null)
        {
            dataCostumers['object']['records'].forEach(element => {
                this.listCostumers.push({'label': element['id']+" "+ element['costumerName'],'value': element['id']});
            });

            //Se anida el patch value 
            this.monitoringDeviceService.getById(this.id)
            .subscribe(data => {
              if(data['monitoringDeviceOperationalAreaId'] != null) data['monitoringDeviceOperationalAreaId'] = data['monitoringDeviceOperationalAreaId']['id'];
              this.form.patchValue(data);
            })	

            console.log("listOperationalAreas -> ", this.listOperationalAreas);
        }

        this.miscService.endRquest(); 
      },

      (err:any)=>
      {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los catalogos', life: 3000 });
          this.miscService.endRquest();
      });
          
  }

  getFilter(value){
    if(value != null ) {
      this.operationalAreaService.getFilter('[{"value":"'+ value+'","matchMode":"equals","field":"operationalAreaCustomerId"}]',0,1,'[{"id":"asc"}]')
      .subscribe( (data:any )=>
      {            
            this.listOperationalAreas = (data == null ? []: data['object']['records']);
            /*for(let i=0; i < this.deviceSave.length ; i++){
              var item = this.listMonitoringDevices.find((element) => element.id == this.deviceSave[i].ticketMonitoringdeviceMonitoringDeviceId);
              this.selectedRegister.push(item);
            }*/
         
      },
      (err : any) =>
      {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error al cargar listado de dispositivos ' , detail:err.message, life: 3000 });
          this.miscService.endRquest();
      });
    }
  } 
}
