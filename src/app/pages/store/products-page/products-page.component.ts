import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<any[]>;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.products$ = this.data.getProducts();
  }

}
