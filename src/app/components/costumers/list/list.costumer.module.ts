import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCostumerComponent } from './list.costumer.component';
import { ListCostumerRoutigModule } from './list.costumer-routing.module';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProviderService } from 'src/app/service/provider.service'
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip'; 

@NgModule({
	imports: [
		CommonModule,
		ListCostumerRoutigModule,
		TableModule,
		ButtonModule,
		ConfirmDialogModule,
		ToolbarModule,
		DialogModule,
		RippleModule,
		ToastModule,
		TagModule,
		TooltipModule
	],
	declarations: [ListCostumerComponent],
	providers: [ProviderService, MessageService, ConfirmationService]
})
export class ListCostumerModule { }
