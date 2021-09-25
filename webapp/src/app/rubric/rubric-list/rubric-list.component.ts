import { Component, OnInit } from '@angular/core';
import { RubricService } from 'src/app/shared/services/rubric.service';

@Component({
  selector: 'app-rubric-list',
  templateUrl: './rubric-list.component.html',
  styleUrls: ['./rubric-list.component.scss'],
})
export class RubricListComponent implements OnInit {
  rubrics$ = this.rubricService.getRubrics$();
  constructor(private rubricService: RubricService) {}

  ngOnInit(): void {}
}
