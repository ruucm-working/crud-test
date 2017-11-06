import { Component, Input } from '@angular/core';
import { NoteService } from '../note.service';
@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent {
  @Input()
  note: any;
  constructor(private noteService: NoteService) {}
  addHeartToNote(val) {
    this.noteService.updateNote(this.note.id, { hearts: val + 1 })
  }
  deleteNote(id) {
    this.noteService.deleteNote(id)
  }
}
