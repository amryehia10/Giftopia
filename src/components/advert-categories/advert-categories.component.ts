import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-advert-categories',
  standalone: true,
  imports: [HttpClientModule,CommonModule, RouterModule],
  providers:[CategoryService],
  templateUrl: './advert-categories.component.html',
  styleUrl: './advert-categories.component.css'
})
export class AdvertCategoriesComponent implements OnInit{
  categories: any;
  category1:any;
  category2:any;
  category3:any;
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next:(data)=>{
        this.categories=data;
        console.log(data);
        this.category1=this.categories[0];
        this.category2=this.categories[1];
        this.category3=this.categories[2];
      },
      error:(e)=>{console.log(e)}
    });
  }
}