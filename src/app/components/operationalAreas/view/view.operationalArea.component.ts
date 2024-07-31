import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OperationalArea} from 'src/app/api/operationalArea';
import { OperationalAreaService } from 'src/app/service/operationalArea.service';
import { CostumerService } from 'src/app/service/costumer.service'
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { AbstractControlOptions, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError  } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { MiscService } from 'src/app/service/misc.service';
import { Costumer } from 'src/app/api/costumer';
import { Location } from '@angular/common';



@Component({
    templateUrl: './view.operationalArea.component.html'
})
export class ViewOperationalAreaComponent implements OnInit, OnDestroy {
    id:number;
    form: FormGroup | any;
    listType: any[] = [];
    listCustomers: Costumer[] = [];


    constructor(private miscService:MiscService,private location: Location, private customerService: CostumerService,private formBuilder: FormBuilder,private operationalAreaService: OperationalAreaService, private messageService: MessageService, private confirmationService: ConfirmationService,private route: ActivatedRoute,private router: Router ) 
    {
    }

    ngOnInit(): void 
	{
        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; //MustMatch('password', 'confirmPassword') };
        this.id = parseInt(this.route.snapshot.params['idx']);
        this.form = this.formBuilder.group
		({
             id:[this.id, Validators.required], 
             operationalAreaIdentifier: [{disabled:true,value:null}, [Validators.required,Validators.maxLength(255)]],
            operationalAreaType:  [{disabled:true,value:null}, [Validators.required]],
            operationalAreaCustomerId: [{disabled:true,value:null}, [Validators.required]],
            operationalAreaStreet: [{disabled:true,value:null}, [Validators.maxLength(150)]],    
            operationalAreaColony:  [{disabled:true,value:null}, [Validators.maxLength(150)]],
            operationalAreaExternalNumber: [{disabled:true,value:null}, [Validators.maxLength(5)]],
            operationalAreaInteriorNumber:  [{disabled:true,value:null}, [Validators.maxLength(5)]],
            operationalAreaMunicipality:  [{disabled:true,value:null}, [Validators.maxLength(150)]],
            operationalAreaState:  [{disabled:true,value:null}, [Validators.maxLength(150)]],
            operationalAreaPostalCode: [{disabled:true,value:null}, [Validators.maxLength(5)]],
            operationalAreaCrossing1: [{disabled:true,value:null}, [Validators.maxLength(255)]],
            operationalAreaCrossing2: [{disabled:true,value:null}, [Validators.maxLength(255)]],
            operationalAreaBranchPhone: [{disabled:true,value:null}, [Validators.maxLength(15)]],
            operationalAreaBranchResponsiblePerson: [{disabled:true,value:null}, [Validators.maxLength(255)]],
        }, formOptions);;

       
        this.listType= [ 
            { label: 'Dirección', value:"direccion"},
            { label: 'Sucursal', value:"sucursal"},
            { label: 'Cuadrante', value:"cuadrante"}
        ];
        
        this.getData();

    }

    ngOnDestroy() {
       
    }
    onSubmit() 
	{

        // stop here if form is invalid
        if (this.form.invalid) {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error',  detail:'Revisar formulario', life: 3000 });
            return;
        }
        this.miscService.startRequest();
        this.save();
    }
    cancel(event) {
        event.preventDefault(); //
        this.router.navigate(['/operationalAreas']);
    }

    private save(){
        
        this.form.value['operationalAreaCustomerId'] =  this.form.value['operationalAreaCustomerId'].toString();
        this.operationalAreaService.update(this.form.value)
        .subscribe(data =>{
            //console.log(data);
            this.miscService.endRquest();
            this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa',  life: 3000 });        
            this.router.navigate(['/operationalAreas']);          
            
        },  (err : any) => {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: err.message, life: 3000 });

        });
    }

    
    getData(){
        this.miscService.startRequest();
        const area = this.operationalAreaService.getById(this.id)
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar datos del área operativa con ID:"+this.id, detail:error.message });
                return of(null); 
            })
        );
        
        const customers =this.customerService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo de clientes", detail:error.message });
                return of(null); 
            })
        );
        
        forkJoin([area,customers]).subscribe(async ([dataAreas,dataCustomers] )=>
        {
           
            if(dataCustomers != null)
            {
                this.listCustomers =  dataCustomers['object']['records'];
            }

            
            await this.form.patchValue(dataAreas); // this.form.patchValue(data);
           
            this.miscService.endRquest(); 
        },

        (err:any)=>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener datos', life: 3000 });
            this.miscService.endRquest();
        });
            
		
    }

    goBack() {
        event.preventDefault(); //
        this.location.back(); // <-- go back to previous location on cancel
    }
}
