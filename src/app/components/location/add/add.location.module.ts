import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './add.location.component';
import { AddLocationRoutigModule } from './add.location-routing.module';
import { ProviderService } from 'src/app/service/provider.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
	imports: [
		CommonModule,
		AddLocationRoutigModule,
		FormsModule,
		ButtonModule,
		InputTextModule,
		ToastModule,
		RippleModule,
		RadioButtonModule,
		MessageModule,
		ReactiveFormsModule,
		DropdownModule,
		FileUploadModule,
		GoogleMapsModule,
		InputMaskModule
	],
	declarations: [AddLocationComponent],
	providers: [ProviderService, MessageService, ConfirmationService]
})
export class AddLocationModule { }
