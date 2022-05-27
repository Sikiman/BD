import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
  }

    onSave(): void{
      let user: User = new User;

      user.name = (<HTMLInputElement>document.getElementById("inputName")).value;
      user.username = (<HTMLInputElement>document.getElementById("inputUsername")).value;
      user.password = (<HTMLInputElement>document.getElementById("inputPassword")).value;
      user.role = (<HTMLInputElement>document.getElementById("inputRole")).value;
      //user.permissions = (<HTMLInputElement>document.getElementById("inputPermissions")).value;

      console.log(user);
    
      this.userService.saveUser(user).subscribe(user => console.log(user));
    }

}
