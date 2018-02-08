import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit{
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        /*let id = +this.activatedRoute.snapshot.params['id'];
        this.getProduct(id);
        */
       this.product = this.activatedRoute.snapshot.data['product'];
    }

    /*getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }*/
}
