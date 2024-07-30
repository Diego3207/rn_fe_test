import { Component, ViewChild } from '@angular/core';
import { Costumer } from 'src/app/api/costumer';
import { Product } from 'src/app/api/product';
import { User } from 'src/app/api/user';
import { Package } from 'src/app/api/package';
import { Service} from 'src/app/api/service';
import { PackageService } from 'src/app/service/package.service';
import { ProductService } from 'src/app/service/product.service';
import { ServiceService } from 'src/app/service/service.service';
import { UserService } from 'src/app/service/user.service';
import { QuotationSaleService } from 'src/app/service/quotationSale.service';
import { QuotationSaleProductService } from 'src/app/service/quotationSaleProduct.service';
import { QuotationSalePackageService } from 'src/app/service/quotationSalePackage.service';
import { QuotationSaleServiceService } from 'src/app/service/quotationSaleService.service';
import { QuotationSaleTemplateService } from 'src/app/service/quotationSaleTemplate.service';
import { QuotationSaleCommercialTermService } from 'src/app/service/quotationSaleCommercialTerm.service';

import { FileUpload } from 'primeng/fileupload';
import { FileService } from 'src/app/service/file.service';
import { CostumerService } from 'src/app/service/costumer.service';
import { MiscService } from 'src/app/service/misc.service';
import { Router,ActivatedRoute, } from '@angular/router';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { AbstractControlOptions, FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { catchError  } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ProviderProductService } from 'src/app/service/providerProduct.service';
import { ProviderServiceService } from 'src/app/service/providerService.service';
import { SessionService } from 'src/app/service/session.service';
import { CurrencyConverterService } from 'src/app/service/currencyConverter.service';
import { ChangeDetectorRef } from '@angular/core';





@Component({
  templateUrl: './edit.quotationSales.component.html',

})
export class EditQuotationSalesComponent  {
    @ViewChild('fileUpload') fileUpload: FileUpload;
    files : any[] = [];
    uploadedFiles: any[] = []; //lista de archivos por cargar
    templatesFile: any [] = [];
    templatesFileDelete: any [] = [];
    form: FormGroup | any;
    listCustomers: Costumer[] = [];
    listUsers: User[] = [];
    listProducts: any[] = [] ;
    listServices: any[] = [] ;
    listPackages: Package[] = [] ;
    //terms: string = '';
    listTerms: any[] = [];
    id:number;
    deletedProducts = [];
    deletedServices = [];
    deletedPackages = [];
    valueVAT : number = 0;
    subTotal : number = 0;
    total : number = 0;
    totalVAT: number = 0;
    discountGlobal :number = 0;
    listCurrency :any[]=[];
    cont : number = 0;
    listCurrencies:any[]=[];
    listValueCurrencies : any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private quotationSaleProductService: QuotationSaleProductService,
        private quotationSaleServiceService: QuotationSaleServiceService,
        private quotationSalePackageService: QuotationSalePackageService,
        private quotationSaleTemplateService: QuotationSaleTemplateService,
        private quotationSaleService: QuotationSaleService ,
        private customerService: CostumerService ,
        private packageService: PackageService ,
        private userService: UserService ,
        private productService: ProductService ,
        private serviceService: ServiceService ,
        private fileService:FileService,
        private providerProductService: ProviderProductService ,
        private providerServiceService: ProviderServiceService ,
        private quotationSaleCommercialTermService: QuotationSaleCommercialTermService ,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private currencyConverterService: CurrencyConverterService,
        private miscService:MiscService,
        private sessionService:SessionService,
        private cdRef:ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute )
    {

    }
    ngAfterViewChecked()
    {
      this.cdRef.detectChanges();
    }
    ngOnInit(): void
	{
        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; //MustMatch('password', 'confirmPassword') };
        this.id = parseInt(this.route.snapshot.params['idx']);
        this.valueVAT = .16; //PENDIENTE: mandar traer este dato con un servicio
       
		this.form = this.formBuilder.group
		({
            id:[this.id, [Validators.required]],
            quotationSaleDescription:[null, [Validators.required,Validators.maxLength(255)]],
            quotationSaleCustomerId: [null,[Validators.required]],
            quotationSaleSalesmanId:[this.sessionService.getUserId(),[Validators.required]],
            quotationSaleCurrency:['MXN',[Validators.required]],
            quotationSaleGuaranty:false,
            quotationSaleCommercialTerms:[null,[Validators.required]],
            quotationSaleVAT:[this.valueVAT,[Validators.required]],
            quotationSaleDiscount:[null,[Validators.min(1)]],
            quotationSaleIsPercentageDiscount :false,
            quotationSaleProducts: this.formBuilder.array([]),
            quotationSaleServices: this.formBuilder.array([],[this.isServiceDuplicated]),
            quotationSalePackages: this.formBuilder.array([],[this.isPackageDuplicated]),

         }, formOptions);

         this.listCurrencies = [
            { label: 'Dólar estadounidense (USD)', value:"USD"},
            { label: 'Peso mexicano (MXN)', value:"MXN"},
           // { label: 'Dólar canadiense (CAD)', value:"CAD"},
          //  { label: 'Euro (EUR)', value:'EUR'}
        ];

        this.form.get("quotationSaleDiscount").valueChanges.subscribe(selectedValue => {

           // this.discountGlobal = selectedValue;

            if( this.cont > 0 && selectedValue != null) {



                this.form.controls['quotationSaleProducts'].controls.forEach(obj => {

                    obj.controls.quotationSaleProductDiscount.setValue(null);
                    obj.controls.quotationSaleProductIsPercentageDiscount.setValue(false);
                });

                this.form.controls['quotationSaleServices'].controls.forEach(obj => {
                    obj.controls.quotationSaleServiceDiscount.setValue(null);
                    obj.controls.quotationSaleServiceIsPercentageDiscount.setValue(false);
                });


                this.form.controls['quotationSalePackages'].controls.forEach(obj => {
                    obj.controls.quotationSalePackageDiscount.setValue(null);
                    obj.controls.quotationSalePackageIsPercentageDiscount.setValue(false);
                });


            }

            if (selectedValue == null)
                this.form.controls.quotationSaleIsPercentageDiscount.setValue(false);

            this.calculateSubTotal();
            this.cont++;

        });

        this.form.get("quotationSaleCurrency").valueChanges.subscribe(selectedValue => {

            this.form.controls.quotationSaleProducts.controls.forEach( ( row,index) => {
                this.getPriceProduct(row.value.quotationSaleProductProductId,index);
            });

            this.form.controls.quotationSaleServices.controls.forEach( ( row,index) => {
                this.getPriceService(row.value.quotationSaleServiceServiceId,index);
            });


            this.form.controls.quotationSalePackages.controls.forEach( (row,index) => {
                this.getPricePackage(row.value.quotationSalePackagePackageId,index);
            });
        

            
        });

        this.form.get("quotationSaleIsPercentageDiscount").valueChanges.subscribe(selectedValue => {

            this.calculateSubTotal();

        });

        this.getInfo();

    }

    calculateDiscountGlobal(){
        if(this.form.value.quotationSaleIsPercentageDiscount)
            {
                //true = descuento en %
                this.discountGlobal = (this.subTotal * (this.form.value.quotationSaleDiscount / 100));
            }
            else if(!this.form.value.quotationSaleIsPercentageDiscount){
                //false = descuento en $
                this.discountGlobal = this.form.value.quotationSaleDiscount;
            }
            this.calculateTotal();

    }
    calculateTotal(){
        this.totalVAT = (this.subTotal - this.discountGlobal) * this.form.value['quotationSaleVAT'];
        this.total =  (this.subTotal - this.discountGlobal  ) + this.totalVAT ;
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
        this.router.navigate(['/quotationSales']);
    }

    newProductsArray() {


        return this.formBuilder.group({
            id:null,
            quotationSaleProductProductId: [null,[Validators.required]], //este se debe tomar de lo disponible en inventario
            quotationSaleProductPrice : [null,[Validators.min(1)]], //si pongo aqui disabled no lo manda en el form
            quotationSaleProductQuantity:[null,[Validators.required ,Validators.min(1), Validators.max(99999999)]],
            quotationSaleProductDiscount:[null,[Validators.min(1)]],
            quotationSaleProductIsPercentageDiscount :false,
            priceTotal :null,
        });

    }
    newServicesArray() {
        return this.formBuilder.group({
            id:null,
            quotationSaleServiceServiceId:[null,[Validators.required]],
            quotationSaleServicePrice:[null,[Validators.required ,Validators.min(1)]],//este se debe tomar del catalogo de precios
            quotationSaleServiceQuantity:[null,[Validators.required ,Validators.min(1), Validators.max(99999999)]],  //[min]="1" [max]="99999999"
            quotationSaleServiceDiscount:[null,[Validators.min(1)]],
            quotationSaleServiceIsPercentageDiscount: false,
            priceTotal :null,

        });
    }
    newPackagesArray() {
        return this.formBuilder.group({
            id:null,
            quotationSalePackagePackageId:[null,[Validators.required]],
            quotationSalePackagePrice:[null,[Validators.required ,Validators.min(1),Validators.max(999999999999)]],
            quotationSalePackageQuantity:[null,[Validators.required ,Validators.min(1), Validators.max(99999999)]],  //[min]="1" [max]="99999999"
            quotationSalePackageDiscount:[null,[Validators.min(1)]],
            quotationSalePackageIsPercentageDiscount:false,
            priceTotal :null,

        });
    }

    infoProductsArray(): FormArray {
        return this.form.get('quotationSaleProducts') as FormArray;
    }
    infoServicesArray(): FormArray {
        return this.form.get('quotationSaleServices') as FormArray;
    }
    infoPackagesArray(): FormArray {
        return this.form.get('quotationSalePackages') as FormArray;
    }

    addRow(type:string){
        switch (type) {
            case 'product':
                this.infoProductsArray().push(this.newProductsArray());
                break;
            case 'service':
                this.infoServicesArray().push(this.newServicesArray());
                break;
            case 'package':
                this.infoPackagesArray().push(this.newPackagesArray());
                break;
        }
       // this.calculateTotals();
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
            case 'package':
                this.infoPackagesArray().removeAt(index);
                if(object.value.id !== null)
                    this.deletedPackages.push(object.value.id);
            break;
        }
        this.calculateSubTotal();
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
                 case 'package':
                     text = (this.listPackages.find((obj) => obj.id ==  id)).packageName;
                 break;
             }
        }



        return  text;

     }
    /*isProductDuplicated(control: FormArray )
	{

		const uniqueValues = new Set();

        for (const item of control.controls)
		{

            const obj = item.value.quotationSaleProductProductId
            if (uniqueValues.has(obj))
			{
			  return { duplicated: true };
            }

			uniqueValues.add(obj);
		}


		return null; //en este punto no hay error, se regresa null
	}*/
    isServiceDuplicated(control: FormArray )
	{

		const uniqueValues = new Set();

        for (const item of control.controls)
		{

            const obj = item.value. quotationSaleServiceServiceId
            if (uniqueValues.has(obj))
			{
			  return { duplicated: true };
            }

			uniqueValues.add(obj);
		}

		return null;
	}
    isPackageDuplicated(control: FormArray )
	{

		const uniqueValues = new Set();

        for (const item of control.controls)
		{

            const obj = item.value.quotationSalePackagePackageId
            if (uniqueValues.has(obj))
			{
			  return { duplicated: true };
            }

			uniqueValues.add(obj);
		}


		return null;
	}

    getInfo(){

        const customers = this.customerService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) =>
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                return of(null);
            })
        );
        const packages = this.packageService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) =>
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                return of(null);
            })
        );
        const users = this.userService.getAll(500,1,'[{"id":"asc"}]') // debe ser cero
        .pipe(
            catchError((error) =>
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                return of(null);
            })
        );
        const products = this.productService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) =>
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                return of(null);
            })
        );
        const services =this.serviceService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) =>
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar  servicios", detail:error.message });
                return of(null);
            })
        );

        const quotation =this.quotationSaleService.getById(this.id)
        .pipe(
            catchError((error) =>
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar  informacion de cotizacion", detail:error.message });
                return of(null);
            })
        );
        const terms = this.quotationSaleCommercialTermService.getAll(0,1,'[{"id":"asc"}]')
        .pipe(
            catchError((error) =>
            {
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar terminos comerciales", detail:error.message });
                return of(null);
            })
        );
        forkJoin([customers,products,services,users,packages,quotation,terms]).subscribe(async ([dataCuscomers,dataProducts,dataServices,dataUsers,dataPackages,dataQuotation,dataTerms] )=>
        {
            if(dataTerms != null)
                this.listTerms = dataTerms['object']['records'];

            if(dataProducts != null )
            {
                dataProducts['object']['records'].forEach(element => {
                    this.listProducts.push({'label':element['productBrand']+" "+ element['productModel'],'value':element['id'],'price':element['productPrice'],description:element['productDescription'],labelFilter:element['productBrand']+" "+ element['productModel']+" "+element['productDescription'],currency:element['productCurrency']});
                });
                //console.log(this.listProducts);
            }
            if(dataServices != null)
            {
                dataServices['object']['records'].forEach(element => {
                    let temporality = (element['serviceTemporality'] != '' ? " / Temporalidad: "+element['serviceTemporality'] :'');
                    this.listServices.push({'label': element['serviceDescription'] +temporality,'value': element['id'],'price':element['servicePrice'],currency:element['serviceCurrency']});   
                });
            }
            if(dataCuscomers != null)
                this.listCustomers = dataCuscomers['object']['records'];

            if(dataUsers != null)
                this.listUsers = dataUsers['object']['records'];

            if(dataPackages != null)
                this.listPackages = dataPackages['object']['records'];

            if(dataQuotation != null){

                for (let i=0; i < dataQuotation['quotationSaleProducts'].length; i++){
                    this.addRow('product');
                }
                for (let i=0; i < dataQuotation['quotationSaleServices'].length; i++){
                    this.addRow('service');

                }
                for (let i=0; i < dataQuotation['quotationSalePackages'].length; i++){
                    this.addRow('package');

                }
                //this.cont++;
                await this.form.patchValue(dataQuotation);
                this.templatesFile = dataQuotation['quotationSaleTemplates']; //Agrega los archivos a un array para mostrar

            }

            this.miscService.endRquest();
        },

        (err:any)=>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los suministros del proveedor', life: 3000 });
            this.miscService.endRquest();
        });

    }

/*    getPriceProduct(id:number,index:number){
        if(id != null)
        {
            let product = this.listProducts.find((obj) => obj.value ==  id);

            this.form.controls.quotationSaleProducts.controls[index].controls.quotationSaleProductPrice.setValue(product['price']);
        }
        else
        {
            this.form.controls.quotationSaleProducts.controls[index].controls.quotationSaleProductPrice.setValue(null);
        }

    }
    getPriceService(id:number,index:number){
        if(id != null)
        {
            let service = this.listServices.find((obj) => obj.value ==  id);

            this.form.controls.quotationSaleServices.controls[index].controls.quotationSaleServicePrice.setValue(service['price']);

        }
        else
        {
            this.form.controls.quotationSaleServices.controls[index].controls.quotationSaleServicePrice.setValue(null);

        }

    }
    getPricePackage(id:number,index:number){
        if(id != null)
        {
            //1. comprobar que detalle tiene el paquete
            let price:number = 0;
            this.packageService.getById(id)
            .subscribe(data => {

                data['packageProducts'].forEach(obj => {
                    //console.log(obj);
                    let search = this.listProducts.find((prod) => prod.value ==  obj.packageProductProductId);
                    price = (search['price'] * obj.packageProductQuantity) + price;
                });

                data['packageServices'].forEach(obj => {
                    let search = this.listServices.find((prod) => prod.value ==  obj.packageServiceServiceId);
                    price = (search['price'] * obj.packageServiceQuantity)  + price;
                });

               // console.log(price);
               this.form.controls.quotationSalePackages.controls[index].controls.quotationSalePackagePrice.setValue(price);
            },
            (err:any)=>
            {
                this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los catalogos', life: 3000 });

            });
        }
        else
        {
            this.form.controls.quotationSalePackages.controls[index].controls.quotationSalePackagePrice.setValue(null);

        }

    }*/
        async getPriceProduct(id:number,index:number){
            if(id != null)
            {
                let product = this.listProducts.find((obj) => obj.value ==  id);
                let currencyDest = this.form.controls.quotationSaleCurrency.value;
                let currencyOrigin = product['currency'];
                
                
    
                if(currencyOrigin != currencyDest ){
                    
                    let result = this.listValueCurrencies.find(element => element.origin == currencyOrigin && element.dest == currencyDest );
                    
                    if(result){
                        let price = result.value *  product['price'];
                        
                        this.form.controls.quotationSaleProducts.controls[index].controls.quotationSaleProductPrice.setValue(price);
                    }else{
                        
                        const valueCurrency: any = await this.getValueCurrency(currencyOrigin ,currencyDest);
    
                        this.form.controls.quotationSaleProducts.controls[index].controls.quotationSaleProductPrice.setValue((valueCurrency *  product['price']));
                    }
                   
                }else{
                    this.form.controls.quotationSaleProducts.controls[index].controls.quotationSaleProductPrice.setValue(product['price']);
                }
                
    
            }
            else
            {
                this.form.controls.quotationSaleProducts.controls[index].controls.quotationSaleProductPrice.setValue(null);
    
            }
    
        }
        
        async getPriceService(id:number,index:number){
    
            if(id != null)
            {
                let service = this.listServices.find((obj) => obj.value ==  id);
                let currencyDest = this.form.controls.quotationSaleCurrency.value;
                let currencyOrigin = service['currency'];
    
    
                if(currencyOrigin != currencyDest ){
    
                    let result = this.listValueCurrencies.find(element => element.origin == currencyOrigin && element.dest == currencyDest );
    
                    if(result){
                        let price = result.value *  service['price'];
                        
                        this.form.controls.quotationSaleServices.controls[index].controls.quotationSaleServicePrice.setValue(price);
                    }else{
                        const valueCurrency: any = await this.getValueCurrency(currencyOrigin ,currencyDest);
    
                        this.form.controls.quotationSaleServices.controls[index].controls.quotationSaleServicePrice.setValue((valueCurrency *  service['price']));
    
                        
                    }
                   
                }else{
                    this.form.controls.quotationSaleServices.controls[index].controls.quotationSaleServicePrice.setValue(service['price']);
                }
    
            }
            else
            {
                this.form.controls.quotationSaleServices.controls[index].controls.quotationSaleServicePrice.setValue(null);
    
            }
    
        }
        async getPricePackage(id:number,index:number){
            if(id != null)
            {
                //1. comprobar que detalle tiene el paquete
                let price:number = 0;
                this.packageService.getById(id)
                .subscribe( async data => {
    
                    for (let i = 0; i < data['packageProducts'].length; i++) {
                        let search = this.listProducts.find((prod) => prod.value ==  data['packageProducts'][i].packageProductProductId);
    
                        ///************************/
                        let currencyDest = this.form.controls.quotationSaleCurrency.value;
                        let currencyOrigin =search['currency'];
                        
                        if(currencyOrigin != currencyDest ){
    
                            let result = this.listValueCurrencies.find(element => element.origin == currencyOrigin && element.dest == currencyDest );
    
                            if(result){
                                price = (result.value *  search['price']) + price;
                                
                            }else{
                                const valueCurrency: any = await this.getValueCurrency(currencyOrigin ,currencyDest);
                                price = ((search['price'] * data['packageProducts'][i].packageProductQuantity) *  valueCurrency ) + price;
                                    
                               
                            }
                        
                        }else{
                            price = (search['price'] * data['packageProducts'][i].packageProductQuantity) + price;
                        }
                        ///************************/
    
    
    
                    }
    
                    for (let i = 0; i < data['packageServices'].length; i++) {
                        let search = this.listServices.find((prod) => prod.value ==  data['packageServices'][i].packageServiceServiceId);
                       // price = (search['price'] * obj.packageServiceQuantity)  + price;
                        ///************************/
                        let currencyDest = this.form.controls.quotationSaleCurrency.value;
                        let currencyOrigin =search['currency'];
                        
                        if(currencyOrigin != currencyDest ){
                            let result = this.listValueCurrencies.find(element => element.origin == currencyOrigin && element.dest == currencyDest );
    
                            if(result){
                                price = result.value *  search['price'] + price;
                                
                                //this.form.controls.quotationSaleServices.controls[index].controls.quotationSaleServicePrice.setValue(price);
                            }else{
                                const valueCurrency: any = await this.getValueCurrency(currencyOrigin ,currencyDest);
                                price = ((search['price'] * data['packageProducts'][i].packageProductQuantity) *  valueCurrency ) + price;
                            }
                        
                        }else{
                            price = (search['price'] * data['packageServices'][i].packageServiceQuantity) + price;
                        }
                        ///************************/
                    }
    
                   //alert(price);
                   this.form.controls.quotationSalePackages.controls[index].controls.quotationSalePackagePrice.setValue(price);
                },
                (err:any)=>
                {
                    this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los catalogos', life: 3000 });
    
                });
            }
            else
            {
                this.form.controls.quotationSalePackages.controls[index].controls.quotationSalePackagePrice.setValue(null);
    
            }
    
        }
    
    
        async getValueCurrency(currencyOrigin:string,currencyDest:string): Promise<any> {
           
               const response = await  this.currencyConverterService.getCurrencyConversion(currencyOrigin,currencyDest).toPromise();
             
                this.listValueCurrencies.push({'origin': currencyOrigin,'dest': currencyDest,'value':parseFloat(response['data'][currencyDest].value.toFixed(2))});
            return (response ? parseFloat(response['data'][currencyDest].value.toFixed(2)): null);
            
         };
    
    getSubTotalDetail(type,obj){

        let total = 0, quantiy=0, price=0, discount=0, isPercentageDiscount = false ;

        switch (type) {
            case 'product':
                quantiy = obj.controls.quotationSaleProductQuantity.value;
                price = obj.controls.quotationSaleProductPrice.value;
                discount = obj.controls.quotationSaleProductDiscount.value;
                isPercentageDiscount = obj.controls.quotationSaleProductIsPercentageDiscount.value;

                break;
            case 'service':
                quantiy = obj.controls.quotationSaleServiceQuantity.value;
                price = obj.controls.quotationSaleServicePrice.value;
                discount =obj.controls.quotationSaleServiceDiscount.value;
                isPercentageDiscount = obj.controls.quotationSaleServiceIsPercentageDiscount.value;
                break;
            case 'package':
                quantiy = obj.controls.quotationSalePackageQuantity.value;
                price = obj.controls.quotationSalePackagePrice.value;
                discount = obj.controls.quotationSalePackageDiscount.value;
                isPercentageDiscount = obj.controls.quotationSalePackageIsPercentageDiscount.value;
            break;
        }

        total =  quantiy * price;

        if(isPercentageDiscount && discount != null)
        {
            //true = descuento en %
            discount =(total * (discount / 100));
        }
        else if(!isPercentageDiscount && discount != null){
            discount = discount;
            //false = descuento en $
        }
        total =  total-discount;
        obj.controls.priceTotal.setValue(total);

       this.calculateSubTotal();
        return  total;


    }

    calculateSubTotal(){

        this.subTotal = 0;

        this.form.value['quotationSaleProducts'].forEach(obj => {
            this.subTotal += obj['priceTotal'];
        });

        this.form.value['quotationSaleServices'].forEach(obj => {
            this.subTotal += obj['priceTotal'];
        });

        this.form.value['quotationSalePackages'].forEach(obj => {
            this.subTotal += obj['priceTotal'];
        });

        this.calculateDiscountGlobal();

    }

    onUpload(event: any)
	{
        this.files = event.currentFiles;
        for(let i = 0 ; i < this.files.length; i++)
        {
            this.uploadedFiles.indexOf(this.files[i]) === -1 ? this.uploadedFiles.push(this.files[i]) : console.log("Este archivo ya existe");
        }
    }

    //guarda el archivo al servidor
	saveFile()
	{
		if(this.uploadedFiles.length > 0)
		{
            var peticiones: any[] = [];
            for(let i = 0 ; i < this.uploadedFiles.length; i++)
            {
                const ptt = this.fileService.upload(this.uploadedFiles[i], 'quotation_sale_file').pipe
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
                var idFiles: any[] = [];
                var nameFiles: any[] = [];
                var sizeFiles: any[] = [];
                for(let i = 0 ; i < data.length; i++)
                {
                    if(data[i] != null){
                        idFiles.push( data[i].files[0].fd );
                        nameFiles.push( data[i].files[0].filename );
                        sizeFiles.push( (data[i].files[0].size / 1024).toFixed(2) );
                    }
                }
                this.saveQuotationSaleTemplates(this.id.toString(),idFiles,nameFiles,sizeFiles);
            },
            err =>
            {
                this.miscService.endRquest(); //fin del proceso error de imagen
                this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar archivo", detail:err.message });
            });
		}
		else
		{
			this.messageService.add({ severity: 'success', key: 'msg',summary: 'Operación exitosa', detail: 'Elemento guardado exitosamente', life: 3000 });
            this.miscService.endRquest(); //fin del proceso por guardado
            //this.router.navigate(['/quotationSales']);
        }

    }

    private saveQuotationSaleTemplates(idQ,idF,nameF,sizeF)
    {

        var peticiones: any[] = [];

        for(let i = 0 ; i < idF.length; i++)
        {
            let quotatioSaleTemplateProperties = {
                quotationSaleTemplateQuotationSaleId: idQ.toString(),
                quotationSaleTemplatePath: idF[i].toString(),
                quotationSaleTemplateName: nameF[i].toString(),
                quotationSaleTemplateSize: sizeF[i].toString()
            };
            peticiones.push(this.quotationSaleTemplateService.create(quotatioSaleTemplateProperties)
            .pipe(
                catchError((error) =>
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar datos del archivos en la Base de datos", detail:error.message });
                    return of(null);
                })
            ));
        }

        forkJoin(peticiones).subscribe((data: any[]) =>
        {
            this.messageService.add({ severity: 'success', key: 'msg',summary: 'Operación exitosa', detail: 'Elemento guardado exitosamente', life: 3000 });
            this.miscService.endRquest(); //fin del proceso por guardado
            //this.router.navigate(['/quotationSales']);
        },
        err =>
        {
            this.miscService.endRquest(); //fin del proceso error de imagen
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al guardar archivo", detail:err.message });
        });
    }

    pushFile(fileName,fileId){
        this.templatesFileDelete.push({"id": fileId , "name": fileName});
        this.templatesFile = this.templatesFile.filter(e => e['quotationSaleTemplatePath'] != fileName);
    }
    getCommercialTerms(value : string){
        if(value != null)
            this.form.controls.quotationSaleCommercialTerms.setValue(value);

    }
    deleteFile()
    {
        var peticiones: any[] = [];
        for(let i = 0 ; i < this.templatesFileDelete.length; i++)
        {


            //delete file from database
            const pfdb = this.quotationSaleTemplateService.delete(this.templatesFileDelete[i].id).pipe
            (
                catchError((error) =>
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar archivos de la base se datos", detail:error.message });
                    return of(null);
                })
            );
            peticiones.push(pfdb);
        }

        forkJoin(peticiones).subscribe((respuestas: any[]) =>
        {
            this.miscService.endRquest(); //fin del proceso por guardado
           // this.router.navigate(['/product']);
        },
        err =>
        {
            this.miscService.endRquest(); //fin del proceso por error
            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error general al eliminar archivos de producto", detail:err.message });
        });
    }

    private save(){
        //camibar this.form.value ya que si accedo directo a los values no toma los que estan en disabled desde el la delcaracion del groupForm
        //debo acceder desde this.form.controls.....


        let quotation = {};
        Object.keys(this.form.controls).forEach(element => {

            if(element != "quotationSaleProducts" && element != "quotationSaleServices" && element != "quotationSalePackages" )
                quotation[element] = this.form.value[element];

        });

        quotation['quotationSaleSalesmanId'] = (quotation['quotationSaleSalesmanId']).toString();
        quotation['quotationSaleCustomerId'] = (quotation['quotationSaleCustomerId']).toString();

        this.quotationSaleService.update(quotation)
        .subscribe(data =>{

            const actions = [];
            // -------- Productos --------
            //-update/crate
            this.form.controls['quotationSaleProducts'].controls.forEach(row => {
                let rowData = row.controls;
                let obj ={};
                Object.keys(rowData).forEach(element => {
                    if(element != 'priceTotal' && element != 'id')
                        obj[element] = rowData[element].value;
                });

                obj['quotationSaleProductProductId'] =  (obj['quotationSaleProductProductId']).toString();
                obj['quotationSaleProductQuotationSaleId']  = (this.form.value['id']).toString();
                if(rowData['id'].value == null)
                {

                    // create
                    const create = this.quotationSaleProductService.create(obj)
                    .pipe(
                        catchError((error) =>
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al crear nuevo product", detail:error.message });
                            return of(null);
                        })
                    );

                   actions.push(create);

                }
                else{
                    // update
                    obj['id'] = rowData['id'].value;
                    const update = this.quotationSaleProductService.update(obj)
                    .pipe(
                        catchError((error) =>
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al actualizar producto existente", detail:error.message });
                            return of(null);
                        })
                    );

                   actions.push(update);
                }

            });

            //-Disable ("delete")
            this.deletedProducts.forEach(id => {
                // update
                const disabled = this.quotationSaleProductService.disable(id).pipe(
                    catchError((error) =>
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar producto existente", detail:error.message });
                        return of(null);
                    })
                );
                actions.push(disabled);

            });

            // -------- Servicios --------
            this.form.controls['quotationSaleServices'].controls.forEach(row => {
                let rowData = row.controls;
                let obj ={};
                Object.keys(rowData).forEach(element => {
                    if(element != 'priceTotal' && element != 'id')
                        obj[element] = rowData[element].value;
                });

                obj['quotationSaleServiceServiceId'] =  (obj['quotationSaleServiceServiceId']).toString();
                obj['quotationSaleServiceQuotationSaleId']  = (this.form.value['id']).toString();

                if(rowData['id'].value == null)
                {

                    // create
                    const create = this.quotationSaleServiceService.create(obj)
                    .pipe(
                        catchError((error) =>
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al crear nuevo servicio", detail:error.message });
                            return of(null);
                        })
                    );

                   actions.push(create);

                }
                else{
                    // update
                    obj['id'] = rowData['id'].value;

                    const update = this.quotationSaleServiceService.update(obj)
                    .pipe(
                        catchError((error) =>
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al actualizar servicio existente", detail:error.message });
                            return of(null);
                        })
                    );

                   actions.push(update);
                }

            });

            //-update/create

            //-Disable ("delete")
            this.deletedServices.forEach(id => {
                // update
                const disabled = this.quotationSaleServiceService.disable(id).pipe(
                    catchError((error) =>
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar servicio existente", detail:error.message });
                        return of(null);
                    })
                );
                actions.push(disabled);

            });


            // -------- Paquetes  --------
             //-update/create

             this.form.controls['quotationSalePackages'].controls.forEach(row => {
                let rowData = row.controls;
                let obj ={};
                Object.keys(rowData).forEach(element => {
                    if(element != 'priceTotal' && element != 'id')
                        obj[element] = rowData[element].value;
                });

                obj['quotationSalePackagePackageId'] =  (obj['quotationSalePackagePackageId']).toString();
                obj['quotationSalePackageQuotationSaleId']  = (this.form.value['id']).toString();
                if(rowData['id'].value == null)
                {
                    // create
                    const create = this.quotationSalePackageService.create(obj)
                    .pipe(
                        catchError((error) =>
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al crear nuevo paquete ", detail:error.message });
                            return of(null);
                        })
                    );

                   actions.push(create);

                }
                else{
                    // update
                    obj['id'] = rowData['id'].value;

                    const update = this.quotationSalePackageService.update(obj)
                    .pipe(
                        catchError((error) =>
                        {
                            this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al actualizar paquete existente", detail:error.message });
                            return of(null);
                        })
                    );

                   actions.push(update);
                }

            });

            //-Disable ("delete")
            this.deletedPackages.forEach(id => {
                // update
                const disabled = this.quotationSalePackageService.disable(id).pipe(
                    catchError((error) =>
                    {
                        this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al eliminar paquete existente", detail:error.message });
                        return of(null);
                    })
                );
                actions.push(disabled);

            });

            // Delete  templete
            this.deleteFile();
            // Guardar template
            this.saveFile();

            forkJoin(actions).subscribe(([] :any)=>
            {

                this.miscService.endRquest();


                 this.router.navigate(['/quotationSales']);

            },
            (err : any)=>{
                this.miscService.endRquest(); //fin del proceso por error
				this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error general al elementos múltiples ", detail:err.message });


            });


        },  (err : any) => {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error  al guardar', detail: err.message, life: 3000 });
            this.miscService.endRquest();
        });
    }

}
