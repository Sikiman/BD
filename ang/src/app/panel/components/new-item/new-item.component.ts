import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item.model';
import { Type } from '../../models/type.model';
import { ItemService } from '../../services/item.service';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  id: string
  type: Type
  structure: Array<any>
  items: Array<Item>
  dataLoaded: Promise<boolean>
  
  constructor(private route: ActivatedRoute, private typeService: TypeService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id; 
      this.typeService.getTypeById(params.id).subscribe((result: Type) => {
        this.type = result;
        this.structure = result.structure;
        this.itemService.getItemsById(params.id).subscribe((result: Array<Item>) => {
          this.items = result,
          this.dataLoaded = Promise.resolve(true);
        });
      });
    })}

    onSave(): void{
      let item = new Item;
      item.typeId = this.id;
      item.name = (<HTMLInputElement>document.getElementById("inputName")).value;
      item.status = (<HTMLInputElement>document.getElementById("inputStatus")).value;
      item.info = {} as any;

      for(let st of this.structure){
        let nameStr: string = st.name;
        item.info[nameStr.toLowerCase()] = (<HTMLInputElement>document.getElementById(st.inputName)).value
      }

      console.log(item);
      this.itemService.saveItem(item).subscribe(item => console.log(item));
    }

    copyFrom(): void{
      let item = this.items[+(<HTMLInputElement>document.getElementById("inputCopyItem")).value];
      console.log(item);

      (<HTMLInputElement>document.getElementById("inputName")).value = item.name;

      for(let st of this.structure){
        (<HTMLInputElement>document.getElementById(st.inputName)).value = item.info[st.key];
      }
    }
}
