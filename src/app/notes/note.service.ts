import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../core/auth.service';
interface Note {
	userName: string;
	content: string;
	description: string;
	tag: string;
	hearts ? : number;
	id ? : any;
	time ? : number;
}
@Injectable()
export class NoteService {
	notesCollection: AngularFirestoreCollection < Note > ;
	notesCollection2;
	MyNotesCollection;
	TagsCollection;
	noteDocument: AngularFirestoreDocument < Node >
		userName;
	constructor(
		private afs: AngularFirestore,
		public auth: AuthService
	) {
		this.userName = this.auth.currentUser.displayName;
		this.notesCollection = this.afs.collection('notes', ref => ref.orderBy('time', 'desc'))
		this.MyNotesCollection = this.afs.collection('notes', ref => ref.where('userName', '==', this.userName).orderBy('time', 'desc'))
		this.TagsCollection = this.afs.collection('Tags', ref => ref.orderBy('time', 'desc'))
		// this.noteDocument = this.afs.doc('notes/mtp1Ll6caN4dVrhg8fWD');
	}
	getData(): Observable < Note[] > {
		return this.notesCollection.valueChanges();
	}
	getTagData(): Observable < Note[] > {
		return this.TagsCollection.valueChanges();
	}
	getSnapshot() {
		// ['added', 'modified', 'removed']
		return this.notesCollection.snapshotChanges().map(actions => {
			return actions.map(a => {
				return { id: a.payload.doc.id, ...a.payload.doc.data() }
			})
		})
	}
	getFilteredSnapshot(tag) {
		console.log('filtered : (tag) ');
		console.log(tag);
		this.notesCollection2 = this.afs.collection('notes', ref => ref.where('tag', '==', tag).orderBy('time', 'desc'))
		return this.notesCollection2.snapshotChanges().map(actions => {
			return actions.map(a => {
				return { id: a.payload.doc.id, ...a.payload.doc.data() }
			})
		})
	}
	getMyNotesSnapshot() {
		return this.MyNotesCollection.snapshotChanges().map(actions => {
			return actions.map(a => {
				return { id: a.payload.doc.id, ...a.payload.doc.data() }
			})
		})
	}
	getNote(id) {
		return this.afs.doc < Note > ('notes/' + id);
	}
	create(userName, content: string, description, tag) {
		const note: Note = {
			userName: userName,
			content: content,
			description: description,
			tag: tag,
			hearts: 0,
			time: new Date().getTime()
		}
		return this.notesCollection.add(note);
	}
	saveTags(tags) {
		for (var i = 0; i < tags.length; i++) {
			const tag = {
				name: tags[i],
				time: new Date().getTime()
			}
			this.TagsCollection.add(tag);
		}
	}
	updateNote(id, data) {
		return this.getNote(id).update(data)
	}
	deleteNote(id) {
		return this.getNote(id).delete()
	}
}
