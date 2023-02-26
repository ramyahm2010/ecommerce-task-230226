import { UserResolver } from './user.resolver';
import { UserGuard } from './user.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesResolver } from './components/categories/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'categories/:name',
        component: CategoriesComponent,
        resolve: {
          categoryProducts: CategoriesResolver,
        },
      },
      {
        path: '',
        component: UserProductsComponent,
        resolve: {
          products: UserResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
