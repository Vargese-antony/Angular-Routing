import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';

@Injectable()
export class ProductEditGuardService implements CanDeactivate<ProductEditComponent>{

  canDeactivate(component: ProductEditComponent, 
      currentRoute: ActivatedRouteSnapshot, 
      currentState: RouterStateSnapshot, 
      nextState?: RouterStateSnapshot): boolean {
    if(component.isDirty) {
      let productName = component.product.productName || 'New Product';
      return confirm(`There are unsaved changes for the product ${productName}`);
    }
    return true;
  }
  constructor() { }

}
