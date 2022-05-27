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

  id: string;
  items: Array<Item>
  type: Type
  dataLoaded: Promise<boolean>
  typeDescription: String
  filterItem: Item
  structure: Array<any>

  constructor(private route: ActivatedRoute, private itemService: ItemService, private typeService: TypeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.typeService.getTypeById(params.id).subscribe((result: Type) => {
        this.type = result;
        this.structure = result.structure;
        this.typeDescription = this.type.info[0].description;
        this.itemService.getItemsById(params.id).subscribe((result: Array<Item>) => {
          this.items = result,
          this.dataLoaded = Promise.resolve(true);
        });
      });
    });
  }

  delete(): void {
    this.items.pop();
    console.log("deleted");
  }

  filter(): void {
    this.filterItem = new Item;
    if((<HTMLInputElement>document.getElementById("inputName")).value != ""){
    this.filterItem.name = (<HTMLInputElement>document.getElementById("inputName")).value;
    }
    if((<HTMLInputElement>document.getElementById("inputStatus")).value != ""){
      this.filterItem.status = (<HTMLInputElement>document.getElementById("inputStatus")).value;
    }
    this.filterItem.typeId = this.id;
    this.filterItem.info = {} as any;

    for(let st of this.structure){
      let nameStr: String = st.name;
      if((<HTMLInputElement>document.getElementById(st.inputName)).value != ""){
      this.filterItem.info[nameStr.toLowerCase()] = (<HTMLInputElement>document.getElementById(st.inputName)).value
      }
    }

    console.log(this.filterItem);

    this.itemService.getFilterItems(this.filterItem).subscribe((result: Array<Item>) => {
      this.items = result,
      console.log(result)
    });
  }
}
