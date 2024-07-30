import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOperationalAreaComponent } from './list.operationalArea.component';
import { ListOperationalAreaRoutigModule } from './list.operationalArea-routing.module';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { OperationalAreaService } from 'src/app/service/operationalArea.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
	imports: [
		CommonModule,
		ListOperationalAreaRoutigModule,
		TableModule,
		ButtonModule,
		ConfirmDialogModule,
		ToolbarModule,
		DialogModule,
		RippleModule,
		ToastModule,
		TooltipModule 
	],
	declarations: [ListOperationalAreaComponent],
	providers: [OperationalAreaService, MessageService, ConfirmationService]
})
export class ListOperationalAreaModule { }
