import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item.model';
import { Type } from '../../models/type.model';
import { ItemService } from '../../services/item.service';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: String
  type: Type
  structure: Array<any>
  item: Item;
  dataLoaded: Promise<boolean>

  constructor(private route: ActivatedRoute, private typeService: TypeService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id; 
      this.itemService.getItemById(params.id).subscribe((result: Item) => {
        this.item = result;
        this.typeService.getTypeById(this.item.typeId).subscribe((result: Type) => {
          this.type = result;
          this.structure = this.type.structure;
          this.dataLoaded = Promise.resolve(true);
        });
      });
    })}

    onSave(): void{
      const item = {} as Item;
      item.typeId = this.type.id;
      item.name = (<HTMLInputElement>document.getElementById("inputName")).value;
      item.info = {} as any;
      item.id = this.id;

      for(let st of this.structure){
        let nameStr: String = st.name;
        item.info[nameStr.toLowerCase()] = (<HTMLInputElement>document.getElementById(st.inputName)).value
      }

      console.log(item);
      this.itemService.updateItem(item).subscribe(item => console.log(item));
    }

    getInfo(stName: String): String{
      type ObjectKey = keyof typeof Item;
      const key = stName.toLowerCase() as ObjectKey;
  
      return this.item.info[key];
    }
}
