import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  educationForm!: FormGroup;

  years = this.getYears();

  checkboxControl = new FormControl(false);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initEducationForm();
  }

  private initEducationForm() {
    this.educationForm = this.fb.group({
      educationBlocks: this.fb.array([this.createEducationBlock()]),
    });
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 100))
      .fill('')
      .map((_, idx) => now - idx);
  }

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
}
