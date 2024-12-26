import { ProductService } from '../service/product.service';
import { AgGridModule } from 'ag-grid-angular';
import {CommonModule} from '@angular/common';
import {Product} from '../models/products.models';
import {Component, OnInit} from '@angular/core';
import type {ColDef, GridApi, GridReadyEvent} from 'ag-grid-community'; // Column Definition Type Interface
import { ICellRendererParams } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule // Register the ClientSideRowModelModule
  ],
  template: `

      <ag-grid-angular
        class="ag-theme-quartz"
        style="height: 400px; width: 820px"
        [rowData]="products"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [animateRows]="true"
        [pagination]="true"
        (gridReady)="onGridReady($event)"
      >
      </ag-grid-angular>

      <button (click)="onBtExport()">Export CSV</button>

  `,
})



export class ProductGridComponent implements OnInit{

  private gridApi!: GridApi<Product>;

  products: Product[] =[];
  columnDefs: ColDef<Product>[] = [
    { valueGetter: p => p.data?.id, headerName: 'ID', sortable: true, filter: true },
    { valueGetter: p => p.data?.name, headerName: 'Name', sortable: true, filter: true },
    { valueGetter: p => p.data?.price, headerName: 'Price ($)', sortable: true, filter: true },

    { valueGetter: p => p.data?.num, headerName: 'Sells', sortable: true, filter: true },  // Added Sells column
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };

  constructor(private http: HttpClient, private productService: ProductService) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/ventes').subscribe({
      next: (sells) => {
        console.log('Fetched sells:', sells);

        const allIds = sells.flatMap(sells => sells.idProduits.map((id: string) => parseInt(id, 10)));

        console.log('All Product IDs:', allIds);

        this.fetchProductsByIds(allIds);
      },
      error: (error) => {
        console.error('Error fetching sells:', error);
      },
      complete: () => {
        console.log('Fetching sells completed.');
      },
    });
  }

  fetchProductsByIds(ids: number[]): void {
    const frequencyMap = this.getFrequencyMap(ids);
    console.log('Frequency map:', Array.from(frequencyMap.entries()));

    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Original products:', products);

        this.products = products.map(product => {
          const count = frequencyMap.get(product.id) || 0;
          console.log(`Product ID: ${product.id}, Count: ${count}`);
          return { ...product, num: count };
        });

        console.log('Processed products:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  getFrequencyMap(ids: number[]): Map<number, number> {
    const map = new Map<number, number>();
    ids.forEach(id => {
      map.set(id, (map.get(id) || 0) + 1);
    });
    return map;
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

}
