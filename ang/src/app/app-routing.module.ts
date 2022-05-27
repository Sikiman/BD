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
import { NewUserComponent } from './panel/components/new-user/new-user.component';
import { UpdateItemComponent } from './panel/components/update-item/update-item.component';
import { UpdateUserComponent } from './panel/components/update-user/update-user.component';
import { UserComponent } from './panel/components/user/user.component';
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
    { path: 'item/details/:id', component:  ItemDetailsComponent },
    { path: 'users', component:  UserComponent },
    { path: 'item/edit/:id', component:  UpdateItemComponent },
    { path: 'user/edit/:id', component:  UpdateUserComponent },
    { path: 'user/insert', component:  NewUserComponent }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
