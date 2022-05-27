import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item.model';
import { Type } from '../../models/type.model';
import { ItemService } from '../../services/item.service';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  id: String;
  items: Array<Item>
  type: Type
  dataLoaded: Promise<boolean>
  typeDescription: String

  constructor(private route: ActivatedRoute, private itemService: ItemService, private typeService: TypeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.itemService.getItemsById(params.id).subscribe((result: Array<Item>) => {this.items = result});
      this.typeService.getTypeById(params.id).subscribe((result: Type) => {
        this.type = result;
        this.typeDescription = this.type.info[0].description;
        this.dataLoaded = Promise.resolve(true);
      });
    });
  }

  delete(): void{
    this.items.pop();
    console.log("deleted");
  }
}
