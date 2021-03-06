import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { FilteredNotesListComponent } from './notes/notes-list/filtered-notes-list/filtered-notes-list.component';
import { UserNotesListComponent } from './notes/notes-list/user-notes-list/user-notes-list.component';
import { MyNotesListComponent } from './notes/my-notes-list/my-notes-list.component';
import { CoreModule } from './core/core.module'
const routes: Routes = [
	{ path: '', component: ReadmePageComponent },
	{ path: 'login', component: UserLoginComponent, },
	{ path: 'items', component: ItemsListComponent, canActivate: [AuthGuard] },
	{ path: 'notes', component: NotesListComponent, canActivate: [AuthGuard] },
	{ path: 'notes/filtered/:Tag', component: FilteredNotesListComponent },
	{ path: 'notes/user/:userName', component: UserNotesListComponent },
	{ path: 'my-notes', component: MyNotesListComponent, canActivate: [AuthGuard] },
	// uploads are lazy loaded
	{ path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] }
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}
