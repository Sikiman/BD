import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<User>
  dataLoaded: Promise<boolean>

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result: Array<User>) => {
      this.users = result,
      this.dataLoaded = Promise.resolve(true);
    });
  }

  delete(): void{
    this.users.pop();
  }

  filter(): void{
    
  }
}
