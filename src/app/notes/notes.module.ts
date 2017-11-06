import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NoteService } from './note.service';
import { NotesListComponent } from './notes-list/notes-list.component';
import { FilteredNotesListComponent } from './notes-list/filtered-notes-list/filtered-notes-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { MyNotesListComponent } from './my-notes-list/my-notes-list.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TagInputModule, BrowserAnimationsModule,
    RouterModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    NotesListComponent,
    NoteDetailComponent,
    MyNotesListComponent,
    FilteredNotesListComponent
  ],
  providers: [NoteService]
})
export class NotesModule {}
