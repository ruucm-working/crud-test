import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'user-notes-list',
	templateUrl: './user-notes-list.component.html',
	styleUrls: ['./user-notes-list.component.scss']
})
export class UserNotesListComponent implements OnInit {
	userName: string;
	paramsSub: Subscription;
	notes;
	content;
	constructor(
		private noteService: NoteService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location, ) {}
	ngOnInit() {
		this.paramsSub = this.route.params
			.map(params => params['userName'])
			.subscribe(userName => {
				this.userName = userName;
			});
		this.notes = this.noteService.getUserNotesSnapshot(this.userName)
	}
	goBack(): void {
		this.location.back();
	}
}
