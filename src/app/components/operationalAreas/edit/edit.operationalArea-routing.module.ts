import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditOperationalAreaComponent } from './edit.operationalArea.component';

@NgModule({
	imports: [RouterModule.forChild
	([
		{ path: '', component: EditOperationalAreaComponent }
	])],
	exports: [RouterModule]
})
export class EditOperationalAreaRoutigModule { }