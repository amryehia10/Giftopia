import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralMethods } from '../../functions';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-advert-categories',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [CategoryService],
  templateUrl: './advert-categories.component.html',
  styleUrl: './advert-categories.component.css'
})
export class AdvertCategoriesComponent implements OnInit {
  adsCategories: CategoryModel[] = [];

  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.adsCategories = GeneralMethods.CastCategories(data),
      error: (e) => console.log(`Error: ${e}`),
    });
  }
}