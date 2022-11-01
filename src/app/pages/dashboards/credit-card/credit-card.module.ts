import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardRoutingModule } from './credit-card-routing.module';
import { CreditCardComponent } from './credit-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RelativeDateTimeModule } from 'src/@vex/pipes/relative-date-time/relative-date-time.module';
import {MatDialogModule} from '@angular/material/dialog';

import { ScrollbarModule } from '../../../../@vex/components/scrollbar/scrollbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DateTokensModule } from '../../../../@vex/pipes/date-tokens/date-tokens.module';
import { PopoverModule } from '../../../../@vex/components/popover/popover.module';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';

@NgModule({
  declarations: [
    CreditCardComponent,
  ],
  imports: [
    CommonModule,
    CreditCardRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    RelativeDateTimeModule,
    MatFormFieldModule,
    MatDialogModule,
    ScrollbarModule,
    DragDropModule,
    DateTokensModule,
    PopoverModule,
    SecondaryToolbarModule,
  ],
  providers:[
    // {
    //   provide: MatDialogRef,
    //   useValue: {}
    // },
  ]
})
export class CreditCardModule { }