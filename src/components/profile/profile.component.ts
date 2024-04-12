import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BaseService } from '../../services/Base.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent extends BaseService implements OnInit{
  userProfile: any;
  protected img_URL: string = ''
  constructor(private userService: UserService, private authService: AuthService, http: HttpClient) { 
    super(http);
  }
  ngOnInit(): void {
    const id = String(this.authService.getCurrentUser()?._id);
    this.userService.getUserByID(id).subscribe({
      next: (user: any) => {
        this.userProfile = user.data;
        this.img_URL = this.BASE_URL + '/' + this.userProfile.image
      },
      error:(error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }
}
