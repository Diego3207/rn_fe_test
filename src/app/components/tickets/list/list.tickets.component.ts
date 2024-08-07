import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ticket } from 'src/app/api/ticket';
import { TicketService } from 'src/app/service/ticket.service';
import { MonitoringDeviceService } from 'src/app/service/monitoringDevice.service';
import { ConfirmationService, MessageService, LazyLoadEvent, SelectItem, FilterMatchMode  } from 'primeng/api';
import { MiscService } from 'src/app/service/misc.service';
import { forkJoin, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe, CurrencyPipe,formatDate  } from '@angular/common';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';

@Component({
    templateUrl: './list.tickets.component.html',
    providers: [DatePipe, CurrencyPipe]
})
export class ListTicketComponent implements OnInit, OnDestroy {
    form: FormGroup | any;
    @ViewChild('urlMap') urlMap!: ElementRef;
    coordenates:string;
    selectedTickets: Ticket[] = [];
    confirmDisplaySelected: boolean = false;
    confirmDisplay: boolean = false;
	content:string;
    tickets: Ticket[];
    ticket: Ticket;
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
    visible: boolean;
    id:number = null;

    constructor(
        private formBuilder: FormBuilder,
        private miscService:MiscService,
        private ticketService: TicketService,
        private monitoringDeviceService: MonitoringDeviceService,
        private cdref:ChangeDetectorRef,
        private messageService: MessageService,
        private sessionService:SessionService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private router: Router )
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

        const formOptions: AbstractControlOptions = { validators: Validators.nullValidator } ;

		this.form = this.formBuilder.group
		({
            ticketEndComment:[null, [Validators.required,Validators.maxLength(255)]],
            ticketEndUser: [this.sessionService.getUserId(),[Validators.required]], 
			ticketStatus:['cerrado', [Validators.required]],
         }, formOptions);
    }


    ngOnDestroy() {

    }

    load(event: LazyLoadEvent)
    {
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

    list()
    {
        this.ticketService.getAll(this.limit,this.page,this.sort)
        .subscribe((data: any)=>{
            if(data != null)
            {
                this.tickets = data['object']['records'];
                this.totalRows = data['object']['totalRecords'];
                console.log(data);

            }else{
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
        this.ticketService.getFilter(texto,this.limit, this.page,this.sort) // le sumo +1 ya que en sails le resto uno a la pagina (en sails quitare ese -1 )
        .subscribe((data: any)=>{
            if(data != null){
                this.tickets = data['object']['records'];
                this.totalRows = data['object']['totalRecords'];

            }else{
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

    delete(deleteType:number, object : Ticket) {

        this.confirmationService.confirm({
            message: (deleteType == 1 ? '¿Confirma eliminar los registros seleccionados?' :'¿Confirma eliminar el registro?'),
            header :'Confirmar' ,
            icon: 'pi pi-info-circle',
            acceptLabel: 'Aceptar',
            rejectLabel:'Cancelar',
            accept: () => {
                switch (deleteType) {
                    case 1:
                        this.confirmDeleteSelected();
                        break;
                    case 2 :
                        this.confirmDelete(object.id);
                        break;

                }
            }
        });

    }

    confirmDelete(id:number) {
        this.ticketService.disable(id).subscribe((data: any)=>{
            this.list();
            this.messageService.add({ severity: 'success',key: 'msg', summary: 'Operación exitosa', life: 3000 });

        }, err => {
        });
    }

    confirmDeleteSelected() {
        var peticiones: any[] = [];


		for(let i = 0 ; i < this.selectedTickets.length; i++)
		{
            const ptt = this.ticketService.disable(this.selectedTickets[i].id).pipe
			(
				catchError((error) =>
				{
					this.messageService.add({ life:5000, key: 'msg', severity: 'error', summary: "Error eliminar un registro", detail:error.message });
					return of(null);
				})
			);
			peticiones.push(ptt);
        }

		forkJoin(peticiones).subscribe((respuestas: any[]) =>
		{
			this.messageService.add({ severity: 'success', key: 'msg',summary: 'Operación exitosa', detail: 'Elementos eliminados exitosamente', life: 3000 });
            this.selectedTickets = [];
            this.list();
		},
		err =>
		{
			this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error', detail: 'Problemas al eliminar', life: 3000 });
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

    getSeverity(status) {
        switch(status) {
            case 'nuevo':
                return 'info';
                break;
            default:
                return 'success';
        }
    }

    openDialogReject(id:number) {
		this.visible = true;
		this.id = id;
	}

	closeDialogReject() {
		this.visible =false;
		this.form.controls.ticketEndComment.setValue(null);
	}

    rejectQuotation(){
		if ( !this.form.invalid ) {
			let ticket = {};
			ticket['id'] = this.id.toString();
			Object.keys(this.form.value).forEach(element => {
				ticket[element] = this.form.value[element];
			});

            ticket['ticketEndUser'] = (ticket['ticketEndUser']).toString();
			ticket['ticketEndDate'] = this.datePipe.transform(new Date(), 'yyyy-MM-dd  HH:mm:ss');

			this.ticketService.update(ticket)
			.subscribe(data =>{
				this.messageService.add({ severity: 'success',key: 'msg', summary: 'Guardado exitoso',life: 3000 });

				this.closeDialogReject();

				this.list();

			},  (err : any) => {
				this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error  al guardar', detail: err.message, life: 3000 });
				this.miscService.endRquest();
			});
		} else {
			this.messageService.add({ severity: 'error',key: 'msg', summary: 'Error',  detail:'Falta agregar comentarios de cierre', life: 3000 });
			return;
		}

	}

}
