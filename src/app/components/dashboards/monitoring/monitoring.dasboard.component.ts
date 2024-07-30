import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../api/product';
import { AppConfig, LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from '../../../service/dashboard.service';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { ChartModule } from 'primeng/chart';

@Component({
    templateUrl: './monitoring.dashboard.component.html'
})

export class MonitoringDashboardComponent implements OnInit, OnDestroy
{

    //
    //subscription!: Subscription;
    //config!: AppConfig;



    //--------------------------------------

    dashboardService: DashboardService;

    xChart: any;

    chartOption:any;
    chartTicketStatus:any;
    chartCategory:any;
    chartIncidences:any;;


    constructor(private _dashboardService: DashboardService, private layoutService: LayoutService)
    {
        /*this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.config = config;
            this.initCharts();
        });*/

        this.dashboardService = _dashboardService;

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartOption = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            },
            animations: {
                radius: {
                    duration: 400,
                    easing: 'linear',
                    loop: (context) => context.active
                }
            },
        }
    }


    ngOnInit(): void
    {

        //conteo por estado de productos
        this.dashboardService.getTicketStatus().subscribe((res: any)=>
        {

            const records = res.object.records;
            const labels = records.map(record => record.status);
           // const labels = records.map(record => record.status);
            const data = records.map(record => record.count);

            this.chartTicketStatus = {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: Array.from({length: labels.length}, () => this.getRandomColor()),
                }]
            };
        },
        err =>
        {
            console.log(err);

        });
        //lineal conteo de clientes activos
        this.dashboardService.getIncidences().subscribe((res: any)=>
            {
    
                //registros totales
                const rec = res.object.records;
    
                //obtiene el maximo y minimo global
                const minDate = rec[0].date;
                const maxDate = rec[rec.length - 1].date;
    
                const rellenoCliente:any = this.rellenarMesesFaltantes(rec,minDate, maxDate);
    
                const labels = rellenoCliente.map(record => record.date);
                const data = rellenoCliente.map(record => record.count);
    
    
                this.chartIncidences = {
                    labels: labels,
                    datasets: [{
                        label:'Incidencias',
                        data: data,
                        tension: .2,
                        display: false,
                        borderColor: '#66BB6A',
                        backgroundColor: Array.from({length: labels.length}, () => this.getRandomColor()),
                    }]
                };
            },
            err =>
            {
                console.log(err);
    
            });
    
        
    }

    rellenarMesesFaltantes(data:any, minDateParam:string, maxDateParam:string)
    {
        const minDate = new Date(minDateParam+'-01T00:00:00');
        const maxDate = new Date(maxDateParam+'-01T00:00:00');

        const filledRecords = [];

        let currentDate = new Date(minDate);

        while (currentDate <= maxDate)
        {
            const dateString = currentDate.toISOString().slice(0, 7); // Formato YYYY-MM
            const existingRecord = data.find(record => record.date === dateString);

            if (existingRecord)
            {
                filledRecords.push(existingRecord);
            }
            else
            {
                filledRecords.push({
                    count: 0,
                    date: dateString,
                });
            }

            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return filledRecords; /*{
            message: data.message,
            object: {
                records: filledRecords
            }
        };*/
    }

    getRandomColor(): string {
        // Genera componentes de color rojo, verde y azul de manera aleatoria
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        // Retorna el color en formato hexadecimal
        return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    }

    ngOnDestroy()
    {
        //this.subscription.unsubscribe();
    }
}
