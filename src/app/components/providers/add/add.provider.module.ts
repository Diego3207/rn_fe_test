import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProviderComponent } from './add.provider.component';
import { AddProviderRoutigModule } from './add.provider-routing.module';
import { ProviderService } from 'src/app/service/provider.service';
import { ProviderContactService } from 'src/app/service/providerContact.service';
import { ProviderLocationService } from 'src/app/service/providerLocation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
	imports: [
		CommonModule,
		AddProviderRoutigModule,
		FormsModule,
		ButtonModule,
		InputTextModule,
		ToastModule,
		RippleModule,
		MessageModule,
		ReactiveFormsModule,
		TableModule,
		InputMaskModule,
		MultiSelectModule,
		DropdownModule,
		InputNumberModule
	],
	declarations: [AddProviderComponent],
	providers: [ProviderService,ProviderContactService,ProviderLocationService, MessageService, ConfirmationService]
})
export class AddProviderModule { }
