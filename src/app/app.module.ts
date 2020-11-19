import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@modules/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    FooterComponent,
    NavigationComponent,
  ],
  imports: [
    //angular
    BrowserModule,

    //core + shared
    CoreModule,
    SharedModule,

    //auth
    AuthModule,

    //app
    AppRoutingModule
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
