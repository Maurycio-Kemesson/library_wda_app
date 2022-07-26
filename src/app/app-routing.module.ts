import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookloanComponent } from './components/bookloan/bookloan.component';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PublishingcompanyComponent } from './components/publishingcompany/publishingcompany.component';
import { StudentsComponent } from './components/students/students.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'books' , component: BooksComponent },
  { path: 'students' , component: StudentsComponent },
  { path: 'users' , component: UsersComponent },
  { path: 'perfil' , component: PerfilComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path: 'publishingcompanys' , component: PublishingcompanyComponent },
  { path: 'bookloans' , component: BookloanComponent },
  { path: '' , redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**' , redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
