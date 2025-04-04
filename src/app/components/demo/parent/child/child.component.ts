import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Output() onClick=new EventEmitter;
  btnClicked(){
    this.onClick.emit("hhhhhh");
  }
}
