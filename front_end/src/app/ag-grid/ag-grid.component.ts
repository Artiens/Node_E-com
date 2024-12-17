import { ProductService } from '../service/product.service';
import { AgGridModule } from 'ag-grid-angular';
import {CommonModule} from '@angular/common';
import {Product} from '../models/products.models';
import {Component, OnInit} from '@angular/core';
import type {ColDef, GridApi, GridReadyEvent} from 'ag-grid-community'; // Column Definition Type Interface
import { ICellRendererParams } from 'ag-grid-community';


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
        style="height: 480px;"
        [rowData]="products"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [animateRows]="true"
        [pagination]="true"
        (gridReady)="onGridReady($event)"
      >
      </ag-grid-angular>

      <button (click)="onBtExport()">Export CSV</button>

     <!-- This will print the products in the view to confirm data binding -->
  `,
})



export class ProductGridComponent implements OnInit{

  private gridApi!: GridApi<Product>;

  products: Product[] =[];
  columnDefs: ColDef<Product>[] = [
    { valueGetter: p => p.data?.id, headerName: 'ID', sortable: true, filter: true },
    { valueGetter: p => p.data?.name, headerName: 'Name', sortable: true, filter: true },
    { valueGetter: p => p.data?.price, headerName: 'Price ($)', sortable: true, filter: true },
    {
      field: 'imageUrl',
      headerName: 'Image URL',
      cellRenderer: (params: ICellRendererParams) => {
        // Use a custom cellRenderer to show images
        return `<img ngSrc="${params.value}" width="100" height="100"  alt=""/>`;
      }
    },
    { valueGetter: p => p.data?.num, headerName: 'Sells', sortable: true, filter: true },  // Added Sells column
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };
  productIds: number[] = [1, 3, 3, 3, 5, 5, 1];  // Example list of product IDs

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch products based on the list of product IDs
    this.fetchProductsByIds(this.productIds);
  }

  fetchProductsByIds(ids: number[]): void {
    // Create a frequency map of the product IDs
    const frequencyMap = this.getFrequencyMap(ids);

    // Subscribe to the products observable to get the products
    this.productService.getProducts().subscribe(products => {
      console.log('Fetched products:', products);  // Log the fetched products

      // Map over the products and add the count to each product
      const productsWithCount = products.map(product => {
        const count = frequencyMap.get(product.id) || 0;  // Get the count from the map, default to 0 if not found
        return { ...product, number: count };  // Add the 'number' field to each product
      });

      console.log('Processed products with count:', productsWithCount);  // Log the processed products

      // Assign the processed products to the products array
      this.products = productsWithCount;

      // Check if the products array is populated correctly
      console.log('Products array for ag-Grid:', this.products);
    });
  }

  getFrequencyMap(ids: number[]): Map<number, number> {
    const map = new Map<number, number>();
    ids.forEach(id => {
      map.set(id, (map.get(id) || 0) + 1);  // Increment the count for each ID
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
