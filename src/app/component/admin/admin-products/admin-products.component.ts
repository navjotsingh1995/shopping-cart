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

  constructor(private productService: ProductService) {
 

  this.productService.getAll().snapshotChanges().subscribe(res=> {
    res.forEach(element=>{
              let obj= {
                key: element.key,...element.payload.val()
              }
             this.products$.push(obj);  
            this.filteredProducts =this.products$;
    });
  })
      
  }

  ngOnInit() {}

  filter(query:any){
    
    this.filteredProducts= query ? this.products$.filter((p:any)=>(p.title).toLowerCase().includes(query.toLowerCase())) : this.products$;
  }
}
