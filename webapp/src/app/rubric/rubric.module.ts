import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubricRoutingModule } from './rubric-routing.module';
import { RubricListComponent } from './rubric-list/rubric-list.component';
import { RubricItemComponent } from './rubric-item/rubric-item.component';
import { AddNewModalComponent } from './add-new-modal/add-new-modal.component';
import { FormsModule } from '@angular/forms';
import { ImageContainerComponent } from './image-container/image-container.component';

@NgModule({
  declarations: [
    RubricListComponent,
    RubricItemComponent,
    AddNewModalComponent,
    ImageContainerComponent,
  ],
  imports: [CommonModule, RubricRoutingModule, FormsModule],
})
export class RubricModule {}
