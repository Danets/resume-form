import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private fb = inject(FormBuilder);
  aboutForm!: FormGroup;
  educationForm!: FormGroup;
  higherEducationForm!: FormGroup;
  workExperienceForm!: FormGroup;

  years = this.getYears();

  result: any;
  about: any;
  education: any;
  higherEducation: any;
  workExperience: any;

  checkboxControl = new FormControl(false);
  isHigherEducationExist$ = this.checkboxControl.valueChanges;

  ngOnInit(): void {
    this.initAboutForm();
    this.initEducationForm();
    this.initHigherEducationForm();
    this.initWorkExperienceForm();
  }

  private initAboutForm() {
    this.aboutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  private initEducationForm() {
    this.educationForm = this.fb.group({
      educationBlocks: this.fb.array([this.createEducationBlock()]),
    });
  }

  private initHigherEducationForm() {
    this.higherEducationForm = this.fb.group({
      higherEducationBlocks: this.fb.array([this.createHigherEducationBlock()]),
    });
  }

  private initWorkExperienceForm() {
    this.workExperienceForm = this.fb.group({
      workExperienceBlocks: this.fb.array([this.createWorkExperienceBlock()]),
    });
  }

  private async initResult() {
    this.about = JSON.parse(localStorage.getItem('about') || '{}');
    this.education = JSON.parse(localStorage.getItem('education') || '{}');
    this.higherEducation = JSON.parse(
      localStorage.getItem('higherEducation') || '{}'
    );
    this.workExperience = JSON.parse(
      localStorage.getItem('workExperience') || '{}'
    );
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 100))
      .fill('')
      .map((_, idx) => now - idx);
  }

  aboutStep() {
    if (this.aboutForm.valid) {
      const about = localStorage.setItem(
        'about',
        JSON.stringify(this.aboutForm.value)
      );
      console.log(about);
    }
  }

  // Education

  get educationBlocks() {
    return this.educationForm.controls['educationBlocks'] as FormArray;
  }

  getEducationBlock(index: number): FormGroup {
    return this.educationBlocks.at(index) as FormGroup;
  }

  createEducationBlock(): FormGroup {
    return this.fb.group({
      placeEd: ['', Validators.required],
      yearsEd: ['', Validators.required],
    });
  }

  addEducationBlock(): void {
    this.educationBlocks.push(this.createEducationBlock());
  }

  removeEducationBlock(index: number): void {
    this.educationBlocks.removeAt(index);
  }

  educationStep() {
    if (this.educationForm.valid) {
      localStorage.setItem(
        'education',
        JSON.stringify(this.educationForm.value)
      );
    }
  }

  // Higher Education

  get higherEducationBlocks() {
    return this.higherEducationForm.controls[
      'higherEducationBlocks'
    ] as FormArray;
  }

  getHigherEducationBlock(index: number): FormGroup {
    return this.higherEducationBlocks.at(index) as FormGroup;
  }

  createHigherEducationBlock(): FormGroup {
    return this.fb.group({
      institution: ['', Validators.required],
      years: ['', Validators.required],
      degree: ['', Validators.required],
    });
  }

  addHigherEducationBlock() {
    this.higherEducationBlocks.push(this.createHigherEducationBlock());
  }

  removeHigherEducationBlock(index: number) {
    this.higherEducationBlocks.removeAt(index);
  }

  higherEducationStep() {
    if (this.higherEducationForm.valid) {
      localStorage.setItem(
        'higherEducation',
        JSON.stringify(this.higherEducationForm.value)
      );
    }
  }

  //  Work Experience

  get workExperienceBlocks() {
    return this.workExperienceForm.get('workExperienceBlocks') as FormArray;
  }

  getworkExperienceBlock(index: number): FormGroup {
    return this.workExperienceBlocks.at(index) as FormGroup;
  }

  createWorkExperienceBlock(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      years: ['', Validators.required],
    });
  }

  addWorkExperienceBlock() {
    this.workExperienceBlocks.push(this.createWorkExperienceBlock());
  }

  removeWorkExperienceBlock(index: number) {
    this.workExperienceBlocks.removeAt(index);
  }

  async workExperienceStep() {
    if (this.workExperienceForm.valid) {
      localStorage.setItem(
        'workExperience',
        JSON.stringify(this.workExperienceForm.value)
      );
    }
    await this.initResult();
  }
}
