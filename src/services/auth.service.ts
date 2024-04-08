import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { apiEndpoint } from '../config.json';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  async login(email: string, password: string) {
    const { data, error } = await this.http.post(`${apiEndpoint}/auth/login`, {
      email,
      password,
    });
    if (error) {
      console.log(error);
    } else if (data) {
      localStorage.setItem('token', data['token']!);
    }
    return { data, error };
  }

  // add logout
  logout() {
    localStorage.removeItem('token');
  }

  // Register
  async register(user: any) {
    const userformData = new FormData();
    for (let attr in user) {
      if (attr == 'profileImage') {
        userformData.append(
          'profileImage',
          user.profileImage,
          user.profileImage.name
        );
      } else userformData.append(attr, JSON.stringify(user[attr]));
    }
    const { data, error } = await this.http.post(
      `${apiEndpoint}/auth/register`,
      userformData
    );
    if (data) {
      localStorage.setItem('token', data['token']!);
    }
    return { data, error };
  }

  getCurrentUser(): User {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const user = jwtDecode<User>(token);
    return user;
  }
}
