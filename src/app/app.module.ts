
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomepageComponent } from './starwars/homepage.component';
import { CustomInterceptor } from './util/http-interceptor';
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './starwars/filtercharacters';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
