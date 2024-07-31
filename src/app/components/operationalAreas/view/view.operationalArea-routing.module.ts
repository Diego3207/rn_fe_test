import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewOperationalAreaComponent } from './view.operationalArea.component';

@NgModule({
	imports: [RouterModule.forChild
	([
		{ path: '', component: ViewOperationalAreaComponent }
	])],
	exports: [RouterModule]
})
export class ViewOperationalAreaRoutigModule { }