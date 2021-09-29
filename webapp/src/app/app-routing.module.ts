import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'rubric',
    loadChildren: () =>
      import('./rubric/rubric.module').then((m) => m.RubricModule),
  },
  { path: '', redirectTo: '/rubric', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
