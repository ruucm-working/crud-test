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
	UserNotesCollection;
	noteDocument: AngularFirestoreDocument < Node >
		userName;
	tag_datas;
	constructor(
		private afs: AngularFirestore,
		public auth: AuthService
	) {
		this.userName = this.auth.currentUser.displayName;
		this.notesCollection = this.afs.collection('notes', ref => ref.orderBy('time', 'desc'))
		this.MyNotesCollection = this.afs.collection('notes', ref => ref.where('userName', '==', this.userName).orderBy('time', 'desc'))
		this.TagsCollection = this.afs.collection('Tags', ref => ref.orderBy('time', 'desc'))
		this.TagsCollection.valueChanges().subscribe(
			data => {
				this.tag_datas = data;
			}
		);
	}
	getData(): Observable < Note[] > {
		return this.notesCollection.valueChanges();
	}
	getTagData(): Observable < Note[] > {
		return this.TagsCollection.valueChanges();
	}
	getSnapshot() {
		return this.notesCollection.snapshotChanges().map(actions => {
			return actions.map(a => {
				return { id: a.payload.doc.id, ...a.payload.doc.data() }
			})
		})
	}
	getFilteredSnapshot(tag) {
		this.notesCollection2 = this.afs.collection('notes', ref => ref.where('tag.' + tag, '==', true).orderBy('time', 'desc'))
		return this.notesCollection2.snapshotChanges().map(actions => {
			return actions.map(a => {
				return { id: a.payload.doc.id, ...a.payload.doc.data() }
			})
		})
	}
	getUserNotesSnapshot(userName) {
		this.UserNotesCollection = this.afs.collection('notes', ref => ref.where('userName', '==', userName).orderBy('time', 'desc'))
		return this.UserNotesCollection.snapshotChanges().map(actions => {
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
			if (!this.TagDuplicated(tags[i])) {
				const tag = {
					name: tags[i],
					time: new Date().getTime()
				}
				this.TagsCollection.add(tag);
			}
		}
	}
	TagDuplicated(tag) {
		var filt = this.tag_datas.find((ele) => { return ele.name == tag; })
		if (filt) return true;
		else return false;
	}
	updateNote(id, data) {
		return this.getNote(id).update(data)
	}
	deleteNote(id) {
		return this.getNote(id).delete()
	}
}
