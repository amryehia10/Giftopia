import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-advert-categories',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [CategoryService],
  templateUrl: './advert-categories.component.html',
  styleUrl: './advert-categories.component.css'
})
export class AdvertCategoriesComponent implements OnInit {
  adsCategories: any;

  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => this.adsCategories = data,
      error: (e) => console.log(e),
    });
  }
}