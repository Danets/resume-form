import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit {
  workExperienceForm!: FormGroup;

  years = this.getYears();

  about: any;
  education: any;
  higherEducation: any;
  workExperience: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initWorkExperienceForm();
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
