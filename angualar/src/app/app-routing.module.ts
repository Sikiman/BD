import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RandomGuard } from './auth/guards/random.guard';
import { HomeComponent } from './panel/components/home/home.component';
import { ItemDetailsComponent } from './panel/components/item-details/item-details.component';
import { ItemComponent } from './panel/components/item/item.component';
import { NewItemComponent } from './panel/components/new-item/new-item.component';
import { NewTypeComponent } from './panel/components/new-type/new-type.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { path: 'panel', 
  component: PanelComponent,
  canActivate: [RandomGuard],
  canLoad: [RandomGuard],
  children: [
    { path: '', component:  HomeComponent },
    { path: 'items/:id', component:  ItemComponent },
    { path: 'item/insert/:id', component:  NewItemComponent },
    { path: 'type/insert', component:  NewTypeComponent },
    { path: 'item/details/:id', component:  ItemDetailsComponent }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
