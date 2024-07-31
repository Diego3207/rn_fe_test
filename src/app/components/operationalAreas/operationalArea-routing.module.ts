import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild
	([
        { path: '', data: {breadcrumb: 'Áreas operativas'}, loadChildren: () => import('./list/list.operationalArea.module').then(m => m.ListOperationalAreaModule) },
        { path: 'edit/:idx', data: {breadcrumb: 'Editar área operativa'}, loadChildren: () => import('./edit/edit.operationalArea.module').then(m => m.EditOperationalAreaModule) },
        { path: 'view/:idx', data: {breadcrumb: 'Ver área operativa'}, loadChildren: () => import('./view/view.operationalArea.module').then(m => m.ViewOperationalAreaModule) },
        { path: 'add', data: {breadcrumb: 'Registrar área operativa'}, loadChildren: () => import('./add/add.operationalArea.module').then(m => m.AddOperationalAreaModule) }
    ])],
    exports: [RouterModule]
})
export class OperationalAreaRoutingModule { }