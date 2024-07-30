import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RenovationService } from 'src/app/service/renovation.service';
import { SaleOrderRenovationService } from 'src/app/service/saleOrderRenovation.service';
import { AssociationService } from 'src/app/service/association.service';
import { ConfirmationService, MessageService, LazyLoadEvent, SelectItem, FilterMatchMode  } from 'primeng/api';
import { MiscService } from 'src/app/service/misc.service';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './list.renovation.component.html',
    providers: [DatePipe]
})

export class ListRenovationComponent implements OnInit, OnDestroy {
    content:string;
    renovationServices: any[] = [];
    totalRows: number = 0;
    limit:number = 10 ;
    page:number  ;
    sort:string = '';
    search:string = '';
    loading: boolean;
    searching: boolean;
    showButton! : boolean;
    matchModeOptionsText: SelectItem[];
    matchModeOptionsNumber: SelectItem[];
    matchModeOptionsDate: SelectItem[];
    listVehicles: any[] = [] ;
    dateNewRenovation:string;
    visible: boolean = false;
    confirmDisplaySelected: boolean = false;
    confirmDisplay: boolean = false;

    constructor(
        private miscService:MiscService,
        private cdref:ChangeDetectorRef,
        private messageService: MessageService,
        private datePipe: DatePipe,
        private saleOrderRenovationService: SaleOrderRenovationService,
        private associationService: AssociationService,
        private renovationService: RenovationService,
        private confirmationService: ConfirmationService)
	{

    }


    ngOnInit(): void
	{
        this.matchModeOptionsText = [
            { label: 'Contiene', value: FilterMatchMode.CONTAINS },
            { label: 'Comienza con', value: FilterMatchMode.STARTS_WITH  },
            { label: 'Termina con', value: FilterMatchMode.ENDS_WITH},
            { label: 'Es igual', value: FilterMatchMode.EQUALS },
        ];
        this.matchModeOptionsNumber= [
            { label: 'Contiene', value: FilterMatchMode.CONTAINS },
            { label: 'Es igual', value: FilterMatchMode.EQUALS },
        ];
        this.matchModeOptionsDate = [
            { label: 'Contiene', value:  FilterMatchMode.DATE_IS  },
            { label: 'No contiene', value: FilterMatchMode.DATE_IS_NOT },
            { label: 'Antes', value: FilterMatchMode.DATE_BEFORE },
            { label: 'Después', value: FilterMatchMode.DATE_AFTER },
        ];
    }


    ngOnDestroy() {

    }

    load(event: LazyLoadEvent){

        this.page =  (event.first / event.rows) + 1;
        this.limit = event.rows;
        let order: {}[] = [];
        let filter = [];

        event.multiSortMeta.forEach(function (obj) {
            let h = {};
            h[obj['field']] = (( obj['order'] == 1) ? "asc": "desc");
            order.push(h);
        });
        this.sort = JSON.stringify(order);
        for(let i in event.filters){

            let obj= event.filters[i];

            if(typeof event.filters[i].value === 'boolean'){

                if(event.filters[i].value != null){
                    obj['field'] = i;
                    filter.push(obj);
                }
            }else{
                //type => number/string/object
                if(event.filters[i].value){
                    obj['field'] = i;
                    filter.push(obj);
                }
            }
        }
        this.search =JSON.stringify(filter);
        this.miscService.startRequest();
        if(filter.length > 0){
            this.filter(this.search);
        }else{
            this.list();
            this.cdref.detectChanges();
        }

    }

    list(){
        this.renovationService.getAll(this.limit, this.page,this.sort)
        .subscribe((data: any)=>{
            if(data != null)
            {
                this.renovationServices = data['object']['records'];
                this.totalRows = data['object']['totalRecords'];
            }else{
                this.renovationServices = [];
                this.totalRows = 0;
                this.messageService.add({severity:'warn', key: 'msg',summary:'Sin registros',life: 3000});
            }
            this.miscService.endRquest();
        }, (err : any) => {
            // Entra aquí si el servicio entrega un código http de error EJ: 404,
            if( err.status == 416){
                // success  info  warn  error
                this.messageService.add({severity:'warn', key: 'msg',summary: err.error.message,life: 3000});

            }else{

                //status = 0 , cuando no esta el back arriba
                this.messageService.add({severity:'error', key: 'msg', summary:  err.error.message,detail: err.name,life: 3000});
            }
            this.miscService.endRquest();
        });
    }

    filter(texto: any)
    {
        this.renovationService.getFilter(texto,this.limit, this.page,this.sort) // le sumo +1 ya que en sails le resto uno a la pagina (en sails quitare ese -1 )
        .subscribe((data: any)=>{
            if(data != null){
                this.renovationServices = data['object']['records'];
                this.totalRows = data['object']['totalRecords'];
            }else{
                this.renovationServices = [];
                this.totalRows = 0;
                this.messageService.add({severity:'warn', key: 'msg',summary:'Sin registros',life: 3000});
            }
            this.miscService.endRquest();

        },  (err : any) => {
            // Entra aquí si el servicio entrega un código http de error EJ: 404,
            if( err.status == 416){
                // success  info  warn  error
                this.messageService.add({severity:'warn', key: 'msg',summary: err.error.message,life: 3000});

            }else{

                //status = 0 ,
                this.messageService.add({severity:'error', key: 'msg', summary:  err.error.message,detail: err.name,life: 3000});
            }
            this.miscService.endRquest();
        });
    }

    //TODO esta funcion debe ser parte de un helper
    getPageRange(page: number, limit: number, totalRows: number)
    {
        if (!Number.isInteger(page) || page < 1) {
            page = 1;
        }
        if (!Number.isInteger(limit) || limit < 1) {
            limit = 10;
        }
        if (!Number.isInteger(totalRows) || totalRows < 0) {
            totalRows = 0;
        }
        const startIndex = (page - 1) * limit + 1;
        const endIndex = Math.min(startIndex + limit - 1, totalRows);
        return `Mostrando del ${startIndex} al ${endIndex} de ${totalRows}`;
    }

    closeModalMap(){
        this.visible = false;
        //this.coordenates = null;
    }

    delete(idRenovation:number) {
        this.confirmationService.confirm({
            message: '¿Está seguro que desea cancelar el servicio seleccionado?',
            header :'CANCELAR' ,
            icon: 'pi pi-info-circle',
            acceptLabel: 'Aceptar',
            rejectLabel:'Cancelar',
            accept: () => {
                this.cancelService(idRenovation);
            }
        });

    }

    cancelService(idRenovation){
        let renovationData = {};

        renovationData['id']= idRenovation.toString();
        renovationData['saleOrderRenovationDateCancellation'] = this.datePipe.transform(new Date(), 'yyyy-MM-dd  HH:mm:ss');
        renovationData['saleOrderRenovationActive']= 0;

        // update sale orders renovation
        this.saleOrderRenovationService.update(renovationData)
        .subscribe(data =>
        {
        this.miscService.endRquest();
        this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa',  life: 3000 });
        this.list();
        }, (err : any) =>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Problemas al guardar', life: 3000 });
            this.miscService.endRquest();
        });
    }


    create(idSaleOrder, quantity, temporality, date :Date) {
        this.confirmationService.confirm({
            message: '¿Está seguro que desea renovar el servicio seleccionado?',
            header :'RENOVAR' ,
            icon: 'pi pi-info-circle',
            acceptLabel: 'Aceptar',
            rejectLabel:'Cancelar',
            accept: () => {
                this.createNewRenovation(idSaleOrder, quantity, temporality, date);
            }
        });

    }

    createNewRenovation(idSaleOrder, quantity, temporality, date :Date){
        let renovationData = {};

        renovationData['saleOrderRenovationQuotationSaleServiceId'] = idSaleOrder.toString();

        let auxDate = new Date (date);
        //add the renewal date.
        if(temporality == "año"){
            renovationData['saleOrderRenovationDateRenovation'] = this.datePipe.transform(auxDate.setFullYear(auxDate.getFullYear() + quantity), 'yyyy-MM-dd HH:mm:ss').toString();
        } else if (temporality == "mes"){
            renovationData['saleOrderRenovationDateRenovation'] = this.datePipe.transform(auxDate.setMonth(auxDate.getMonth() + quantity), 'yyyy-MM-dd HH:mm:ss').toString();
        } else {
            renovationData['saleOrderRenovationDateRenovation'] =  this.datePipe.transform(auxDate.setDate(auxDate.getDate() + quantity), 'yyyy-MM-dd HH:mm:ss').toString();
        }

        // create sale orders renovation
        this.saleOrderRenovationService.create(renovationData)
        .subscribe(data =>
        {
        this.miscService.endRquest();
        this.messageService.add({ severity: 'success',key: 'msg', summary: 'El servicio se renovó exitosamente.',  life: 3000 });
        this.list();
        }, (err : any) =>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Problemas al guardar', life: 3000 });
            this.miscService.endRquest();
        });
    }

    clear(){
        this.listVehicles = [];
    }

    getFilter(value){
        this.clear();
        console.log(value);

        this.miscService.startRequest();
        // list of vehicles assigned to the sales order
        this.associationService.getFilter('[{"value":"'+value+'","matchMode":"equals","field":"associationTrackerServiceQuotationSaleServiceId"}]',0,1,'[{"id":"asc"}]')
        .subscribe(data =>
        {
            //Save data
            data['object']['records'].forEach(element => {
                console.log(element);
                this.listVehicles.push({
                    "idInstallation": element.idInstallation,
                    "vehicleBrand": element.vehicleBrand + " " + element.vehicleModel,
                    "vehiclePlate": element.vehiclePlate,
                    "trackerImei": element.trackerImei                    
                });
            });
            // keep
            //this.list();
            this.miscService.endRquest();
            this.messageService.add({ severity: 'success',key: 'msg', summary: 'Consulta de instalaciones exitosa',  life: 3000 });
        }, (err : any) =>
        {
            this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Problemas en la consulta', life: 3000 });
            this.miscService.endRquest();
        });
        this.miscService.endRquest();
        this.visible = true
    }

}
