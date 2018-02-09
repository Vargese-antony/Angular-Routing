import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../messages/message.service';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
    pageTitle: string = 'Product Edit';
    errorMessage: string;
    dataIsValid : {[key: string] : boolean} = {};

    currentProduct: IProduct;
    private originalProduct: IProduct;

    get product(): IProduct {
        return this.currentProduct;
    }
    set product(val: IProduct) {
        this.currentProduct = val;

        // retain the original value
        this.originalProduct = Object.assign({}, val);
    }

    get isDirty(): boolean {
        return JSON.stringify(this.currentProduct) !== JSON.stringify( this.originalProduct);
    }
    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }
    
    ngOnInit() {
        // Using route parameter and call the service to get the data

        //let id = +this.activatedRoute.snapshot.params['id'];
        /*this.activatedRoute.params.subscribe( params => {
            let id = +params['id'];
            this.getProduct(id);
        });*/

        // Using resolver

        // 1. Snapshot 

        //this.onProductRetrieved(this.activatedRoute.snapshot.data['product']);

        // 2. Using observable to change the data when the resolver fetches again

        this.activatedRoute.data.subscribe( data => {
            this.onProductRetrieved(data['product']);
        })
    }

    getProduct(id: number): void {
        this.productService.getProduct(id)
            .subscribe(
                (product: IProduct) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the product list
        this.router.navigate(['/products']);
    }
    isValid(path : string) {
        this.validate();

        if(path) {
            return this.dataIsValid[path];
        }

        return ( this.dataIsValid && 
                Object.keys(this.dataIsValid).every( key => this.dataIsValid[key] === true) );
    }

    validate() : void {
        //clear the object
        this.dataIsValid = {};

        // Check 'Info' tab values
        if( this.product.productName &&
            this.product.productName.length > 2 &&
            this.product.productCode ) 
        {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // Check 'tags' tab
        if( this.product.category && 
            this.product.category.length > 2)
        {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }

    reset() {
        this.dataIsValid = {};
        this.currentProduct = null;
        this.originalProduct = null;
    }
}
