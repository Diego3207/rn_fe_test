import { Component, ElementRef, ViewChildren, NgZone, QueryList} from '@angular/core';
import { TrackerService } from 'src/app/service/tracker.service';
import { SupplyService } from 'src/app/service/supply.service';
import { SimCardService } from 'src/app/service/simCard.service';
//import { Service } from 'src/app/service/tracker.service';

import { Router } from '@angular/router';
import {ConfirmationService, MessageService  } from 'primeng/api';
import {AbstractControlOptions, FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { MiscService } from 'src/app/service/misc.service';

@Component({
    templateUrl: './add.tracker.component.html'
})
export class AddTrackerComponent  {
    @ViewChildren('search') searchElementRef!: QueryList<ElementRef>;
    form: FormGroup | any;
    listSIMs: any[] = [];
    listSimsRaw: any[] = [];
    listSupplies: any[] = [];
    listSuppliesRaw: any[] = [];
    listSimCards: any[] = [];
    listTrackerCategories: any[] = [];
    simCardSupplyId: number;


    constructor(    
        private formBuilder: FormBuilder,
        private trackerService: TrackerService,
        private supplyService: SupplyService,
        private simCardService: SimCardService,
        private messageService: MessageService,
        private miscService:MiscService,
        private router: Router ) 
    {
    }

    

    ngOnInit(): void 
	{

        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; 
       
		this.form = this.formBuilder.group
		({
            trackerSupplyId: [null,[Validators.required]],
            trackerImei: [null, [Validators.required,Validators.maxLength(16)]],
            trackerSimCardId: null,
            trackerCategory: [null,[Validators.required]],
            trackerMaximumVoltage: 0.00,
            trackerMinimumVoltage: 0.00,
         }, formOptions);
         
         this.list();

        this.form.get("trackerSupplyId").valueChanges.subscribe(selectedValue => 
        {
            this.listSuppliesRaw['object'].forEach(element => {
                if(element.id == selectedValue ){
                    this.form.controls.trackerImei.setValue(element.supplyKey);
                }
            });
        }); 

        this.listTrackerCategories = [ 
            {label:'Fijo',value:'fijo'},
            {label:'Móvil',value:'movil'},
            {label:'Pulso',value:'pulso'}

        ];      

        this.form.get("trackerSimCardId").valueChanges.subscribe(selectedValue => 
            {
                this.listSimsRaw['object'].forEach(element => {
                    if(element.id == selectedValue ){
                        this.simCardSupplyId = element.supplyId;
                    }
                });
            });
    }

    ngOnDestroy() {
       
    }
    onSubmit() 
	{
        if (this.form.invalid ) {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error',  detail:'Revisar formulario', life: 3000 });

            return;
        }
        this.miscService.startRequest();
        this.save();
        
    }
    cancel(event) {
        event.preventDefault(); //
        this.router.navigate(['/trackers']);
    }
       
    private save(){
        this.miscService.startRequest();  
        
        this.form.value.trackerSupplyId = (this.form.value.trackerSupplyId).toString();
        this.form.value.trackerSimCardId = (this.form.value.trackerSimCardId).toString();


        this.trackerService.create(this.form.value)
        .subscribe(data =>{


            //Actualizamos el estado del suministro SIM CARD a vendido
            console.log(this.simCardSupplyId.toString());
                this.supplyService.update({
                'id': this.simCardSupplyId.toString(), 
                'supplyStatus': 'vendido'
                }).subscribe(data =>{
                    this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa',  life: 3000 });
                },  (err : any)=> {
                    this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail:err.error.error , life: 3000 });
                });
            //////////////////////////////


            this.miscService.endRquest();
	    this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa',  life: 3000 });  
            this.router.navigate(['/trackers']);
            
        },  (err : any)=> {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Problemas al guardar', life: 3000 });
            this.miscService.endRquest(); 
        });
    }
    list(){

       this.miscService.startRequest();
  
        const supplies = this.supplyService.getList(1,null)
        .pipe(
			catchError((error) => 
			{
				this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de suministros", detail:error.message });
				return of(null); 
			})
		);

        const sims = this.simCardService.getList(1,null)

        .pipe(
			catchError((error) => 
			{
				this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de lineas", detail:error.message });
				return of(null); 
			})
		);
       
             
        forkJoin([supplies,sims]).subscribe(([dataSupplies, dataSims] )=>
        {
            this.miscService.endRquest(); 
            this.listSuppliesRaw = dataSupplies;
            if(dataSupplies != null )
            {        
                this.listSuppliesRaw = dataSupplies;            
                dataSupplies['object'].forEach(element => {
                    this.listSupplies.push({'label':  "Producto: "+element['product']+" / Serial: "+element['supplyKey'],'value': element['id']});
                });
            }else{
                this.messageService.add({ severity: 'warn', key: 'msg', summary: 'Advertencia', detail: 'Sin  suministros disponibles de tipo RASTREADOR para relacionar', life: 4000 });
            }

            if(dataSims != null )
            {                 
		this.listSimsRaw = dataSims;                
		dataSims['object'].forEach(element => {
                    this.listSimCards.push({'label':  "ICCID: "+element['iccid'],'value': element['id']});
		    console.log(element);
                });
            }else{
                this.messageService.add({ severity: 'warn', key: 'msg', summary: 'Advertencia', detail: 'Sin  SIMs disponibles para relacionar', life: 4000 });

            }

            
        },

        (err:any)=>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los catalogos', life: 3000 });
            this.miscService.endRquest();
        });
       
    }
}
