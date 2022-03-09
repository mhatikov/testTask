import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationPageComponent } from './components/pages/authorization-page/authorization-page.component';

const routes: Routes = [
  {path: '', component: AuthorizationPageComponent},
  {path: 'main', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
