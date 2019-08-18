import { ProductService } from "./../../../services/product/product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.scss"]
})
export class AdminProductsComponent implements OnInit {
  products$:any=[];
 key: any;
 filteredProducts: any[];
 query:any;
 p: number = 1;
 countId:number=0;
 itemsPerPage:number=5;
 searchText;
  constructor(private productService: ProductService) {


  this.productService.getAll().snapshotChanges().subscribe(res=> {
    res.forEach((element)=>{

              let obj= {
                key: element.key,...element.payload.val()
              }
             this.products$.push(obj);
            this.filteredProducts =this.products$;
            this.countId= this.filteredProducts.length;
    });

  })

  }

  ngOnInit() {}

  filter(query:any){

    this.filteredProducts= query ? this.products$.filter((p:any)=>(p.title).toLowerCase().includes(query.toLowerCase())) : this.products$;
  }
}
