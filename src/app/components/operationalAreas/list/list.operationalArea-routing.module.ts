import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListOperationalAreaComponent } from './list.operationalArea.component';

@NgModule({
	imports: [RouterModule.forChild
	([
		{ path: '', component: ListOperationalAreaComponent }
	])],
	exports: [RouterModule]
})
export class ListOperationalAreaRoutigModule { }