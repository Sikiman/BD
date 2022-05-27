import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelComponent } from './panel/panel.component';
import { ItemComponent } from './panel/components/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { NewItemComponent } from './panel/components/new-item/new-item.component';
import { NewTypeComponent } from './panel/components/new-type/new-type.component';
import { HomeComponent } from './panel/components/home/home.component';
import { ItemDetailsComponent } from './panel/components/item-details/item-details.component';
import { UserComponent } from './panel/components/user/user.component';
import { UpdateItemComponent } from './panel/components/update-item/update-item.component';
import { UpdateUserComponent } from './panel/components/update-user/update-user.component';
import { NewUserComponent } from './panel/components/new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ItemComponent,
    NewItemComponent,
    NewTypeComponent,
    HomeComponent,
    ItemDetailsComponent,
    UserComponent,
    UpdateItemComponent,
    UpdateUserComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
