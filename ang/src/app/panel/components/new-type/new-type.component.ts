import { Component, OnInit } from '@angular/core';
import { Type } from '../../models/type.model';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-new-type',
  templateUrl: './new-type.component.html',
  styleUrls: ['./new-type.component.css']
})
export class NewTypeComponent implements OnInit {

  type: Type
  structure: Array<any> = Array();

  constructor(private typeService: TypeService) { }

  ngOnInit(): void {
  }


  onSave(): void {
    let name = (<HTMLInputElement>document.getElementById("inputName")).value;
    let desc = (<HTMLInputElement>document.getElementById("description")).value;

    if (name != "") {
      const type = {} as Type;
      type.name = name;
      type.info = Array<any>();
      type.info.push({ description: desc })

      type.structure = Array<any>();

      for (let st of this.structure) {
        let name = (<HTMLInputElement>document.getElementById(st.inputKeyName)).value;
        let value = (<HTMLInputElement>document.getElementById(st.inputValueName)).value;
        let nameReplace = name.replace(/ /g, '_');
        console.log(nameReplace);
        if (name != "" && value != "") {
          const obj = {
            name: name,
            type: value,
            inputName: "input" + name,
            key: name.toLowerCase()
          }
          type.structure.push(obj);
        }

      }

      console.log(type);
      this.typeService.saveType(type).subscribe(type => console.log(type));
    }
  }

  addSt(): void {
    this.structure.push({
      inputKeyName: "inputKey" + this.structure.length,
      inputValueName: "inputValue" + this.structure.length,
    });
    console.log(this.structure);
  }
}
