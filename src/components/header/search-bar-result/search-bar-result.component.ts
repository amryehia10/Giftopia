import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar-result',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search-bar-result.component.html',
  styleUrl: './search-bar-result.component.css'
})
export class SearchBarResultComponent {
  @Input() productsFound!: ProductModel;
  @Output() clearProducts: EventEmitter<void> = new EventEmitter<void>();
  emptyFilteredProducts() {
    this.clearProducts.emit();
  }
}
