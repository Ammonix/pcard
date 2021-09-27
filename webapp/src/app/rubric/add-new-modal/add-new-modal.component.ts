import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AddNewRubricModel {
  parentRubricName: string;
}
export interface AddNewRubricResult {
  isValid: boolean;
  formData: FormData;
}
@Component({
  selector: 'app-add-new-modal',
  templateUrl: './add-new-modal.component.html',
  styleUrls: ['./add-new-modal.component.scss'],
})
export class AddNewModalComponent
  extends SimpleModalComponent<AddNewRubricModel, AddNewRubricResult>
  implements OnInit, AddNewRubricModel
{
  parentRubricName!: string;
  file!: File;

  constructor() {
    super();
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      var formData = new FormData();
      formData.append("file", this.file);
      formData.append("rubricName", f.value.rubricName);
      this.result = { isValid: true, formData };
      this.close();
    }
  }

  onFileSelected(event: Event) {
    const fileList = (event?.target as HTMLInputElement).files;
    if (fileList) {
      const file = fileList[0];

      if (file) {
        this.file = file;
        // const formData = new FormData();
        // formData.append('thumbnail', file);
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);
        // upload$.subscribe();
      }
    }
  }
  ngOnInit(): void {}
}
