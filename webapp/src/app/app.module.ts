import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SimpleModalModule } from 'ngx-simple-modal';
import { defaultSimpleModalOptions } from 'ngx-simple-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SimpleModalModule.forRoot(
      { container: document.body },
      {
        ...defaultSimpleModalOptions,
        ...{
          closeOnEscape: true,
          closeOnClickOutside: true,
          animationDuration: 300,
          autoFocus: true,
        },
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
