import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface ConfirmModel {
  parentRubricName: string;
  message: string;
}
@Component({
  selector: 'app-add-new-modal',
  templateUrl: './add-new-modal.component.html',
  styleUrls: ['./add-new-modal.component.scss'],
})
export class AddNewModalComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements OnInit, ConfirmModel
{
  parentRubricName!: string;
  message!: string;
  fileName!: string;

  constructor() {
    super();
  }

  onSubmit(f: NgForm) {
    if(f.valid){
      this.result = true;
      this.close();
    }
  }
  
  onFileSelected(event: Event) {
    const fileList = (event?.target as HTMLInputElement).files;
    if (fileList) {
      const file = fileList[0];

      if (file) {
        this.fileName = file.name;
        // const formData = new FormData();
        // formData.append('thumbnail', file);
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);
        // upload$.subscribe();
      }
    }
  }
  ngOnInit(): void {}
}
