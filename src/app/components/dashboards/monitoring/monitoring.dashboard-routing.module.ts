import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonitoringDashboardComponent } from './monitoring.dasboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MonitoringDashboardComponent }
    ])],
    exports: [RouterModule]
})
export class MonitoringDashboardRoutigModule { }
