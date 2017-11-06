import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { KeysPipe } from '../../shared/keys.pipe';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
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
	tags = [];
	autocompleteItemsAsObjects = [];
	constructor(
		private noteService: NoteService,
	) {}
	ngOnInit() {
		this.notes = this.noteService.getSnapshot();
		this.noteService.getTagData().subscribe(data => {
			this.autocompleteItemsAsObjects = this.objToArr(data);
		});
	}
	createNote() {
		console.log('this.tags : ');
		console.log(this.tags);
		var deNormTags = this.toObject(this.tags);
		this.noteService.create(this.noteService.userName, this.content, this.description, deNormTags)
		this.content = ''
		this.description = ''
		this.saveTags();
		this.tags = [];
	}
	saveTags() {
		this.noteService.saveTags(this.tags);
	}
	add_tag(input_value) {
		this.tags.push(input_value.display);
	}
	remove_tag(input_value) {
		this.remove(this.tags, input_value.display);
	}
	remove(array, element) {
		const index = array.indexOf(element);
		if (index > -1) {
			array.splice(index, 1);
		}
	}
	objToArr(data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			res.push(data[i].name);
		}
		return res;
	}
	toObject(arr) {
		var rv = {};
		for (var i = 0; i < arr.length; ++i)
			rv[arr[i]] = true;
		console.log('rv : ');
		console.log(rv);
		return rv;
	}
}
