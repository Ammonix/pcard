import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubricRoutingModule } from './rubric-routing.module';
import { RubricListComponent } from './rubric-list/rubric-list.component';
import { RubricItemComponent } from './rubric-item/rubric-item.component';


@NgModule({
  declarations: [
    RubricListComponent,
    RubricItemComponent,
  ],
  imports: [
    CommonModule,
    RubricRoutingModule
  ]
})
export class RubricModule { }
