import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Dashboard Monitoreo'}, loadChildren: () => import('./monitoring/monitoring.dashboard.module').then(m => m.MonitoringDashboardModule) },
       // { path: '', data: {breadcrumb: 'Dashboard'}, loadChildren: () => import('./main/main.dashboard.module').then(m => m.MainDashboardModule) },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
