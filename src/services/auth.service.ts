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

  async getUserDetails() {
    const { data, error } = await this.http.get(
      `${apiEndpoint}/auth/userDetails`
    );
    return { data, error };
  }

  getCurrentToken() {
    return localStorage.getItem('token');
  }

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
    const { data, error, errorRes } = await this.http.post(
      `${apiEndpoint}/auth/register`,
      userformData
    );

    if (data && data['token']) {
      localStorage.setItem('token', data['token']!);
    }
    return { data, error };
  }

  async update(user: any, id: string = '') {
    console.log(user);

    const userformData = new FormData();
    for (let attr in user) {
      if (attr == 'profileImage' && user[attr] instanceof File) {
        userformData.append(
          'profileImage',
          user?.profileImage,
          user?.profileImage?.name
        );
      } else userformData.append(attr, JSON.stringify(user[attr]));
    }
    const { data, error } = await this.http.put(
      `${apiEndpoint}/auth/user/${id ? id : user._id}`,
      userformData
    );
    if (data && data['token']) {
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
