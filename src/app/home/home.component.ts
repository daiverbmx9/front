import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../services/global.service';
import { Router } from '@angular/router';
import { TaskService } from './services/task.service';
import {MatSnackBar} from '@angular/material';
import { NgForm, EmailValidator } from '@angular/forms';
import { Task } from './models/task';

@Component({
  selector: 'f-home',
  templateUrl: './home.template.html',
  styleUrls : ['./home.template.css'],
  providers : [TaskService]
})
export class HomeComponent implements OnInit {

  public forExpirate:number;
  public strTask:string;
  public expirate:number;
  public emptyTask:boolean;
  public openModal:boolean;
  public _task:Task;
  public user:any;
  public states:any;
  public tasks:any;
  public currentDate:any;
  public _priority:any =
  [
    {
      'name' : 'Baja'
    },
    {
      'name' : 'Media'
    },
    {
      'name' : 'Alta'
    }
  ];
  public showAlerts =
  {
    'info' : true,
    'warning' : true,
    'danger' : true
  };

  constructor(
    private router:Router, private taskService:TaskService, 
    private snackBar:MatSnackBar)
  {
    this.currentDate = new Date();
    this.currentDate.setHours(0,0,0,0);
    this._task = new Task();
    this.openModal = false;
    this.forExpirate = 0;
    this.expirate = 0;
  }

  ngOnInit()
  {
    if (localStorage.getItem('user') == null)
    {
      this.router.navigate(['/login']);
      return;
    }

    this.user = JSON.parse(localStorage.getItem('user'));
    this.loadStates();
  }

  // This method is used for load all states of tasks.
  loadStates()
  {
    this.taskService.states().subscribe(response => 
    {
      this.states = response['states'];
      this.loadTasks();
    }, error =>
    {
      console.log(error);
    })
  }

  // This method is used for load all task by user.
  loadTasks()
  {
    this.taskService.tasks(this.user.id).subscribe(response => 
    {
      if (response['status'] == 200)
      {
        this.tasks = response['tasks'];
        this.emptyTask = this.tasks.length > 0 ? false : true;
        this.showTasks();
      }
    }, error =>
    {
      console.log(error);
    });
  }

  // This function is used for show task.
  showTasks()
  {
    this.forExpirate = 0;
    this.expirate = 0;

    for (let i = 0; i < this.tasks.length; i++) {
      let expiration:number = this.compareDate(this.tasks[i].expiration);
      let state:number = this.tasks[i].state_id;
      let id:number = this.tasks[i].id;

      if (expiration == 2 && state == 1)
      {
        // Update task (expired)
        this.updateTask(6, id);
      }

      if (expiration == 1 && state == 1)
      {
        this.forExpirate++;
        this.strTask = this.forExpirate == 1 ? 'tarea' : 'tareas';
      }

      if (state == 6)
      {
        this.expirate++;
      }
    }
  }

  // This function is used for validate action of task
  action(task:any)
  {
    if (task.state_id == 2 || task.state_id == 6)
    {
      // Delete task
      this.taskService.delete(task.id).subscribe(response => 
      {
        if (response['status'] == 200)
        {
          this.openSnackBar('La tarea ha sido eliminada.', 'cerrar');
          this.loadTasks();
        }
        else
        {
          this.openSnackBar('No se encontró la tarea en el servidor.', 'cerrar');
        }
      }, error => 
      {
        console.log('error');
      });
    }
    else
    {
      // Update task
      this.updateTask(2, task.id, true);
    }
  }

  // This function is used for subscribe into update method of service
  updateTask(state_id, task_id, message:boolean = false)
  {
    this.taskService.update(task_id, {state_id : state_id}).subscribe(response => 
    {
      if (message)
      {
        this.openSnackBar('Tarea completada.', 'cerrar');
      }

      this.loadTasks();
    }, error =>
    {
      console.log(error);
    });
  }

  // This method is used for compare date
  compareDate(value:string):number
  {
    let date = new Date(value);

    if (date.getTime() == this.currentDate.getTime())
    {
      return 1;
    }
    
    if (date.getTime() < this.currentDate.getTime())
    {
      return 2;
    }

    return 0;
  }

  // This function is used for close sesion
  logOut()
  {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // This function is used for show alert message
  openSnackBar(message: string, action: string)
  {
    this.snackBar.open(message, action,
    {
      duration: 2000,
    });
  }

  // This function is used for open add task modal
  openDialog(): void
  {
    this.openModal = true;
  }

  // This function is used for close add task modal
  closeDialog(): void
  {
    this.openModal = false;
  }

  // This function is used for validate save form
  save(f:NgForm)
  {
    this._task.user_id = this.user.id;
    let expiration = this.formatDate(this._task.expiration);
    
    if (!f.valid)
    {
      this.openSnackBar('Todos los campos son requeridos.', 'cerrar');
      return;
    }

    // Save task
    this.taskService.insert(expiration, this._task).subscribe(response => 
    {
      if (response['status'] == 204)
      {
        this.openSnackBar('Imposible crear la tarea, intente de nuevo mas tarde.', 'cerrar');
        return;
      }

      f.reset();
      this.openSnackBar('Se ha creado la tarea', 'cerrar');
      this.closeDialog();
      this.loadTasks();
    }, error => 
    {
      console.log(error);
    });
  }

  // This function is used for get date formate
  formatDate(value)
  {
    let dateObj = new Date(value);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    let newDate = year + "-" + month + "-" + day;
    return newDate
  }

  // This function is used for hide alert
  hideAlert(value:string)
  {
    this.showAlerts[value] = false;
  }

}
