import { Routes } from '@angular/router';
import { ColonBiomarker } from './histology/colon-biomarker/colon-biomarker';
import { Home } from './home/home';
import { ColonResection } from './histology/colon-resection/colon-resection';

export const routes: Routes = [
     // Define a route for the new component
  { path: '', component: Home }, 
  { path: 'colon-biomarker', component: ColonBiomarker },
  { path: 'colon-resection', component: ColonResection },

  // Add other routes as needed
  // { path: '', component: HomeComponent }, 
  // { path: 'tasks', component: TaskListComponent } 

  // Wildcard route for 404
  { path: '**', redirectTo: '' } 
];
