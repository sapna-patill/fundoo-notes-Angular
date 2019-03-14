import { Component, OnInit } from '@angular/core';
import { noteService } from 'src/app/service/noteservices/noteService';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  items: any;

  constructor(private service: noteService) { }

  ngOnInit() {
    this.getReminder();
  }

  getReminder() {
    const data = {
      userID: localStorage.getItem('id')
    };
    console.log("data on archive---25",data);
    this.service.getReminder(data).subscribe(
      data => {
         this.items = data['result'];
         console.log(this.items);
         
      },
      error => {
        console.log('error response: ', error);
      }
    )
  }


  removeReminder(note)
  { 
    console.log("data in items",note);
    note.reminder=null;
    this.service.updateNote(note).subscribe(
      data => {
        console.log("data", data);
      },
      err => {
        console.log(err);

      })

  }

}
