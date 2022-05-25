import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ItemComponent } from './components/item/item.component';
import { Type } from './models/type.model';
import { TypeService } from './services/type.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  types: Array<Type> = []

  constructor(private typeService: TypeService, private router: Router, private itemComponent: ItemComponent, private authService: AuthService) { }

  ngOnInit(): void {
    this.typeService.getTypes().subscribe((result: Array<Type>) => this.types = result);
  }

  logOut(): void{
    this.authService.logout();
  }

}
