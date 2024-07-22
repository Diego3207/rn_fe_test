import { Component, ViewChild, ElementRef, ViewChildren, NgZone, QueryList } from '@angular/core';
import { IncidenceService } from 'src/app/service/incidence.service';
import { CostumerService } from 'src/app/service/costumer.service';
import { DependencyPhoneService } from 'src/app/service/dependencyPhone.service';
import { IncidenceEvidenceService } from 'src/app/service/indicenceEvidence.service';
import { IncidenceInvolvedDeviceService } from 'src/app/service/incidenceInvolvedDevice.service';
import { MonitoringDeviceService } from 'src/app/service/monitoringDevice.service';
import { IncidenceCoordinationService } from 'src/app/service/incidenceCoordination.service';
import { IncidencePeopleService } from 'src/app/service/incidencePeople.service';
import { IncidenceVehicleService } from 'src/app/service/incidenceVehicle.service';
import { IncidenceBackDeviceService } from 'src/app/service/incidenceBackDevice.service';
import { Router } from '@angular/router';
import { MiscService } from 'src/app/service/misc.service';
import { MessageService } from 'primeng/api';
import { AbstractControlOptions, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, CurrencyPipe,formatDate  } from '@angular/common'; 
import { catchError, forkJoin, of } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';
import { SessionService } from 'src/app/service/session.service';
import { FileService } from 'src/app/service/file.service';
import { MonitoringDevice } from 'src/app/api/monitoringDevice';



@Component({
  templateUrl: './add.incidence.component.html',
  providers: [DatePipe, CurrencyPipe]
})

export class AddIncidenceComponent {
  @ViewChildren('search') searchElementRef!: QueryList<ElementRef>;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  files : any[] = [];
  uploadedFiles: any[] = []; //lista de archivos por cargar
  submitted: boolean = false;
  listCostumer: any[] = [];
  listSource: any[] = [];
  listType: any[] = [];
  listValidation: any[] = [];
  listDevices: any[] = [];
  listFilteredDevices: any[] = [];
  selectedRegister: MonitoringDevice[] = [];
  listPhones :any[]= [];
  listChannels :any[]= [];
  listGenre :any[]= [];
  items :any[]= [];


  form: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private incidenceService: IncidenceService,
    private incidenceEvidenceService: IncidenceEvidenceService,
    private incidenceInvolvedDeviceService: IncidenceInvolvedDeviceService,
    private incidenceBackDeviceService: IncidenceBackDeviceService,
    private monitoringDeviceService: MonitoringDeviceService,
    private incidenceCoordinationService :  IncidenceCoordinationService,
    private incidencePeopleService :  IncidencePeopleService,
    private incidenceVehicleService :  IncidenceVehicleService,
    private ngZone: NgZone,
    private costumerService: CostumerService,
    private messageService: MessageService,
    private miscService: MiscService,
    private sessionService:SessionService,
    private datePipe: DatePipe,
    private fileService:FileService,
    private dependencyPhoneService:DependencyPhoneService,
    private router: Router) {
  }

  ngAfterViewInit(): void {
    this.searchElementRef.changes.subscribe(inputs => {
      // Detecta cuando se agregan nuevos elementos al FormArray

      inputs.forEach((input,index) => {
        // Aquí puedes realizar cualquier acción que desees para los nuevos elementos creados.
        console.log(index);
        // Binding autocomplete to search input control
        let autocomplete = new google.maps.places.Autocomplete(
            input.nativeElement
        );
    
        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
                return;
            }
            this.form.controls.incidencePeoples.controls[index].controls.incidencePeopleAddress.setValue(place.formatted_address);
            });
        }); 
      });
    });
} 

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = { validators: Validators.nullValidator };
    this.form = this.formBuilder.group({
      incidenceCostumerId: [null, [Validators.required]],
      incidenceSourceInformation: [null, [Validators.required]],
      incidenceStartDateAttention: this.datePipe.transform(new Date(), 'yyyy-MM-dd  HH:mm:ss'), // se pone al cargar el formulario
      incidenceInformantData:[null, [Validators.required]],
      incidenceType: [null, [Validators.required]],
      incidenceTypeDescription: ' ',
      incidenceQuadrant: '',
      incidenceStartDate: [null, [Validators.required]],
      incidenceEndDate: [null, [Validators.required]],
      incidenceCoordinations: this.formBuilder.array([],[Validators.required,Validators.minLength(1),this.isCoordinationDuplicated]),
      incidenceDescription:[null,Validators.required],
      incidenceVehicles: this.formBuilder.array([]),
      incidencePeoples: this.formBuilder.array([]),
      incidenceObservation: '',
      incidenceUserAttendedId:[this.sessionService.getUserId(),[Validators.required]],
      incidenceValidationEvent: [null, [Validators.required]],
      incidenceEndDateAttention: null, // se pone al momento de guardar la incidencia
      
    }, formOptions);

    this.form.get("incidenceCostumerId").valueChanges.subscribe(selectedValue => 
    {
        if(selectedValue != null){
          //console.log(selectedValue);
          this.getDevices(selectedValue);
        }else{
          this.listDevices = [];
        }
    });
    this.listSource = [ 
      {label:'Personal del centro de monitoreo',value:'monitoreo'},
      {label:'Cliente',value:'cliente'}
    ];
    this.listGenre = [ 
      {label:'Femenino',value:'femenino'},
      {label:'Masculino',value:'masculino'},
      {label:'No especificado',value:'no especificado'}
    ];
    this.listType = [ 
      {label:'Operativa',value:'operativa'},
      {label:'Preventiva',value:'preventiva'},
      {label:'Informativa',value:'informativa'},
      {label:'Robo de activo',value:'robo de activo'}
    ];
    this.listValidation = [ 
      {label:'Positivo',value:'positivo'},
      {label:'Falso positivo',value:'falso positivo'},
      {label:'No corroborado',value:'no corroborado'},
      {label:'Activo con servicio activo',value:'activo'},
      {label:'Activo con servicio inactivo',value:'inactivo'}
    ];
    this.listChannels = [ 
      {label:'Llamada Telefónica',value:'llamada'},
      {label:'WhatsApp',value:'whatsapp'},
      {label:'Telegram',value:'telegram'},
      {label:'SMS',value:'sms'},
      {label:'Correo Electrónico',value:'email'}
    ];

    this.items = [
      { name: 'Aguascalientes'},
      { name: 'Baja California'},
      { name: 'Baja California Sur'},
      { name: 'Campeche'},
      { name: 'CDMX'},
      { name: 'Coahuila'},
      { name: 'Colima'},
      { name: 'Chiapas'},
      { name: 'Chihuahua'},
      { name: 'Durango'},
      { name: 'Guanajuato'},
      { name: 'Guerrero'},
      { name: 'Hidalgo'},
      { name: 'Jalisco'},
      { name: 'México'},
      { name: 'Michoacán'},
      { name: 'Morelos'},
      { name: 'Nayarit'},
      { name: 'Nuevo León'},
      { name: 'Oaxaca'},
      { name: 'Puebla'},
      { name: 'Querétaro'},
      { name: 'Quintana Roo'},
      { name: 'San Luis Potosí'},
      { name: 'Sinaloa'},
      { name: 'Sonora'},
      { name: 'Tabasco'},
      { name: 'Tamaulipas'},
      { name: 'Tlaxcala'},
      { name: 'Veracruz'},
      { name: 'Yucatán'},
      { name: 'Zacatecas'}
    ];  

    this.list();
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

  newCoordinationArray() 
  {
    return this.formBuilder.group({
        
        incidenceCoordinationDependencyPhoneId:[null,[Validators.required]],
        incidenceCoordinationCommunicationChannel:[null,[Validators.required]]
    });
  }

  newPeopleArray() 
  {
    return this.formBuilder.group({
        incidencePeopleName: ' ',   
        incidencePeopleGenre: 'no especificado',
        incidencePeopleAge: 0, 
        incidencePeopleBirthDate: null, 
        incidencePeopleBirthPlace: ' ',
        incidencePeopleSigns: ' ',
        incidencePeopleAddress: ' ',
    });
  }

  newVehicleArray() 
  {
    return this.formBuilder.group({
        incidenceVehicleBrand:' ',   
        incidenceVehicleModel: ' ',
        incidenceVehiclePlateNumber: ' ',
        incidenceVehicleColor: ' ',
        incidenceVehicleOthers: ' '
    });
  }
  
  infoCoordinationsArray(): FormArray {
    return this.form.get('incidenceCoordinations') as FormArray;
  }

  infoPeoplesArray(): FormArray {
    return this.form.get('incidencePeoples') as FormArray;
  }

  infoVehiclesArray(): FormArray {
    return this.form.get('incidenceVehicles') as FormArray;
  }
  
  addRow(type){
    switch (type) {
        case 'coordination':
            this.infoCoordinationsArray().push(this.newCoordinationArray());  
            break;
        case 'people':
            this.infoPeoplesArray().push(this.newPeopleArray()); 
            break;
        case 'vehicle':
            this.infoVehiclesArray().push(this.newVehicleArray()); 
            break;
      }
  }

  removeRow(type,index:number){
      switch (type) {
          case 'coordination':
            this.infoCoordinationsArray().removeAt(index); 
              break;
          case 'people':                
              this.infoPeoplesArray().removeAt(index); 
              break;
          case 'vehicle':
              this.infoVehiclesArray().removeAt(index);
              break;
      }
  }

  isCoordinationDuplicated(control: FormArray ) 
  {
      const uniqueValues = new Set();
      for (const item of control.controls) 
      {

        const obj = item.value.incidenceCoordinationDependencyPhoneId
        if (uniqueValues.has(obj)) 
        {
          return { duplicated: true }; 
        }          
            
          uniqueValues.add(obj);
      }
          

      return null; //en este punto no hay error, se regresa null	
  }

  cancel(event) {
    event.preventDefault(); //
    this.router.navigate(['/incidences']);
  }

  getDevices(value){
    if(value != null ) {
      let x = "monitoringDeviceCostumerId['id']";
      this.monitoringDeviceService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"'+x+'"}]',0,1,'[{"id":"asc"}]')
      .subscribe( (data:any )=>
      {            
         
      
        this.listDevices = (data== null ? []: data['object']['records']);

            
         
      },
      (err : any) =>
      {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error al cargar listado de dispositivos ' , detail:err.message, life: 3000 });
          this.miscService.endRquest();
      });
    }
  }
 
  
  /*isRowSelectable(event){

    this.listDevices.forEach(element => {
      if(element.id == event.data['id'] ){
        element['monitoringDeviceIsInvolved'] = true;
      }
    });
  }
  isRowUnSelectable(event){
    this.listDevices.forEach(element => {
      if(element.id == event.data['id'] ){
        element['monitoringDeviceIsInvolved'] = false;
        element['monitoringDeviceIsFault'] = false;
      }
    });
  }*/

  getStatusCheck(obj:MonitoringDevice,index:number){
    let disabled = false;
    if(!obj.monitoringDeviceIsInvolved ){
      disabled = true;
      this.listDevices[index]['monitoringDeviceIsFault'] = false;
    }

    return disabled;

  }
  onUpload(event: any) 

  {
    //console.log(event);
      this.files = event.currentFiles;
    
      for(let i = 0 ; i < this.files.length; i++)
      {
        if(this.uploadedFiles.indexOf(this.files[i]) === -1){
          this.uploadedFiles.push(this.files[i]);
          //this.addRow('evidence');
          //asigna valores del File 
        }else {
          //PENDIENTE MEJORAR
        }
      } 
  }


  removeFile(obj:any,i:number){
      this.uploadedFiles = this.uploadedFiles.filter(e => e != obj);
      this.fileUpload.files = this.uploadedFiles;
  }
  saveEvidence(id:string)
  {     
    
    if(this.uploadedFiles.length > 0)
    {	
            var peticiones: any[] = []; 
            for(let i = 0 ; i < this.uploadedFiles.length; i++)
            {
                const ptt = this.fileService.upload(this.uploadedFiles[i], 'incidence_evidence').pipe
                (
                    catchError((error) => 
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar los archivos", detail:error.message });
                return of(null);
                    })
                );				
                peticiones.push(ptt);			        
            }
            
            forkJoin(peticiones).subscribe((data: any[]) => 
            {
                let files : any[] = [];
                for(let i = 0 ; i < data.length; i++)
                {
                    if(data[i] != null){
                        files.push({
                          incidenceEvidenceIncidenceId: id,
                          incidenceEvidencePath: data[i].files[0].fd,
                          incidenceEvidenceName : data[i].files[0].filename,
                          incidenceEvidenceSize : (data[i].files[0].size / 1024).toFixed(2),
                        });
                    }           
                }
                this.saveEvidenceFiles(id,files);
            }, 
            err => 
            {		
                this.miscService.endRquest(); 
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar archivo", detail:err.message });
            }); 
    }
    else
    {
      this.messageService.add({ severity: 'success', key: 'msg',summary: 'Operación exitosa', detail: 'Elemento guardado exitosamente', life: 3000 }); 
      this.miscService.endRquest(); 
    }

    }
  private saveEvidenceFiles(idP,files)
    {
    
        var peticiones: any[] = [];

        for(let i = 0 ; i < files.length; i++)
        {
            peticiones.push(this.incidenceEvidenceService.create(files[i]).pipe
            (
                catchError((error) => 
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar archivo "+ (i+1), detail:error.message });
                    return of(null);
                })
            ));	
        }

        forkJoin(peticiones).subscribe((data: any[]) => 
        {
            //this.messageService.add({ severity: 'success', key: 'msg',summary: 'Operación exitosa', detail: 'Elemento guardado exitosamente', life: 3000 }); 
            this.miscService.endRquest(); 

            this.router.navigate(['/incidences']);
        }, 
        err => 
        {		
            this.miscService.endRquest(); 
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar archivo", detail:err.message });
        }); 
  }

  private save() {

    
   // return;
    
    let incidence = {};
    Object.keys(this.form.value).forEach(element => {
      if(element != "incidenceCoordinations" ){
          if( element == 'incidenceCostumerId'){
              incidence[element] = this.form.value[element].toString();
          }else{
            incidence[element] = this.form.value[element];
          }
      }
    });

    this.listDevices.forEach(element => {
      if(element["monitoringDeviceIsInvolved"] ){
          this.selectedRegister.push(element);
      }
    });

    incidence['incidenceEndDateAttention'] = this.datePipe.transform(new Date(), 'yyyy-MM-dd  HH:mm:ss');
    incidence['incidenceEndDate'] = this.datePipe.transform(incidence['incidenceEndDate'], 'yyyy-MM-dd  HH:mm:ss'); 
    incidence['incidenceStartDate'] = this.datePipe.transform(incidence['incidenceStartDate'], 'yyyy-MM-dd  HH:mm:ss');


   // console.log(incidence);

    this.incidenceService.create(incidence)
    .subscribe(data => {
        let actions = [];
        let deviceFault = [];
        
        //1. Crear respaldo 
      if (this.selectedRegister.length > 0){
        this.selectedRegister.forEach(obj => {  

          // a) guardar dispositivos selectRegister en tabla IncidenceBackDevice


          let backDevice = {};
          
          backDevice['incidenceBackDeviceMonitoringDeviceId'] =  obj['id'].toString();
          backDevice['incidenceBackDeviceMonitoringDeviceCustomerId'] =  obj['monitoringDeviceCostumerId']['id'].toString();
          backDevice['incidenceBackDeviceMonitoringType'] =   obj['monitoringDeviceType']
          backDevice['incidenceBackDeviceMonitoringProviderType'] =   obj['monitoringDeviceProvider'];    
          backDevice['incidenceBackDeviceMonitoringName'] = obj['monitoringDeviceName'];        
          
          const ptt = this.incidenceBackDeviceService.create(backDevice).pipe(
              catchError((error) => {
                  throw this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al respaldo de dispositivo #ID: "+ obj['id'],detail:  error.error.error });
                  return of(null);
              })
          );		
          actions.push(ptt);
        });
        }
      //Guarda las coordinaciones
       if (this.form.value['incidenceCoordinations'].length > 0){
          this.form.value['incidenceCoordinations'].forEach(obj => { 
            obj['incidenceCoordinationIncidenceId'] =  (data['newId']).toString();
            obj['incidenceCoordinationDependencyPhoneId'] = obj['incidenceCoordinationDependencyPhoneId'].toString();
            obj['incidenceCoordinationCommunicationChannel'] = obj['incidenceCoordinationCommunicationChannel'];
            const ptt = this.incidenceCoordinationService.create(obj).pipe(
                catchError((error) => {
                    throw this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar telefono ",detail:  error.error.error });
                    return of(null);
                })
            );		
            actions.push(ptt);
          });
        }
        //Guarda las personas involucradas
        if (this.form.value['incidencePeoples'].length > 0){
          this.form.value['incidencePeoples'].forEach(obj => { 
            obj['incidencePeopleIncidenceId'] =  (data['newId']).toString();
            obj['incidencePeopleBirthDate'] = this.datePipe.transform(obj['incidencePeopleBirthDate'], 'yyyy-MM-dd');

            const ptt = this.incidencePeopleService.create(obj).pipe(
                catchError((error) => {
                    throw this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar telefono ",detail:  error.error.error });
                    return of(null);
                })
            );		
            actions.push(ptt);
          });
        }
        //Guarda los vehiculos involucrados
        if (this.form.value['incidenceVehicles'].length > 0){
          this.form.value['incidenceVehicles'].forEach(obj => { 
            obj['incidenceVehicleIncidenceId'] =  (data['newId']).toString();
            const ptt = this.incidenceVehicleService.create(obj).pipe(
                catchError((error) => {
                    throw this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar telefono ",detail:  error.error.error });
                    return of(null);
                })
            );		
            actions.push(ptt);
          });
        }
        //this.saveEvidence((data['newId']).toString());
        if (actions.length > 0){
          forkJoin(actions).subscribe((dataInfo)=>
          {
              //newBackDevideId filtrar data
              let backDevice = dataInfo.filter( obj =>obj.hasOwnProperty("newBackDevideId"));

              if(backDevice.length > 0){
                this.saveIncidenceInvolvedDevice(backDevice,(data['newId']).toString());
              }else{
                this.saveEvidence((data['newId']).toString());
              }
          },
          (err:any)=>
          {
              this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al guardar respaldos y  telefonos de coordinacion', life: 3000 });                    this.miscService.endRquest();
          });
        }else{
          this.miscService.endRquest(); 
          this.router.navigate(['/incidences']);
        }
      }, (err: any) => {
        this.messageService.add({ severity: 'error', key: 'msg', summary: 'Error', detail: 'Problemas al guardar', life: 3000 });
        this.miscService.endRquest();
      });

      
  }

  list(){

    const customers = this.costumerService.getAll(0,1,'[{"id":"asc"}]')
    .pipe(
        catchError((error) => 
        {
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar dispositivos", detail:error.message });
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



    forkJoin([customers,phones]).subscribe(([dataCustomers,dataPhones])=>
    {
      this.listCostumer = (dataCustomers == null ? []: dataCustomers['object']['records']);


      let nuevoObjeto = {};
      //Recorremos el arreglo 
      dataPhones['object']['records'].forEach( x => { 
        if( !nuevoObjeto.hasOwnProperty(x.dependencyPhoneDependencyId['dependencyDependencyCategoryId']['dependencyCatergoryDescription'])){
            nuevoObjeto[x.dependencyPhoneDependencyId['dependencyDependencyCategoryId']['dependencyCatergoryDescription']] = {
            phones: []
          }
        }
        
        //Agregamos los datos de phones
        let labelx = x.dependencyPhoneDependencyId['dependencyDescription']+" / Tel: "+ x.dependencyPhoneNumber;
        let phone = {label:labelx, value:x.id };
          nuevoObjeto[x.dependencyPhoneDependencyId['dependencyDependencyCategoryId']['dependencyCatergoryDescription']].phones.push(phone);
        
      });


      let claves = Object.keys(nuevoObjeto); 
      for(let i=0; i< claves.length; i++){
        this.listPhones.push({label:claves[i] ,items:nuevoObjeto[claves[i]].phones});
        
      }

    }, 
    (err : any)=>{
      this.miscService.endRquest(); //fin del proceso por error
      this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error general guardar teléfonos", detail:err.message });
            

    });
  }

 
  saveIncidenceInvolvedDevice(deviceId,idIncidence){

        let actions = [];


      //1. Crear respaldo 
      deviceId.forEach((obj,index) => {  

          let involvedDevice = {};
         

          involvedDevice['incidenceInvolvedDeviceIncidenceBackDeviceId'] =  (obj['newBackDevideId']).toString();
          involvedDevice['incidenceInvolvedDeviceIncidenceId'] = idIncidence;
          involvedDevice['incidenceInvolvedDeviceFailed'] =  (this.selectedRegister[index]['monitoringDeviceIsFault'] == undefined || this.selectedRegister[index]['monitoringDeviceIsFault'] == false) ? false: this.selectedRegister[index]['monitoringDeviceIsFault'];  

          const ptt = this.incidenceInvolvedDeviceService.create(involvedDevice).pipe(
              catchError((error) => {
                  throw this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al relacionar respaldo con dispositivo involucrado  #ID: "+ obj['newId'],detail:  error.error.error });
                  return of(null);
              })
          );		
          actions.push(ptt);
        });

        forkJoin(actions).subscribe(([data])=>
        {
            //this.miscService.endRquest(); 
            this.router.navigate(['/incidences']);
            this.saveEvidence(idIncidence);


        },

        (err:any)=>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al crear suministros', life: 3000 });                    this.miscService.endRquest();
        });


  }
}

