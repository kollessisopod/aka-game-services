import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string | null = null; // Kullanıcı adını tutmak için
  private id: number | null = null;       // Kullanıcı ID'sini tutmak için

  constructor() {}

  // ID bilgisini kaydetme
  setId(id: number): void {
    this.id = id;
  }

  // ID bilgisini alma
  getId(): number | null {
    return this.id;
  }

  // Kullanıcı adını kaydetme
  setUser(username: string): void {
    this.username = username;
  }

  // Kullanıcı adını alma
  getUser(): string | null {
    return this.username;
  }
}
