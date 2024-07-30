import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddOperationalAreaComponent } from './add.operationalArea.component';

@NgModule({
	imports: [RouterModule.forChild
	([
		{ path: '', component: AddOperationalAreaComponent }
	])],
	exports: [RouterModule]
})
export class AddOperationalAreaRoutigModule { }