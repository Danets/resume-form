import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { EducationComponent } from './education/education.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { MatStepper } from '@angular/material/stepper';
import { AboutComponent } from './about/about.component';
import { HigherEducationComponent } from './higher-education/higher-education.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  aboutForm!: FormGroup;
  educationForm!: FormGroup;
  higherEducationForm!: FormGroup;
  workExperienceForm!: FormGroup;
  result!: any;

  step = 0;

  @ViewChild(AboutComponent) aboutComponent!: AboutComponent;

  @ViewChild(EducationComponent) educationComponent!: EducationComponent;
  isHigherEducationExist: boolean = false;

  @ViewChild(HigherEducationComponent)
  higherEducationComponent!: HigherEducationComponent;

  @ViewChild(WorkExperienceComponent)
  workExperienceComponent!: WorkExperienceComponent;

  @ViewChild('stepper') stepper!: MatStepper;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.stepper.selectionChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: StepperSelectionEvent) => {
        this.updateProgress(event.selectedIndex);
      });

    this.educationComponent.checkboxControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isHigherEducationExist) => {
        this.isHigherEducationExist = !!isHigherEducationExist;
      });

    this.aboutComponent?.aboutForm.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((status) => {
        if (status === 'VALID' && this.stepper.selectedIndex === 1) {
          this.stepper.next();
        }
      });

    this.educationComponent?.educationForm.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((status) => {
        if (status === 'VALID' && this.stepper.selectedIndex === 2) {
          this.stepper.next();
        }
      });

    if (this.isHigherEducationExist) {
      this.higherEducationComponent?.higherEducationForm.statusChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe((status) => {
          if (status === 'VALID' && this.stepper.selectedIndex === 3) {
            this.stepper.next();
          }
        });
    }

    this.workExperienceComponent?.workExperienceForm.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((status) => {
        if (
          status === 'VALID' &&
          (this.stepper.selectedIndex === 3 || this.stepper.selectedIndex === 4)
        ) {
          this.workExperienceComponent.workExperienceStep();
          this.stepper.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private preventStep(event: StepperSelectionEvent) {
    setTimeout(() => {
      this.stepper.selectedIndex = event.previouslySelectedIndex;
    }, 0);
  }

  private updateProgress(currentStepIndex: number) {
    const totalSteps = this.stepper._steps.length;
    this.step = ((currentStepIndex + 1) / totalSteps) * 100;
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1 && !this.aboutComponent?.aboutForm.valid) {
      this.preventStep(event);
    } else if (
      event.selectedIndex === 2 &&
      !this.educationComponent?.educationForm.valid
    ) {
      this.preventStep(event);
    } else if (
      this.isHigherEducationExist &&
      event.selectedIndex === 3 &&
      !this.higherEducationComponent?.higherEducationForm.valid
    ) {
      this.preventStep(event);
    } else if (
      !this.isHigherEducationExist &&
      (event.selectedIndex === 3 || event.selectedIndex === 4) &&
      !this.workExperienceComponent?.workExperienceForm.valid
    ) {
      this.preventStep(event);
    }
  }
}
