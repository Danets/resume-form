import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-higher-education',
  templateUrl: './higher-education.component.html',
  styleUrls: ['./higher-education.component.scss'],
})
export class HigherEducationComponent implements OnInit {
  higherEducationForm!: FormGroup;

  years = this.getYears();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initHigherEducationForm();
  }

  private initHigherEducationForm() {
    this.higherEducationForm = this.fb.group({
      higherEducationBlocks: this.fb.array([this.createHigherEducationBlock()]),
    });
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 100))
      .fill('')
      .map((_, idx) => now - idx);
  }

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
}
