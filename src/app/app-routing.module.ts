import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { EducationComponent } from './education/education.component';
import { HigherEducationComponent } from './higher-education/higher-education.component';
import { ResultComponent } from './result/result.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'education', component: EducationComponent },
  { path: 'higher-education', component: HigherEducationComponent },
  { path: 'work-experience', component: WorkExperienceComponent },
  { path: 'result', component: ResultComponent },
  {
    path: '**',
    redirectTo: 'about',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
