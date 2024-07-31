import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOperationalAreaComponent } from './edit.operationalArea.component';
import { EditOperationalAreaRoutigModule } from './edit.operationalArea-routing.module';
import { OperationalAreaService } from 'src/app/service/operationalArea.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
	imports: [
		CommonModule,
		EditOperationalAreaRoutigModule,
		FormsModule,
		ButtonModule,
		InputTextModule,
		ToastModule,
		RippleModule,
		MessageModule,
		InputMaskModule,
		RadioButtonModule,
		InputNumberModule,
		DropdownModule,
		ReactiveFormsModule
		
	],
	declarations: [EditOperationalAreaComponent],
	providers: [OperationalAreaService, MessageService, ConfirmationService]
})
export class EditOperationalAreaModule { }
