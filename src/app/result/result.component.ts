import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  about: any;
  education: any;
  higherEducation: any;
  workExperience: any;

  ngOnInit() {
    this.about = JSON.parse(localStorage.getItem('about') || '{}');
    this.education = JSON.parse(localStorage.getItem('education') || '{}');
    this.higherEducation = JSON.parse(
      localStorage.getItem('higherEducation') || '{}'
    );
    this.workExperience = JSON.parse(
      localStorage.getItem('workExperience') || '{}'
    );
  }
}
