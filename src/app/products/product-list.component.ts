import { style } from "@angular/animations";
import { Component, OnInit } from "@angular/core";

import {Iproduct} from "./product";

import { ProductService } from "./product.service";


@Component({
    selector:'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {


    

  constructor(private productService: ProductService) {

    

  }

    productTitle: string = 'Gunim\'s Product List';

    

    imageWidth: number=50;

    imageMargin: number=2;

    showImage: boolean=false;

    private _listFilter:string='';

    errorMessage: string =' ';


    set listFilter(value:string) {
      this._listFilter= value;
      console.log("in setter", value);
      this.filteredProducts=this.performFilter(value);
    }

    get listFilter(): string {
      return this._listFilter;
    }

    filteredProducts: Iproduct[]=[];

    products: Iproduct[]=[];

      performFilter(filterBy:string): Iproduct[] {
        filterBy=filterBy.toLocaleLowerCase();
        return this.products.filter((product:Iproduct) =>
        
        product.productName.toLocaleLowerCase().includes(filterBy));
      }


      toggleImage(): void {

        this.showImage =!this.showImage;
      }

      ngOnInit(): void {

          this.listFilter='cart';
          this.productService.getProducts().subscribe({
            next: products => {
              this.products=products;
              this.filteredProducts=this.products;
            }, 
            error: err => this.errorMessage=err
          });
          
      }


      


}