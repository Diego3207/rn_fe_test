import { Component, ElementRef, NgZone, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MiscService } from 'src/app/service/misc.service';
import { TrackerInstallationService } from 'src/app/service/trackerInstallation.service';
import { CostumerService } from 'src/app/service/costumer.service';
import { TrackerService } from 'src/app/service/tracker.service';
import { InstallerService } from 'src/app/service/installer.service';
import { TrackerInstallationEvidenceService  } from 'src/app/service/trackerInstallationEvidence.service'; 
import { TrackerInstallationAccessoryService  } from 'src/app/service/trackerInstallationAccessory.service';
import { VehicleService } from 'src/app/service/vehicle.service';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute,Router } from '@angular/router';
import {ConfirmationService, MessageService  } from 'primeng/api';
import {AbstractControlOptions, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { FileService } from 'src/app/service/file.service';



@Component({
    templateUrl: './edit.trackerInstallation.component.html',
    providers: [DatePipe]
})
export class EditTrackerInstallationComponent implements OnInit, OnDestroy {
    @ViewChild('search')
    public searchElementRef!: ElementRef;
    @ViewChild('fileUpload') fileUpload: FileUpload;
    files : any[] = [];
    uploadedFiles: any[] = []; //lista de archivos por cargar
    submitted: boolean = false;
    id:number;
    form: FormGroup | any;
    trackerInstallationCoordenates: string;
    listCustumers : any[] = [];
    listTrackers : any[] = [];
    listInstallers : any[] = [];
    listVehicles : any[] = [];
    listAccessories : any[] = [];
    //listAccessoriesCurrent : any[] = [];
    deletedAccessories: any[] = [];
    deletedEvidences: any[] = [];
    listMimeType = ['application/pdf','image/png', 'image/jpeg'];
    listTypeCuts : any[] = [];
    listFilteredTypeCuts : any[] = [];
    listDescriptions : any[] = [];
    listFilteredDescriptions : any[] = [];
    dataInstallation : any = {};
                                                    


    constructor(
        private formBuilder: FormBuilder,
        private trackerInstallationService: TrackerInstallationService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private costumerService: CostumerService,
        private trackerService: TrackerService,
        private vehicleService: VehicleService,
        private installerService: InstallerService,
        private trackerInstallationAccessoryService : TrackerInstallationAccessoryService,
        private trackerInstallationEvidenceService : TrackerInstallationEvidenceService,
        private productService: ProductService,
        private miscService:MiscService,
        private ngZone: NgZone,
        private datePipe: DatePipe,
        private route: ActivatedRoute,
        private fileService:FileService,
        private router: Router ) 
    {
    }

    ngOnInit(): void 
	{
        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; //MustMatch('password', 'confirmPassword') };
        this.id = parseInt(this.route.snapshot.params['idx']);
		    this.form = this.formBuilder.group
		({
            id:[this.id, Validators.required],
            trackerInstallationCostumerId: [null, [Validators.required]],
            trackerInstallationVehicleId : [null, [Validators.required]],
            trackerInstallationTrackerId: [{value:null, disabled:true}, [Validators.required]],
            trackerInstallationInstallerId: [null, [Validators.required]],
            trackerInstallationDate: [null, [Validators.required]],
            trackerInstallationEngineStop: [false,[Validators.required]],
            trackerInstallationTypeCut: [null, [Validators.required, Validators.maxLength(100)]],
            trackerInstallationEvidences: this.formBuilder.array([]),
            trackerInstallationAccessories: this.formBuilder.array([],[this. isAccessoryDuplicated]),
            trackerInstallationLocation: [null, [Validators.required, Validators.maxLength(100)]],
         }, formOptions);
         
        this.form.get("trackerInstallationCostumerId").valueChanges.subscribe(selectedValue => {
            if(selectedValue != null){
              this.getInfoCustomer(selectedValue);
            }
            
        });

        this.getInfo(); 

        this.listTypeCuts =
        [
        'Ignición',
        'Bomba de gasolina',
        'Marcha'
        ];

        this.listDescriptions=
        [

        'Foto delantera del vehículo donde se aprecie la placa (Frontal)',
        'Foto del vehículo completo, esquinada (lateral general)',
        'Foto VIN de la unidad',
        'Equipo (donde se pueda ver el IMEI enviar antes de desconectar o ser intervenido).',
        'En caso de ser instalación nueva o cambio enviar IMEI de equipo que se conectara.',
        'Foto del tablero antes de la instalación (Tablero de relojes y testigos).',
        'Foto de donde se conectó el equipo (Toma de corriente).',
        'Foto de donde quedó oculto el equipo, indicando la ubicación en texto.',
        'Foto de conexión a tierra. ',
        'Foto del relevador y a donde quedo conectado (ignición, bomba de gasolina o marcha). ',
        'Foto de instalación de accesorios en caso de que aplique. ',
        'Foto del tablero después de la instalación (Tablero de relojes y testigos). ',
        'Foto de la unidad terminada'
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

    infoAccessoriesArray(): FormArray {
        return this.form.get('trackerInstallationAccessories') as FormArray;
    }
    infoEvidencesArray(): FormArray {
        return this.form.get('trackerInstallationEvidences') as FormArray;
    }

    addRow(type:string){
        switch (type) {
            case 'accessory':
                this.infoAccessoriesArray().push(this.newAccessoryArray()); 
                break;
            case 'evidence':
                this.infoEvidencesArray().push(this.newEvidenceArray()); 
                break;
        }    
    }
  

    removeRow(object:any,type: string,index:number){
        switch (type) {
            case 'accessory':
                this.infoAccessoriesArray().removeAt(index); 
                if(object.value.id !== null)
                    this.deletedAccessories.push(object.value.id);
            break;
            case 'evidence':
                this.infoEvidencesArray().removeAt(index); 
                if(object.value.id !== null)
                    this.deletedEvidences.push(object.value.id);
            break;
        }
    }

    newAccessoryArray() {
        return this.formBuilder.group({
            id:null,
            trackerInstallationAccessoryProductId:  [null,[Validators.required]],
        });
    }
    newEvidenceArray() {
        return this.formBuilder.group({
            id:null,
            trackerInstallationEvidenceDescription: null,
        });
    }
    isAccessoryDuplicated(control: FormArray){
        const uniqueValues = new Set();
        
        for (const item of control.controls) 
        {

        const obj = item.value. trackerInstallationAccessoryProductId
            if (uniqueValues.has(obj)) 
            {
                return { duplicated: true }; 
            }          
            
            uniqueValues.add(obj);
        }

        return null; //en este punto no hay error, se regresa null	
    }
    getLabel(id:number){
        let text = '';

        if(id != null )
            text = (this.listAccessories.find((obj) => obj.value ==  id)).label;

        return  text;
    }
    cancel(event) {
        event.preventDefault(); //
        this.router.navigate(['/trackerInstallations']);
    } 
    onUpload(event: any) 
	{
       
        this.files = event.currentFiles;
        
        for(let i = 0 ; i < this.files.length; i++)
        {
            if(this.uploadedFiles.indexOf(this.files[i]) === -1){
            this.uploadedFiles.push(this.files[i]);
            this.addRow('evidence');
            //asigna valores del File 
            }else {
            //PENDIENTE MEJORAR
            // console.log('Elemento duplidado');
            }
        } 
       
    }

 
    removeFile(obj:any,i:number){
        this.uploadedFiles = this.uploadedFiles.filter(e => e != obj);
        //if(this.fileUpload.files.length > 0)
        this.fileUpload.files = this.fileUpload.files.filter(e => e != obj);

        //console.log(this.fileUpload);
        //console.log(this.form);
        this.removeRow(this.form.controls.trackerInstallationEvidences.controls[i],'evidence',i);
    }
    saveEvidence(id:string)
    {     
        //1. solo guardar la evidencia nueva con su descripcion
        let newFiles = this.uploadedFiles.filter(e => !e.hasOwnProperty("id")) ;
        let descriptions = this.form.value.trackerInstallationEvidences.filter(e=> e.id== null) ;
    
        if(newFiles.length > 0)
        {	
                var peticiones: any[] = []; 
                for(let i = 0 ; i < newFiles.length; i++)
                {
                    
                        const ptt = this.fileService.upload(newFiles[i], 'tracker_installation_evidence').pipe
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
                                trackerInstallationEvidenceTrackerInstallationId: id,
                                trackerInstallationEvidencePath: data[i].files[0].fd,
                                trackerInstallationEvidenceName : data[i].files[0].filename,
                                trackerInstallationEvidenceSize : (data[i].files[0].size / 1024).toFixed(2),
                                trackerInstallationEvidenceDescription :descriptions[i]['trackerInstallationEvidenceDescription']                     
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
            peticiones.push(this.trackerInstallationEvidenceService.create(files[i]).pipe
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
            this.messageService.add({ severity: 'success', key: 'msg',summary: 'Operación exitosa', detail: 'Elemento guardado exitosamente', life: 3000 }); 
            this.miscService.endRquest(); 
        }, 
        err => 
        {		
            this.miscService.endRquest(); 
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar archivo", detail:err.message });
        }); 
    }
  
    
    private save()  
    {
         
        this.miscService.startRequest();

        let installation = {};
    
        Object.keys(this.form.value).forEach(element => {
          if(element != "trackerInstallationAccessories"  && element != 'trackerInstallationEvidences' )
            installation[element] = this.form.value[element];   
        });

        installation['trackerInstallationCostumerId'] = installation['trackerInstallationCostumerId'].toString(); 
        installation['trackerInstallationVehicleId'] = installation['trackerInstallationVehicleId'].toString();
        installation['trackerInstallationInstallerId'] =  installation['trackerInstallationInstallerId'].toString();
        installation['trackerInstallationDate'] = this.datePipe.transform(this.form.value['trackerInstallationDate'], 'yyyy-MM-dd HH:mm:ss');
    
        this.trackerInstallationService.update(installation)
        .subscribe(data => {
            //this.miscService.endRquest(); 
            const actions = [];
            if( this.form.value['trackerInstallationAccessories'].length > 0 ){
                
                this.form.value['trackerInstallationAccessories'].forEach(obj => {
                    let accessory = {};
                    accessory['trackerInstallationAccessoryTrackerInstallationId'] = (this.form.value['id']).toString();
                    accessory['trackerInstallationAccessoryProductId'] =  obj['trackerInstallationAccessoryProductId'].toString();
                        
                    if(obj['id'] == null)
                    {
                        // create                        
                        const create = this.trackerInstallationAccessoryService.create(accessory)
                        .pipe(
                            catchError((error) => 
                            {
                                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al crear nuevo accesorio", detail:error.message });
                                return of(null);
                            })
                        );		
            
                        actions.push(create);
                    }else{
                        // update
                        accessory['id'] = obj['id'];                   
                        const update = this.trackerInstallationAccessoryService.update(accessory)
                        .pipe(
                            catchError((error) => 
                            {
                                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al actualizar accesorio existente", detail:error.message });
                                return of(null);
                            })
                        );		
                        actions.push(update);
                    }
                });
                //-Disable ("delete")
                this.deletedAccessories.forEach(id => {
                        // update
                    const disabled = this.trackerInstallationAccessoryService.disable(id).pipe(
                    catchError((error) => 
                    {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar accesorio existente", detail:error.message });
                            return of(null);
                        })
                    );	
                    actions.push(disabled);	
                        
                });
    
            }

            if(this.form.value['trackerInstallationEvidences'].length > 0){
                this.form.value['trackerInstallationEvidences'].forEach((obj,index) => {
                    
                        
                    if(obj['id'] != null) //id == null fueron guardados al subir la evidencia
                    {
                        // update               
                        const update = this.trackerInstallationEvidenceService.update(obj)
                        .pipe(
                            catchError((error) => 
                            {
                                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error ", detail:"Al actualizar descripción de evidencia  con orden: "+(index+1)+"\n"+error.message });
                                return of(null);
                            })
                        );		
                        actions.push(update);
                    }
                });
                //crear nueva evidencia
                this.saveEvidence(this.form.value['id'].toString());

                //-Delete evidence
                this.deletedEvidences.forEach(id => {
                    // update
                    const deleteFile = this.trackerInstallationEvidenceService.delete(id).pipe
                    (
                        catchError((error) => 
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar archivos de la base se datos", detail:error.message });
                            return of(null);
                        })
                    );	
                    actions.push(deleteFile);	
                    
                });

            }

            if(actions.length > 0){
                forkJoin(actions).subscribe(([] :any)=>
                {
                    this.miscService.endRquest();
                    this.router.navigate(['/trackerInstallations']);
                },
                (err:any)=>{
                    this.miscService.endRquest();
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar accesorios", detail:err.message });
                });
            }else{
                this.miscService.endRquest();
                this.router.navigate(['/trackerInstallations']);
            }
    
        }, (err: any) => {
            this.messageService.add({ severity: 'error', key: 'msg', summary: 'Error', detail: 'Problemas al guardar', life: 3000 });
            this.miscService.endRquest();
        });
      
    } 
    getInfoCustomer(value:number){

        const trackers =  this.trackerService.getList(1,'{"customer_id":1}')
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de rastreadores", detail:error.message });
                return of(null); 
            })
        );
    
        const vehicles = this.vehicleService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"vehicleCostumerId"}]',0,1,'[{"id":"asc"}]')
    
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de vehiculos", detail:error.message });
                return of(null); 
            })
        );
        forkJoin([trackers,vehicles]).subscribe(([dataTrackers,dataVehicles])=>
        {
          if(dataTrackers != null){
                    
            dataTrackers['object'].forEach(element => {
              this.listTrackers.push({'label':element['trackerImei']+" / "+ element['trackerStatus'].toUpperCase(),'value':element['id']});
            });

            if( Object.keys(this.dataInstallation).length > 0){
                this.form.controls['trackerInstallationTrackerId'].setValue(this.dataInstallation['trackerInstallationTrackerId']);
                this.dataInstallation = {};
            }
    
          }else{
            this.listTrackers = [];
            this.messageService.add({ severity: 'warn', key: 'msg', summary: 'Advertencia', detail: 'Sin rastreadores disponibles para el cliente seleccionado', life: 4000 });
          }
    
          if(dataVehicles != null){
            this.listVehicles =  dataVehicles['object']['records']; 
          }else{
            this.listVehicles = [];
            this.messageService.add({ severity: 'warn', key: 'msg', summary: 'Advertencia', detail: 'Sin vehiculos relacionados para el cliente seleccionado', life: 4000 });
    
          }
          this.miscService.endRquest();
                   
          },
          (err:any)=>{
            this.miscService.endRquest();
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar accesorios", detail:err.message });
        });
        
    
      }
    getInfo(){

        this.miscService.startRequest();
      
        const customers = this.costumerService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de clientes", detail:error.message });
                return of(null); 
            })
        );
        
        const installers = this.installerService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de instaladores", detail:error.message });
                return of(null); 
            })
        );
        const installation = this.trackerInstallationService.getById(this.id)
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al traer informacion de la instalacion", detail:error.message });
                return of(null); 
            })
        );

        const accessories = this.productService.getFilter('[{"value":"3","matchMode":"equals","field":"productCategoryId"}]',0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                return of(null); 
            })
        );
        
       
        forkJoin([customers, installers,installation,accessories]).subscribe(  ([dataCustomers,dataInstallers,dataInstallation,dataAccessories] )=>
        {
            
    
            if(dataCustomers != null)
                this.listCustumers = dataCustomers['object']['records'];       
    
            
            
            if(dataInstallers != null)
              this.listInstallers = dataInstallers['object']['records']; 
           

            if(dataAccessories != null)
            {
                dataAccessories['object']['records'].forEach(element => {
                    if(element['productCategoryId']['id'] == 3)
                        this.listAccessories.push({'label':element['productBrand']+" "+ element['productModel'],'value':element['id']});
                });
            }

            if(dataInstallation != null) {

                this.dataInstallation = dataInstallation;
            
                //Asigna valores
                for (let i=0; i < dataInstallation['trackerInstallationAccessories'].length; i++){
                   this.addRow('accessory');    
                }

                for (let i=0; i < dataInstallation['trackerInstallationEvidences'].length; i++){

                    this.addRow('evidence');   

                    let row = dataInstallation['trackerInstallationEvidences'][i];

                    let mimeType =  this.getMimeType(row['trackerInstallationEvidenceName'])[0];

                    let obj = {
                        id:row['id'],
                        name: row['trackerInstallationEvidenceName'],
                        size: row['trackerInstallationEvidenceSize'] * 1024,
                        type: mimeType,
                        objectURL:this.fileService.downloadServer(row['trackerInstallationEvidencePath'])
                    }

                    this.uploadedFiles.push(obj);               

                }

                this.getInfoCustomer(dataInstallation['trackerInstallationCostumerId']);

                dataInstallation['trackerInstallationDate'] = new Date(dataInstallation['trackerInstallationDate']);

                this.form.patchValue(dataInstallation);
               
               
            }
                
           
            this.miscService.endRquest();	
        },
        (err : any) =>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error al generar los catalogos', life: 3000 });
            this.miscService.endRquest();
        });
          
    
    }
    
    filterTypeCuts(event: any) {
        let filtered: any[] = [];
        let query = event.query;
    
        for (let i = 0; i < (this.listTypeCuts as any[]).length; i++) {
            let type = (this.listTypeCuts as any[])[i];
            if (type.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(type);
            }
        }
    
        this.listFilteredTypeCuts = filtered;
    }
    
    filterDescriptions(event: any) {
        let filtered: any[] = [];
        let query = event.query;
    
        for (let i = 0; i < (this.listDescriptions as any[]).length; i++) {
            let desc = (this.listDescriptions as any[])[i];
            if (desc.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(desc);
            }
        }
    
        this.listFilteredDescriptions = filtered;
    }

    getMimeType(text:string){
        let ext =  text.split(".");

        if(ext[1] == 'jpg' ) 
            ext[1]= 'jpeg';

        return this.listMimeType.filter(element => {
            return element.includes(ext[1]);
         });

    }
    
}
