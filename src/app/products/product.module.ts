import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ProductResolveService } from './product-resolve.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditGuardService } from './product-edit-guard.service';

const routes: Route[] = [
  {
    path: '',
    component: ProductListComponent
  },
  { 
    path: ':id', 
    component: ProductDetailComponent, 
    resolve: {product: ProductResolveService}
  },
  { 
    path: ':id/edit',
    component: ProductEditComponent,
    resolve: {product: ProductResolveService},
    canDeactivate: [ProductEditGuardService],
    children: [
      { path: '', redirectTo: 'info', pathMatch:'full'},
      { path: 'info', component: ProductEditInfoComponent},
      { path: 'tags', component: ProductEditTagsComponent}
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductResolveService,
    ProductEditGuardService
  ]
})
export class ProductModule {}
