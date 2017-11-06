import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes;
  content;
  description;
  tag;
  constructor(
    private noteService: NoteService,
  ) {}
  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.notes = this.noteService.getSnapshot()
  }
  createNote() {
    this.noteService.create(this.noteService.userName, this.content, this.description, this.tag)
    this.content = ''
    this.tag = ''
  }
}
