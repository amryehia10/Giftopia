import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = '66148ca8fb77c9afce6a9dd0';

    this.userService.getUserByID(userId).subscribe(
      (user: any) => {
        this.userProfile = user.data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
