import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubricListComponent } from './rubric-list/rubric-list.component';

const routes: Routes = [{ path: '', component: RubricListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RubricRoutingModule {}
