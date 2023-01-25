import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskviewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

const routes: Routes =
[
  { path: '', redirectTo : "lists", pathMatch :"full" },
  { path: 'new-list', component: NewListComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists', component: TaskviewComponent },
  { path: 'lists/:listId', component: TaskviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
