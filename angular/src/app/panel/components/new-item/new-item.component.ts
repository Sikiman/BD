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

  id: String
  type: Type
  structure: Array<any>
  
  constructor(private route: ActivatedRoute, private typeService: TypeService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id; 
      this.typeService.getTypeById(params.id).subscribe((result: Type) => {
        this.type = result;
        this.structure = this.type.structure;
      });
    })}

    onSave(): void{
      const item = {} as Item;
      item.typeId = this.id;
      item.name = (<HTMLInputElement>document.getElementById("inputName")).value;
      item.info = {} as any;

      for(let st of this.structure){
        let nameStr: String = st.name;
        item.info[nameStr.toLowerCase()] = (<HTMLInputElement>document.getElementById(st.inputName)).value
      }

      console.log(item);
      this.itemService.saveItem(item).subscribe(item => console.log(item));
    }
}
