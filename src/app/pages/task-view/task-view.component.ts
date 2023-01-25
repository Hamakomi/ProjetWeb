import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskviewComponent implements OnInit
{

   lists: any; //Should be string type for safety, but overload errors encountered
   tasks: any;
   selectedListId: any;

   constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit()
    {
      this.route.params.subscribe(
        (params: Params) => {
          if (params.listId) {
            this.selectedListId = params.listId;
            this.taskService.getTasks(this.selectedListId).subscribe((tasks: any) => {
              this.tasks = tasks;
            })
          } else {
            this.tasks = undefined;
          }
        }
      )

      this.taskService.getLists().subscribe((lists: any) => {
        this.lists = lists;
      })
    
    }

    onTaskClick(task:any)
    {
      //advance completion state of task
      this.taskService.complete(task).subscribe(() => {
        if(task.completion >= 4)
        {
          task.completion = 0;
        }
        task.completion += 1;
        this.router.navigate(['/lists/' + task._listId]);
        console.log("Task completion successfully advanced.");
     
      })
    }

    onDeleteListClick()
    {
      this.taskService.deleteList(this.selectedListId).subscribe((res:any) => {
        console.log(res);
        this.router.navigate(['/lists']);
      })
    }

    onDeleteTaskClick(id:any)
    {
      this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val:any) => val._id !== id);
      console.log(res);
      
      })
    }

   /*changeTaskListId(taskId, currentListId)
    {
      this.taskService.updateTask(newListId, taskId, newListId).subscribe((res:any) =>
      {

      })
    }

    onMoveTaskClick(task)
    {

    }*/
}
