import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent implements OnInit {
  currentDate = new Date();
  constructor(private orderService: OrderService, private authService: AuthService){
    this.currentDate.setDate(this.currentDate.getDate() + 3);
  }

  userId: string = String(this.authService.getCurrentUser()?._id);
  userOrders: any;
  ngOnInit(): void {
    
    this.orderService.getUserOrders(this.userId).subscribe({
      next: (data) => {
        this.userOrders = data.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
