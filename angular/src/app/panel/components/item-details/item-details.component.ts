import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item.model';
import { Type } from '../../models/type.model';
import { ItemService } from '../../services/item.service';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  id: String;
  item: Item
  dataLoaded: Promise<boolean>;
  type: Type;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private typeService: TypeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.itemService.getItemById(params.id).subscribe((result: Item) => {
        this.item = result;
        this.typeService.getTypeById(result.typeId).subscribe((result: Type) => {
          this.type = result;
          this.dataLoaded = Promise.resolve(true);
        });
      });
    });
  }

  getInfo(stName: String): String{
    type ObjectKey = keyof typeof Item;
    const key = stName.toLowerCase() as ObjectKey;

    return this.item.info[key];
  }
}
