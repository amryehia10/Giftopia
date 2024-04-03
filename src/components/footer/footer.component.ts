import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryModel } from '../../models/category.model';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [CategoryService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  Categories: CategoryModel[] = [];
  constructor(private service: CategoryService) { }
  ngOnInit(): void {
    this.service
      .getAllCategories()
      .subscribe({
        next: (data) => (this.Categories = GeneralMethods.CastCategories(data)),
        error: (error) => console.log(error)
      });
      console.log(this.Categories)
  }
}
