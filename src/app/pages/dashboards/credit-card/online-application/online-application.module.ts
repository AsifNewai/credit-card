import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineApplicationRoutingModule } from './online-application-routing.module';
import { OnlineApplicationComponent } from './online-application.component';


@NgModule({
  declarations: [
    OnlineApplicationComponent,
  ],
  imports: [
    CommonModule,
    OnlineApplicationRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [OnlineApplicationComponent],
  entryComponents: [OnlineApplicationComponent]
})
export class OnlineApplicationModule { }
