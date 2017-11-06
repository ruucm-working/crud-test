import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
@Component({
  selector: 'my-notes-list',
  templateUrl: './my-notes-list.component.html',
  styleUrls: ['./my-notes-list.component.scss']
})
export class MyNotesListComponent implements OnInit {
  notes;
  content;
  constructor(private noteService: NoteService) {}
  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.notes = this.noteService.getMyNotesSnapshot()
  }
}
