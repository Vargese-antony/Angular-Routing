import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    products: IProduct[];

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute
    ) { }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts()
                .subscribe(products => this.products = products,
                           error => this.errorMessage = <any>error);
        // Read the query params from the route
        this.listFilter = this.activatedRoute.snapshot.queryParamMap.get('filterBy');
        this.showImage = !!this.activatedRoute.snapshot.queryParamMap.get('showImage');
    }
}
