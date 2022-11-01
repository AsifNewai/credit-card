import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineApplicationRoutingModule } from './online-application-routing.module';
import { OnlineApplicationComponent } from './online-application.component';


@NgModule({
  declarations: [
    OnlineApplicationComponent
  ],
  imports: [
    CommonModule,
    OnlineApplicationRoutingModule
  ]
})
export class OnlineApplicationModule { }
