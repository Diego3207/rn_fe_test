import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { SaleOrderService } from 'src/app/service/saleOrder.service';
import { CfdiService } from 'src/app/service/cfdi';
import { Supply } from 'src/app/api/supply';
import { PayWayService } from 'src/app/service/payway';
import { PayMethodService } from 'src/app/service/paymethod';
import { QuotationSaleService } from 'src/app/service/quotationSale.service';
import { QuotationSaleProductService } from 'src/app/service/quotationSaleProduct.service';
import { QuotationSalePackageService } from 'src/app/service/quotationSalePackage.service';
import { QuotationSaleServiceService } from 'src/app/service/quotationSaleService.service';
import { QuotationSaleRecordService } from 'src/app/service/quotationSaleRecord.service';
import { SupplyService } from 'src/app/service/supply.service';
import { Router } from '@angular/router';
import { MiscService } from 'src/app/service/misc.service';
import { MessageService  } from 'primeng/api';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { DatePipe, CurrencyPipe, formatDate  } from '@angular/common'; 
import { SessionService } from 'src/app/service/session.service'

@Component({
    templateUrl: './add.saleOrder.component.html',
    providers: [DatePipe, CurrencyPipe]
})
export class AddSaleOrderComponent  
{
    @ViewChild('search') searchElementRef!: ElementRef;
    submitted: boolean = false;
    listCfdi: any[] = [];
    listPayWay: any[] = [];
    listPayMethod: any[] = [];
    listQuotationSale: any[] = [];
    listProducts: any[] = [] ;
    listPackages: any[] = [] ;
    listServices: any[] = [] ;
    listQuantities: any[] = [] ;
    quantities: any [] = [];
    listAllRegisters: Supply[] = [] ;
    arrayIdProducts: any[] = [];
    selectedRegister: Supply[] = [];
    form: FormGroup | any;
    formGroup: FormGroup | undefined;
    visible: boolean = false;
    disabled: boolean = false;
    arr: any[] = [] ;
    size: number;
    renewDate: any;
    //totalQuantityProductos : number = 0;

    constructor(    
        private formBuilder: FormBuilder,
        private saleOrderService: SaleOrderService,
        private messageService: MessageService,
        private miscService:MiscService,
        private supplyService:SupplyService,
        private cfdiService:CfdiService,
        private payWayService:PayWayService,
        private payMethodService:PayMethodService,
        private quotationSaleService:QuotationSaleService,
        private quotationSaleProductService:QuotationSaleProductService,
        private quotationSalePackageService:QuotationSalePackageService,
        private quotationSaleServiceService:QuotationSaleServiceService,
        private quotationSaleRecordService: QuotationSaleRecordService,
        private ngZone: NgZone,
        private datePipe: DatePipe,
        private sessionService:SessionService,
        private router: Router ) 
    {
    }

    ngAfterViewInit(): void {
      // Binding autocomplete to search input control
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.form.controls.saleOrderShippingAddress.setValue(place.formatted_address);
        });
      });
    }

    ngOnInit(): void 
    {

    const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ; //MustMatch('password', 'confirmPassword') };

    this.form = this.formBuilder.group
      ({
        saleOrderQuotationSaleId: [null,[Validators.required]],
        saleOrderShippingDate: null,
        saleOrderShippingAddress: [null,[Validators.required]],
        saleOrderTransmitter: [this.sessionService.getUserId(),[Validators.required]], 
        saleOrderCfdiId: null,
        saleOrderPayWayId: null,
        saleOrderPayMethodId: null,
        saleOrderAdditionalComments: null,
      }, formOptions);
      
    this.list();

    this.formGroup = new FormGroup
      ({
        date: new FormControl<Date | null>(null)
      });

    this.form.get("saleOrderQuotationSaleId").valueChanges.subscribe(selectedValue => 
      {
        this.getFilter(selectedValue);
      });
      
    }

    ngOnDestroy() 
    {
       
    }

    onSubmit() 
    {
      // stop here if form is invalid
      if (this.form.invalid) 
      {
        return;
      }
        this.save();
    }
    cancel(event) {
      event.preventDefault(); //
      this.router.navigate(['/saleOrders']);
    }

    
    private save() {
      
      // En las siguientes variables se guardarán los valores del formulario
      let propertiesSaleOrder = {};  
      let propertiesQuotationSale = {}; 
  
      //Iteramos el objeto de formulario para guardar el valor en las variables arriba declaradas
      Object.keys(this.form.value).forEach(element => 
      {
          propertiesSaleOrder[element] = this.form.value[element];               
      });

      //Parseamos los id a string
      if (propertiesSaleOrder['saleOrderCfdiId']) propertiesSaleOrder['saleOrderCfdiId'] = (propertiesSaleOrder['saleOrderCfdiId']).toString();
      if (propertiesSaleOrder['saleOrderPayWayId']) propertiesSaleOrder['saleOrderPayWayId'] = (propertiesSaleOrder['saleOrderPayWayId']).toString();
      if (propertiesSaleOrder['saleOrderPayMethodId']) propertiesSaleOrder['saleOrderPayMethodId'] = (propertiesSaleOrder['saleOrderPayMethodId']).toString();

      //Creamos la orden de Compra
      this.saleOrderService.create(propertiesSaleOrder)
      .subscribe(data => 
      {
        let actions = [];
        //Método para actualizar la tabla de suministros con los ID seleccionados
        /////////////////////
        this.selectedRegister.forEach(obj => {  

          const ptt = this.supplyService.update({
            'id': obj['id'].toString(), 
            'supplyStatus': 'vendido' , 
            'supplySaleOrderId': data['newId'].toString()
          }).pipe(
              catchError((error) => {
                  throw this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al asignar el suministro en inventario: "+ obj['id'],detail:  error.error.error });
                  return of(null);
              })
          );		
          actions.push(ptt);
        });
        ////////////////////

        //Método para actualizar los registros de venta
        
        var result = this.selectedRegister.reduce(function (groupSupplies, supply) {
          groupSupplies[supply.supplyProductId['id']] = groupSupplies[supply.supplyProductId['id']] || [];
          groupSupplies[supply.supplyProductId['id']].push(supply);
          return groupSupplies;
        }, {});
    
        Object.keys(result).forEach(key => 
        {
          let listRecord = this.quantities.filter(obj => obj.quotationSaleRecordProductId.id == key && obj.quotationSaleRecordSupplyId == null);    
          for(var i=0; i < result[key].length ; i++)
          {
            const ptt = this.quotationSaleRecordService.update({
              'id': listRecord[i].id.toString(), 
              'quotationSaleRecordSupplyId': result[key][i].id.toString(),
              'quotationSaleRecordSaleOrderId': data['newId'].toString()
            }).pipe(
                catchError((error) => {
                    throw this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al asignar el suministro en registro de venta: ",detail:  error.error.error });
                    return of(null);
                })
            );		
            actions.push(ptt);
          }
        });
        ///////////////////////////

        //Hacemos fork join para mandar las peticiones
        forkJoin(actions).subscribe(()=>
        {
          this.miscService.endRquest(); 
        },
        (err:any)=>
        {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los catalogos', life: 3000 });
          this.miscService.endRquest();
        });

        //Termina la ejecución y devuelve a listado principal
        this.miscService.endRquest();
        this.router.navigate(['/saleOrders']);
      }, (err: any) => {
      //Manejo de la información cuando llega de manera incorrecta
      this.messageService.add({ severity: 'error', key: 'msg', summary: 'Error', detail: err.message, life: 3000 });
      console.log(err.message);
      //this.miscService.endRquest();
      });
    }


    getFilter(value){
        if(value != null){
            this.miscService.startRequest(); 

             //2. Hacer una peticion para traer los servicios de un proveedor
             const services = this.quotationSaleServiceService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"quotationSaleServiceQuotationSaleId"}]',0,1,'[{"id":"asc"}]')
             .pipe(
                 catchError((error) => 
                 {
                     this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                     return of(null); 
                 })
             );
            
            //3. Hacer una peticion para traer los paquetes de un proveedor
            const packages = this.quotationSalePackageService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"quotationSalePackageQuotationSaleId"}]',0,1,'[{"id":"asc"}]')
            .pipe(
                catchError((error) => 
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                    return of(null); 
                })
            );

            //3. Hacer una peticion para traer la cantidad de productos
            const quantities = this.quotationSaleRecordService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"quotationSaleRecordQuotationSaleId"}]',0,1,'[{"id":"asc"}]')
            .pipe(
                catchError((error) => 
                {
                    this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar productos", detail:error.message });
                    return of(null); 
                })
            );

            forkJoin([services,packages,quantities]).subscribe(([dataServices,dataPackages,dataQuantities] )=>
            {

                if(dataQuantities != null )
                {   
                  this.quantities = dataQuantities['object']['records'];
                  dataQuantities['object']['records'].forEach(element => {
                    this.listQuantities.push({
                      "id": element.id , 
                      "idSupply":element.quotationSaleRecordSupplyId,
                      "idType": element.quotationSaleRecordProductId.id,
                      "idProduct": element.quotationSaleRecordProductId.id,
                      "brand": element.quotationSaleRecordProductId.productBrand, 
                      "model": element.quotationSaleRecordProductId.productModel, 
                      "guarranty": element.quotationSaleRecordProductId.productGuaranteeUnit + " " +  element.quotationSaleRecordProductId.productGuaranteeUnitMeasure
                    });
                  });

                  this.listProducts = this.listQuantities.reduce((newArray, e) => {
                    if(e.idSupply === null){
                      const alreadyArray = newArray.find(a => a.idProduct == e.idProduct);
                    
                      if (alreadyArray) {
                        alreadyArray.quantity++;
                      }
                      else {
                        newArray.push({
                          idProduct: e.idProduct, 
                          brand: e.brand,
                          model: e.model,
                          guarranty: e.guarranty,
                          quantity: 1});
                      }
                    }
                    return newArray;
                  }, []);
                  
                }

                if(dataServices != null )
                {  
                  dataServices['object']['records'].forEach(element => {
                    this.listServices.push({
                      "id": element.quotationSaleServiceServiceId.id , 
                      "description": element.quotationSaleServiceServiceId.serviceDescription,
                      "temporality": element.quotationSaleServiceServiceId.serviceTemporality,
                      "temporalityQuantity": element.quotationSaleServiceServiceId.serviceQuantityTemporality, 
                      "quantity": element.quotationSaleServiceQuantity
                    });
                  });
                }  

                if(dataPackages != null )
                {                 
                    dataPackages['object']['records'].forEach(element => {

                        //iteramos los paquetes con servicios para sumarlos a servicelist
                        for (let i = 0; i < element.quotationSalePackageServices.length; i++) 
                        {
                          var idService = element.quotationSalePackageServices[i].infoDetail.id;

                          var result = this.listServices.find((obj) => obj.id ==  idService)
                      
                          result == undefined ? this.listServices.push({
                            "id": idService , 
                            "description": element.quotationSalePackageServices[i].infoDetail.serviceDescription,
                            "temporality": element.quotationSalePackageServices[i].infoDetail.serviceTemporality,
                            "temporalityQuantity": element.quotationSalePackageServices[i].infoDetail.serviceQuantityTemporality, 
                            "quantity": element.quotationSalePackageServices[i].packageServiceQuantity * element.quotationSalePackageQuantity
                          }) : result.quantity = result.quantity + (element.quotationSalePackageServices[i].packageServiceQuantity * element.quotationSalePackageQuantity); 

                        } 
                    }); 
                }  

              this.miscService.endRquest(); 
            },
    
            (err:any)=>
            {
                this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los suministros del proveedor', life: 3000 });
                this.miscService.endRquest();
            });


        }else{
            this.listPackages = [];
            this.listProducts = [];   
            this.listServices = [];         
            this.form.controls.quotationPurchaseProducts = [];
        }
    } 

    list(){

      this.miscService.startRequest();

      //Método para listar Cotizaciones
      const quotationSales = this.quotationSaleService.getList(1)
      .pipe(
        catchError((error) => 
        {
          this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo", detail:error.message });
          return of(null); 
        })
      );

      //Método para listar CFDIS
      const cfdis = this.cfdiService.getAll(0,1,'[{"id":"asc"}]')
      .pipe(
        catchError((error) => 
        {
          this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo", detail:error.message });
          return of(null); 
        })
      );
      
      //Método para listar formas de Pago
      const payways =this.payWayService.getAll(0,1,'[{"id":"asc"}]')
      .pipe(
        catchError((error) => 
        {
          this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo", detail:error.message });
          return of(null); 
        })
      );
      
      //Método para listar métodos de Pago
      const paymethods =this.payMethodService.getAll(0,1,'[{"id":"asc"}]')
      .pipe(
        catchError((error) => 
        {
          this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error al cargar el catálogo", detail:error.message });
          return of(null); 
        })
      );
      
      //Hacemos fork join para mandar las peticiones
      forkJoin([quotationSales,cfdis,payways,paymethods]).subscribe(([dataQuotationSales,dataCfdis,dataPayWays,dataPayMethods] )=>
      {
        //Envia las cotizaciones
        if(dataQuotationSales != null)
        {                    
           dataQuotationSales['object'].forEach(element => {
                /*if(element['quotationSaleStatus'] == 'nueva')
                {*/
                  this.listQuotationSale.push({'label': "ID:"+ element['quotation_sale_id']+" "+ element['quotation_sale_description'],'value': element['quotation_sale_id'].toString()});
                //}
            });
        }

        //Envia los Cfids
        if(dataCfdis != null )
        {                    
            dataCfdis['object']['records'].forEach(element => {
                this.listCfdi.push({'label': element['cfdiKey']+" "+ element['cfdiValue'],'value': element['id']});
            });
        }
        //Envia los PayWays
        if(dataPayWays != null)
        {
            dataPayWays['object']['records'].forEach(element => {
                this.listPayWay.push({'label': element['payWayKey']+" "+ element['payWayValue'],'value': element['id']});
            });
        }
        //Envia los PayMethods
        if(dataPayMethods != null)
        {
            dataPayMethods['object']['records'].forEach(element => {
                this.listPayMethod.push({'label': element['payMethodKey']+" "+ element['payMethodValue'],'value': element['id']});
            });
        }

        this.miscService.endRquest(); 
      },

      (err:any)=>
      {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Error general al obtener los catalogos', life: 3000 });
          this.miscService.endRquest();
      });
          
  }
  getStatusCheck(obj:any,index:number){
    let disabled = false;
    //console.log(x);
   
      let itemSelected = this.listAllRegisters.filter((obj) => obj.supplyIsSelected == true);

      if( !obj.isSelected  && this.size == itemSelected.length )  
          disabled = true;
        

      return disabled;

  }
  //traer los suministros de la orden de venta
  getAllProducts(value, quantity){
    console.log(this.selectedRegister);
    this.visible = true;
    this.size = quantity;
    if(value != null ) {
      this.supplyService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"supplyProductId"}]',0,1,'[{"id":"asc"}]')
      .subscribe( (data:any )=>
      {            
        data == null ? []: 
          data['object']['records'].forEach(element => {
            if(element.supplyStatus == "disponible"){
              
              this.listAllRegisters.push(element);
            }
        });
      },
      (err : any) =>
      {
          this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error al cargar listado de productos' , detail:err.message, life: 3000 });
          this.miscService.endRquest();
      });
    }
  } 

  closeModalMap(){
    this.visible = false;
    this.listAllRegisters = [];
  }

  assignProduct() {
   
    this.listAllRegisters.forEach(element => {
      if(element["supplyIsSelected"] ){
          this.selectedRegister.push(element);
      }
    });

    this.closeModalMap();
    this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa', life: 3000 });
    
  }

}

