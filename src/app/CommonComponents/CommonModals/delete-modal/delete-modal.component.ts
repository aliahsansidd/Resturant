import {  Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
declare var $;
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit, OnChanges {

  @Output()
  IsDelete = new EventEmitter<string>();
  @Input() id: string;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    console.log(this.id);
  }
  Delete() {
    this.IsDelete.emit(this.id);
    $('#exampleModal').modal('hide');
  }

  ShowModal(id) {
    this.id = id;
    $('#exampleModal').modal('show');
  }

}
