import { Component, OnDestroy, OnInit } from '@angular/core';
import { MiscService } from 'src/app/service/misc.service';
import { TicketService } from 'src/app/service/ticket.service';
import { MonitoringDevice } from 'src/app/api/monitoringDevice';
import { TicketCoordinationService } from 'src/app/service/ticketCoordination.service';
import { DependencyPhoneService } from 'src/app/service/dependencyPhone.service';
import { TicketMonitoringDeviceService } from 'src/app/service/ticketMonitoringDevice.service';
import { MonitoringDeviceService } from 'src/app/service/monitoringDevice.service';
import { CostumerService } from 'src/app/service/costumer.service';
import { ActivatedRoute,Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service'
import { MessageService  } from 'primeng/api';
import { AbstractControlOptions, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';


@Component({
    templateUrl: './edit.tickets.component.html'
})
export class EditTicketComponent implements OnInit, OnDestroy {
    submitted: boolean = false;
    id:number;
    form: FormGroup | any;
    typeDevices: any[] =  [];
    listCostumers: any[] = [];
    listMonitoringDevices : any[] = [];
    counter: number = 0;
    deviceSave: any[] = [];
    selectedRegister: any[] = [];
    disabled: boolean = false;
    listPhones :any[]= [];
    listChannels :any[]= [];
    deletedCoordinations = [];
    

    constructor(
        private formBuilder: FormBuilder,
        private ticketService: TicketService,
        private monitoringDeviceService: MonitoringDeviceService, 
        private ticketMonitoringDeviceService: TicketMonitoringDeviceService,
        private ticketCoordinationService: TicketCoordinationService,
        private dependencyPhoneService:DependencyPhoneService,
        private sessionService : SessionService,
        private costumerService: CostumerService,
        private messageService: MessageService, 
        private miscService:MiscService,
        private route: ActivatedRoute,
        private router: Router ) 
    {
    }

    ngAfterViewInit(): void 
    {

    }

    async ngOnInit(): Promise<void> 
	  {
        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; //MustMatch('password', 'confirmPassword') };
        this.id = parseInt(this.route.snapshot.params['idx']);
		    this.form = this.formBuilder.group
		({
            id:[this.id, Validators.required],
            ticketCostumerId: [null, [Validators.required, Validators.maxLength(255)]],
            ticketUserId: [this.sessionService.getUserId(),[Validators.required]], 
            ticketDescription: [' ', Validators.required],
            ticketObservation: [' ', Validators.required],
            ticketCoordinations: this.formBuilder.array([],[Validators.required,Validators.minLength(1),this.isCoordinationDuplicated]),
         }, formOptions);

         this.list();
        
        this.form.get("ticketCostumerId").valueChanges.subscribe(selectedValue => 
        {
          if(selectedValue != null){
          
            this.getFilter(selectedValue);
          }
        });

        this.listChannels = [ 
          {label:'Llamada Telefónica',value:'llamada'},
          {label:'WhatsApp',value:'whatsapp'},
          {label:'Telegram',value:'telegram'},
          {label:'SMS',value:'sms'},
          {label:'Correo Electrónico',value:'email'}
        ];
  	
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
      this.router.navigate(['/tickets']);
    }

    infoCoordinationsArray(): FormArray 
    {
      return this.form.get('ticketCoordinations') as FormArray;
    }

    removeRow(object,index:number){
        this.infoCoordinationsArray().removeAt(index); 
        if(object.value.id !== null)
        this.deletedCoordinations.push(object.value.id);
    }
  
    addRow()
    {
        this.infoCoordinationsArray().push(this.newCoordinationArray());   
    }

    newCoordinationArray() 
    {
      return this.formBuilder.group({
          id:null,
          ticketCoordinationDependencyPhoneId:[null,[Validators.required]],
          ticketCoordinationCommunicationChannel:[null,[Validators.required]]
      });
    }

    private save()  
    {
        let ticketProperties = {};
        Object.keys(this.form.value).forEach(element => {
            ticketProperties[element] = this.form.value[element]; //copia las propiedades del objeto principal        
        });
    
        //Parseamos el ID a string
        ticketProperties['ticketCostumerId'] = (ticketProperties['ticketCostumerId']).toString();
        ticketProperties['ticketUserId'] = (ticketProperties['ticketUserId']).toString();
    

      this.ticketService.update(ticketProperties)
      .subscribe(data =>
      {      
        this.miscService.endRquest(); 
        this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa',  life: 3000 });

        const actions = [];
        //-update/create
        this.form.value['ticketCoordinations'].forEach(element => {
            
            if(element['id'] == null)
            {
                // -------- coordinations --------
                // create
                
                element['ticketCoordinationTicketId'] = (this.form.value['id']).toString();
                element['ticketCoordinationDependencyPhoneId'] = (element['ticketCoordinationDependencyPhoneId']).toString();

                const ptt = this.ticketCoordinationService.create(element).pipe(
                    catchError((error) => 
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar elemento nuevo contacto", detail:error.message });
                        return of(null);
                    })
                );		

               actions.push(ptt);
            }else{
                // update
                element['ticketCoordinationDependencyPhoneId'] = (element['ticketCoordinationDependencyPhoneId']).toString();

                const ptt = this.ticketCoordinationService.update(element).pipe(
                    catchError((error) => 
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al actualizar contacto existente", detail:error.message });
                        return of(null);
                    })
                );		

               actions.push(ptt);

            }
        });
        //-Disable ("delete")
        this.deletedCoordinations.forEach(id => {
            // update

            const ptt = this.ticketCoordinationService.disable(id).pipe(
                catchError((error) => 
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar contacto existente", detail:error.message });
                    return of(null);
                })
            );		

           actions.push(ptt);
            
        });

        //Fork para mandar las peticiones
        if(actions != null){
            forkJoin(actions).subscribe(([] :any)=>
            {
                this.router.navigate(['/tickets']);
                this.miscService.endRquest();  
            },
            (err : any)=>{
                //console.log(err.message);
                this.miscService.endRquest(); //fin del proceso por error
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error general al elementos múltiples ", detail:err.message });
            }); 
        } 


        this.router.navigate(['/tickets']);  
      }, (err : any) => 
      {
        this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Problemas al guardar', life: 3000 });
        this.miscService.endRquest();
      }); 
    } 


  list(){
    this.miscService.startRequest();
    const customers = this.costumerService.getAll(0,1,'[{"id":"asc"}]')
    .pipe(
      catchError((error) => 
      {
        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de clientes", detail:error.message });
        return of(null); 
      })
    );

    const phones = this.dependencyPhoneService.getAll(0,1,'[{"id":"asc"}]')
    .pipe(
        catchError((error) => 
        {
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar directorio", detail:error.message });
            return of(null); 
        })
    );

    forkJoin([customers,phones]).subscribe(  ([dataCustomers,dataPhones])=>
    {
      if(dataCustomers != null )
      {                    
        this.listCostumers = dataCustomers['object']['records'];
        /// se hace patch de la información del OD
        this.ticketService.getById(this.id)
        .subscribe(data => {
          console.log("data", data);
          //agregar filas para vias de coordinacion
          for (let i=0; i < data['ticketCoordinations'].length; i++){
            this.addRow();    
          }

          this.deviceSave = data.ticketDevices;
          this.form.patchValue(data);
          
        })
        ///////////////////////////////////////////////

        let nuevoObjeto = {};
      //Recorremos el arreglo 
      dataPhones['object']['records'].forEach( x => { 
          if( !nuevoObjeto.hasOwnProperty(x.dependencyPhoneDependencyId['dependencyDependencyCategoryId']['dependencyCatergoryDescription'])){
              nuevoObjeto[x.dependencyPhoneDependencyId['dependencyDependencyCategoryId']['dependencyCatergoryDescription']] = {
              phones: []
            }
          }
          
          //Agregamos los datos de phones
          let labelx = x.dependencyPhoneDependencyId['dependencyDescription']+" / Tel: "+ x.dependencyPhoneNumber ;
          let phone = {label:labelx, value:x.id };
            nuevoObjeto[x.dependencyPhoneDependencyId['dependencyDependencyCategoryId']['dependencyCatergoryDescription']].phones.push(phone);
          
        });


        let claves = Object.keys(nuevoObjeto); 
        for(let i=0; i< claves.length; i++){
          this.listPhones.push({label:claves[i] ,items:nuevoObjeto[claves[i]].phones});
          console.log(this.listPhones);
        }

      }
        this.miscService.endRquest();	
    },
    (err : any) =>
    {
      this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error al generar los catalogos', life: 3000 });
      this.miscService.endRquest();
    });
  }

  getFilter(value){
    if(value != null ) {
      this.monitoringDeviceService.getFilter('[{"value":"'+ value+'","matchMode":"equals","field":"monitoringDeviceCostumerId"}]',0,1,'[{"id":"asc"}]')
      .subscribe( (data:any )=>
      {            
            this.listMonitoringDevices = (data == null ? []: data['object']['records']);
            for(let i=0; i < this.deviceSave.length ; i++){
              var item = this.listMonitoringDevices.find((element) => element.id == this.deviceSave[i].ticketMonitoringdeviceMonitoringDeviceId);
              this.selectedRegister.push(item);
            }
         
      },
      (err : any) =>
      {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error al cargar listado de dispositivos ' , detail:err.message, life: 3000 });
          this.miscService.endRquest();
      });
    }
  } 

  isCoordinationDuplicated(control: FormArray ) 
  {
      const uniqueValues = new Set();
      for (const item of control.controls) 
      {

        const obj = item.value.ticketCoordinationDependencyPhoneId
        if (uniqueValues.has(obj)) 
        {
          return { duplicated: true }; 
        }          
            
          uniqueValues.add(obj);
      }
      return null; //en este punto no hay error, se regresa null	
  }
}
