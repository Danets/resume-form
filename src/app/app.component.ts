import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { EducationComponent } from './education/education.component';
import { Observable } from 'rxjs';
import { WorkExperienceComponent } from './work-experience/work-experience.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  aboutForm!: FormGroup;
  educationForm!: FormGroup;
  higherEducationForm!: FormGroup;
  workExperienceForm!: FormGroup;

  result!: any;

  @ViewChild(EducationComponent) educationComponent!: EducationComponent;
  isHigherEducationExist$!: Observable<boolean | null>;

  @ViewChild(WorkExperienceComponent)
  workExperienceComponent!: WorkExperienceComponent;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.isHigherEducationExist$ =
      this.educationComponent.checkboxControl.valueChanges;
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 3 || event.selectedIndex === 4) {
      this.workExperienceComponent.workExperienceStep();
    }
  }
}
