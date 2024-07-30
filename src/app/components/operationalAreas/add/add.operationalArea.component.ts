import { Component } from '@angular/core';
import { OperationalArea } from 'src/app/api/operationalArea';
//import { Provider } from 'src/app/api/provider';
import { OperationalAreaService } from 'src/app/service/operationalArea.service';
//import { ProviderService } from 'src/app/service/provider.service';
import { Router } from '@angular/router';
import {ConfirmationService, MessageService  } from 'primeng/api';
import {AbstractControlOptions, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError  } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { MiscService } from 'src/app/service/misc.service';
import { Costumer } from 'src/app/api/costumer';
import { CostumerService } from 'src/app/service/costumer.service';



@Component({
    templateUrl: './add.operationalArea.component.html'
})
export class AddOperationalAreaComponent  {
    //providersList: Provider[];
    form: FormGroup | any;
    listType: any[] = [];
    listCustomers: Costumer[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private operationalAreaService: OperationalAreaService,
        private customerService: CostumerService,

        //private providerService : ProviderService, 
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private miscService:MiscService,
        private router: Router ) 
    {
    }
    ngOnInit(): void 
	{

        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; //MustMatch('password', 'confirmPassword') };
       
		this.form = this.formBuilder.group
		({
            operationalAreaIdentifier:[null, [Validators.required,Validators.maxLength(255)]],
            operationalAreaType: [null, Validators.required],
            operationalAreaCustomerId:[null, Validators.required],
            operationalAreaStreet:[null, Validators.maxLength(150)],    
            operationalAreaColony: [null, Validators.maxLength(150)],
            operationalAreaExternalNumber:[null, Validators.maxLength(5)],
            operationalAreaInteriorNumber: [null, Validators.maxLength(5)],
            operationalAreaMunicipality: [null, Validators.maxLength(150)],
            operationalAreaState: [null, Validators.maxLength(150)],
            operationalAreaPostalCode:[null, Validators.maxLength(5)],
            operationalAreaCrossing1: [null, Validators.maxLength(255)],
            operationalAreaCrossing2: [null, Validators.maxLength(255)],
            operationalAreaBranchPhone: [null,Validators.maxLength(15)],
            operationalAreaBranchResponsiblePerson: [null, Validators.maxLength(255)],
        }, formOptions);

        this.listType= [ 
            { label: 'Dirección', value:"direccion"},
            { label: 'Sucursal', value:"sucursal"},
            { label: 'Cuadrante', value:"cuadrante"}
        ];

        this.getCostumers();

        this.form.get("operationalAreaType").valueChanges.subscribe(selectedValue => 
        {
            let wordsAdress = ['Street','Number','Colony','Municipality','State','PostalCode','Crossing'];

            if(selectedValue == 'cuadrante'){
           
                Object.keys(this.form.value).forEach(control => {
                    wordsAdress.forEach(word => {
                        if(control.includes(word))
                            this.form.controls[control].setValue(null);
                    });
                });

                Object.keys(this.form.value).forEach(control => {
                    
                    if(control.includes('Branch'))
                        this.form.controls[control].setValue(null);
                   
                });
            }
        });
    }   
    onSubmit() 
	{
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


    getCostumers(){
        this.customerService.getAll(0,1,'[{"id":"asc"}]')
      .subscribe( (data:any )=>
      {            
       this.listCustomers = ( data == null ? []: data['object']['records'])
        
      },
      (err : any) =>
      {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error al cargar listado de clientes' , detail:err.message, life: 3000 });
          this.miscService.endRquest();
      });
    }
  
    private save(){
        //console.log(this.form.value);
        this.form.value['operationalAreaCustomerId'] =  this.form.value['operationalAreaCustomerId'].toString();
        this.operationalAreaService.create(this.form.value)
        .subscribe(data =>{

            this.miscService.endRquest();
            this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa',  life: 3000 });
            
              this.router.navigate(['/operationalAreas']);
     
            
        }, (err : any) => {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: err.message, life: 3000 });
            this.miscService.endRquest();
        });
    }


    
}

