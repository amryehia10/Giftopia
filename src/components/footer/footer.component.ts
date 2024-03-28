import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers:[CategoryService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  Categories:any;
  constructor(private service:CategoryService){}
  ngOnInit(): void {
    this.service.getCategory().subscribe({next:(data)=>this.Categories = data});
  }

}
