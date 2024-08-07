import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProviderService } from 'src/app/service/provider.service';
import { ProductService } from 'src/app/service/product.service';
import { ServiceService } from 'src/app/service/service.service';
import { QuotationPurchaseService } from 'src/app/service/quotationPurchase.service';
import { QuotationPurchaseProductService } from 'src/app/service/quotationPurchaseProduct.service';
import { QuotationPurchaseServiceService } from 'src/app/service/quotationPurchaseService.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { Provider } from 'src/app/api/provider';
import { Product } from 'src/app/api/product';
import { Service } from 'src/app/api/service';
import { AbstractControlOptions, FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { MiscService } from 'src/app/service/misc.service';
import { ProviderProductService } from 'src/app/service/providerProduct.service';
import { ProviderServiceService } from 'src/app/service/providerService.service';
import { DatePipe } from '@angular/common';
import { QuotationPurchase } from 'src/app/api/quotationPurchase';




@Component({
    templateUrl: './process.quotationPurchases.component.html',
    providers: [DatePipe]
})
export class ProcessQuotationPurchasesComponent implements OnInit, OnDestroy {
    id:number;
    form: FormGroup | any;
    deletedProducts = [];
    deletedServices = [];
    listUnitProducts: any[] = [];
    listUnitServices: any[] = [];
    listProviders: Provider[] = [];
    listProducts: any[] = [] ;
    listServices: any[] = [] ;
    listCurrencies: any[] = [];


    constructor(
        private formBuilder: FormBuilder,
        private quotationPurchaseProductService: QuotationPurchaseProductService,
        private quotationPurchaseServiceService: QuotationPurchaseServiceService,
        private quotationPurchaseService: QuotationPurchaseService ,       
        private providerService: ProviderService ,
        private productService: ProductService ,
        private serviceService: ServiceService ,
        private providerProductService: ProviderProductService ,
        private providerServiceService: ProviderServiceService ,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private miscService:MiscService,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private router: Router, ) 
    {
    }

    ngOnInit(): void 
	{

        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; 

        this.id = parseInt(this.route.snapshot.params['idx']);

		this.form = this.formBuilder.group
		({
            id:[this.id, [Validators.required]],
            quotationPurchaseProviderId: [{value:null,disabled:true},[Validators.required]], 
            quotationPurchaseTimeDelivery:[null,[Validators.required]] , //DATATIME
            quotationPurchaseGuaranty: false, //BOOLEAN [false,[Validators.required]]
            quotationPurchaseCurrency:[null,[Validators.required]],
            quotationPurchaseProducts: this.formBuilder.array([],[this.isProductDuplicated]), 
            quotationPurchaseServices: this.formBuilder.array([],[this.isServiceDuplicated]),
            
         }, formOptions);
        
         this.form.get("quotationPurchaseProviderId").valueChanges.subscribe(selectedValue => {
            this.getFilter(selectedValue);
            
         });

        this.listUnitProducts = [
            { label: 'Pieza', value:'pieza'},
            { label: 'Caja', value: 'caja'},
            { label: 'Paquete',value: 'paquete',type:'producto'}
            
        ]; 
        this.listUnitServices = [
            { label: 'Anual',value: 'anual'},
            { label: 'Mensual',value: 'mensual'},
            
        ]; 
        
        this.listCurrencies = [
            { label: 'Dólar estadounidense (USD)', value:"USD"},
            { label: 'Peso mexicano (MXN)', value:"MXN"},
           // { label: 'Dólar canadiense (CAD)', value:"CAD"},
          //  { label: 'Euro (EUR)', value:'EUR'}
        ];

        this.getInfo();
		
    }

    ngOnDestroy() {
       
    }
    onSubmit() 
	{

        if (this.form.invalid) {
            return;
        }

        this.save();
    }

    newProductsArray() {
        return this.formBuilder.group({
            id:null,
            quotationPurchaseProductProductId: [null,[Validators.required]],
            quotationPurchaseProductUnit:[null,[Validators.required]],
            quotationPurchaseProductQuantity:[null,[Validators.required ,Validators.min(1), Validators.max(99999999)]], 
            quotationPurchaseProductPrice:[null,[Validators.required ,Validators.min(1)]]
        });

    }
    newServicesArray() {
        return this.formBuilder.group({
            id:null,
            quotationPurchaseServiceServiceId:[null,[Validators.required]],
            quotationPurchaseServiceUnit: [null,[Validators.required]],
            quotationPurchaseServiceQuantity:[null,[Validators.required ,Validators.min(1), Validators.max(99999999)]],  //[min]="1" [max]="99999999"
            quotationPurchaseServicePrice:[null,[Validators.required ,Validators.min(1)]]
        });


    }
    
    infoProductsArray(): FormArray {
        return this.form.get('quotationPurchaseProducts') as FormArray;
    }
    infoServicesArray(): FormArray {
        return this.form.get('quotationPurchaseServices') as FormArray;
    }
    
    addRow(type:string){

        switch (type) {
            case 'product':
                this.infoProductsArray().push(this.newProductsArray()); 
                break;
            case 'service':
                this.infoServicesArray().push(this.newServicesArray()); 
                break;
        }
    }
    removeRow(type:string,object:any,index:number){
        switch (type) {
            case 'product':
                this.infoProductsArray().removeAt(index);
                if(object.value.id !== null)
                    this.deletedProducts.push(object.value.id);
                break;
            case 'service':
                this.infoServicesArray().removeAt(index);
                if(object.value.id !== null)
                    this.deletedServices.push(object.value.id);
                break;
        }

    }
    isProductDuplicated(control: FormArray ) 
	{
			
		const uniqueValues = new Set();

        for (const item of control.controls) 
		{

            const obj = item.value.quotationPurchaseProductProductId
            if (uniqueValues.has(obj)) 
			{
			  return { duplicated: true }; 
            }          
            
			uniqueValues.add(obj);
		}
        

		return null; //en este punto no hay error, se regresa null	
	}
    isServiceDuplicated(control: FormArray ) 
	{
			
		const uniqueValues = new Set();

        for (const item of control.controls) 
		{

            const obj = item.value. quotationPurchaseServiceServiceId
            if (uniqueValues.has(obj)) 
			{
			  return { duplicated: true }; 
            }          
            
			uniqueValues.add(obj);
		}

		return null; 
	}

    getFilter(value){
        if(value != null){
            this.miscService.startRequest(); 
          
            //1. Hacer una peticion para traer los productos/servicios de un proveedor
            const products = this.providerProductService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"providerProductProviderId"}]',0,1,'[{"id":"asc"}]')
            .pipe(
                catchError((error) => 
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                    return of(null); 
                })
            );
            
            const services =this.providerServiceService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"providerServiceProviderId"}]',0,1,'[{"id":"asc"}]')
            .pipe(
                catchError((error) => 
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar  servicios", detail:error.message });
                    return of(null); 
                })
            );  
            forkJoin([products,services]).subscribe(([dataProducts,dataServices] )=>
            {
                this.listProducts= [];
                this.listServices = [];
                if(dataProducts != null )
                {                    
                    dataProducts['object']['records'].forEach(element => {
                        this.listProducts.push({'label':element['providerProductProductId']['productBrand']+" "+ element['providerProductProductId']['productModel'],'value': element['providerProductProductId']['id']});
                    });
                }
                if(dataServices != null)
                {
                    dataServices['object']['records'].forEach(element => {
                        this.listServices.push({'label':element['providerServiceServiceId']['serviceDescription'],'value':+element['providerServiceServiceId']['id']});
                    });
                }
    
               this.miscService.endRquest(); 
            },
    
            (err:any)=>
            {
                this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los suministros del proveedor', life: 3000 });
                this.miscService.endRquest();
            });
        }
    }
    
    getInfo(){
       

        const providers =this.providerService.getAll(0,1,'[{"id":"asc"}]').pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al agregar servicio", detail:error.message });
                return of(null);
            })
        );	
        const quotation =this.quotationPurchaseService.getById(this.id).pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al agregar servicio", detail:error.message });
                return of(null);
            })
        );		
        

        forkJoin([providers,quotation]).subscribe(async ([dataProviders,dataQuotations] :any)=>
        {
            if(dataProviders != null)
                this.listProviders = dataProviders['object']['records']; 

            if(dataQuotations != null){

                
                //Traer servicios y productos del proveedor de la cotizacion
                this.getItems(dataQuotations);  
                
            }

            this.miscService.endRquest();  

        },
        (err : any)=>{
            this.miscService.endRquest(); //fin del proceso por error				
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error general al elementos múltiples ", detail:err.message });
			
        });
            
    }
    getItems(dataInfo : QuotationPurchase){
        //1. Hacer una peticion para traer los productos/servicios de un proveedor
        const products = this.providerProductService.getFilter('[{"value":"'+dataInfo['quotationPurchaseProviderId']+'","matchMode":"equals","field":"providerProductProviderId"}]',0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                return of(null); 
            })
        );
        
        const services =this.providerServiceService.getFilter('[{"value":"'+dataInfo['quotationPurchaseProviderId']+'","matchMode":"equals","field":"providerServiceProviderId"}]',0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) => 
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar  servicios", detail:error.message });
                return of(null); 
            })
        );  
        forkJoin([products,services]).subscribe(([dataProducts,dataServices] )=>
        {
            this.listProducts= [];
            this.listServices = [];
            if(dataProducts != null )
            {                    
                dataProducts['object']['records'].forEach(element => {
                    this.listProducts.push({'label':element['providerProductProductId']['productBrand']+" "+ element['providerProductProductId']['productModel'],'value':element['providerProductProductId']['id']});
                });
            }
            if(dataServices != null)
            {
                dataServices['object']['records'].forEach(element => {
                    this.listServices.push({'label': element['providerServiceServiceId']['serviceDescription'],'value': element['providerServiceServiceId']['id']});
                });
            }

            //Asigna valores
            for (let i=0; i < dataInfo['quotationPurchaseProducts'].length; i++){
                this.addRow('product');    
            }
            for (let i=0; i < dataInfo['quotationPurchaseServices'].length; i++){
                this.addRow('service');
                        
            } 
            dataInfo['quotationPurchaseGuaranty'] = (dataInfo['quotationPurchaseGuaranty'] == null ? false : dataInfo['quotationPurchaseGuaranty'] );
            this.form.patchValue(dataInfo);

        },

        (err:any)=>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los suministros del proveedor', life: 3000 });
            this.miscService.endRquest();
        });
    }
    private save(){
       //console.log(this.form);
        let order = {};   
        order['id']= this.form.value['id'];     
        //order['quotationPurchaseProviderId']= (this.form.value['quotationPurchaseProviderId']).toString();
        order['quotationPurchaseTimeDelivery'] = this.datePipe.transform(this.form.value['quotationPurchaseTimeDelivery'], 'yyyy-MM-dd HH:mm:ss');
        order['quotationPurchaseGuaranty']= (this.form.value['quotationPurchaseGuaranty']);
        order['quotationPurchaseCurrency']= (this.form.value['quotationPurchaseCurrency']);
        order['quotationPurchaseDateStatus'] =this.datePipe.transform(new Date(), 'yyyy-MM-dd  HH:mm:ss');
        order['quotationPurchaseStatus']= 'aceptada';
      
        this.quotationPurchaseService.update(order)
        .subscribe(data =>{

            const actions = [];
            // -------- Productos --------
            //-update/crate
            this.form.value['quotationPurchaseProducts'].forEach(element => {
                let obj = {};
                    obj['quotationPurchaseProductUnit'] = element['quotationPurchaseProductUnit'];
                    obj['quotationPurchaseProductPrice'] = element['quotationPurchaseProductPrice'];
                    obj['quotationPurchaseProductQuantity'] = element['quotationPurchaseProductQuantity'];                
                    obj['quotationPurchaseProductProductId'] =  (element['quotationPurchaseProductProductId']).toString();
                    obj['quotationPurchaseProductQuotationPurchaseId']  = (this.form.value['id']).toString();            
                if(element['id'] == null)
                {
                    // create                        
                    const create = this.quotationPurchaseProductService.create(obj)
                    .pipe(
                        catchError((error) => 
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al crear nuevo detalle", detail:error.message });
                            return of(null);
                        })
                    );		
    
                   actions.push(create);
                }else{
                    // update
                    obj['id'] = element['id'];                   
                    const update = this.quotationPurchaseProductService.update(obj)
                    .pipe(
                        catchError((error) => 
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al actualizar detalle existente", detail:error.message });
                            return of(null);
                        })
                    );		

                   actions.push(update);

                }
            });
            //-Disable ("delete")
            this.deletedProducts.forEach(id => {
                // update
                const disabled = this.quotationPurchaseProductService.disable(id).pipe(
                    catchError((error) => 
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar detalle existente", detail:error.message });
                        return of(null);
                    })
                );	
                actions.push(disabled);	
                
            });

             // -------- Servicios --------
             //-update/create
            this.form.value['quotationPurchaseServices'].forEach(element => {
                let obj = {};
                    obj['quotationPurchaseServiceUnit'] = element['quotationPurchaseServiceUnit'];
                    obj['quotationPurchaseServicePrice'] = element['quotationPurchaseServicePrice'];
                    obj['quotationPurchaseServiceQuantity'] = element['quotationPurchaseServiceQuantity'];                
                    obj['quotationPurchaseServiceServiceId'] =  (element['quotationPurchaseServiceServiceId']).toString();
                    obj['quotationPurchaseServiceQuotationPurchaseId']  = (this.form.value['id']).toString();            
                if(element['id'] == null)
                {
                    // create                        
                    const create = this.quotationPurchaseServiceService.create(obj)
                    .pipe(
                        catchError((error) => 
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al crear nuevo detalle", detail:error.message });
                            return of(null);
                        })
                    );		
    
                   actions.push(create);
                }else{
                    // update
                    obj['id'] = element['id'];                   

                    const update = this.quotationPurchaseServiceService.update(obj)
                    .pipe(
                        catchError((error) => 
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al actualizar detalle existente", detail:error.message });
                            return of(null);
                        })
                    );		

                   actions.push(update);

                }
            });
            //-Disable ("delete")
            this.deletedServices.forEach(id => {
                // update
                const disabled = this.quotationPurchaseServiceService.disable(id).pipe(
                    catchError((error) => 
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar detalle existente", detail:error.message });
                        return of(null);
                    })
                );	
                actions.push(disabled);	
            });


            forkJoin(actions).subscribe(([] :any)=>
            {
                this.router.navigate(['/quotationPurchases']);
                this.miscService.endRquest();  

            },
            (err : any)=>{
                this.miscService.endRquest(); //fin del proceso por error
				this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error general al elementos múltiples ", detail:err.message });
            });
            
        },  (err : any) => {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error  al guardar', detail: err.message, life: 3000 });  
        
        });   
        
    }
    getLabel(id:number,type:string){
        let text = '';

        if(id != null ){

            switch (type) {
                case 'product':
                    text = (this.listProducts.find((obj) => obj.value ==  id)).label;
                    break;
                case 'service':
                    text = (this.listServices.find((obj) => obj.value ==  id)).label;
                    break;
            }
        }
        return text;
    }   
   
    

}

