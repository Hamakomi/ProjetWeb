import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable
({
  //public newListId: string;
  providedIn: 'root'
})
export class TaskService
{

  constructor(private webReqService: WebRequestService) { }

  
  getLists()
  {
    return this.webReqService.get('lists');
  }

  createList(title: string)
  {    
    return this.webReqService.post('lists', { title });
  }

  getTasks(listId: string)
  {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string)
  {   
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: any) //advance task completion
  { 
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completion: task.completion + 1
    });
  }

  deleteList(id: any)
  {
    return this.webReqService.delete(`lists/${id}`);
  }

  deleteTask(listId: any, taskId: any)
  {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  /*

  #MoveTask Prototype (not functional)

  updateTask(oldlistId: any, taskId: any, _listId: any)
  {   
    return this.webReqService.patch(`lists/${oldlistId}/tasks/${taskId}`, { _listId});
  }
  updateList(id: string, title: string)
  {    
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  

 
 
  

 

  */
}
