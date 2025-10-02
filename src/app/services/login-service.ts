import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

// A service is injectable by nature
// because of the @Injectable decorator
// provided in root means that this service
// is a singleton and can be injected anywhere
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  router = inject(Router);

  // Using Angular Signals to manage login state
  private token = signal<string>('');

  // Computed property to expose login state
  public isLoggedIn = computed(() => !!this.token());

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token.set(token);
    }
  }

  login() {
    this.token.set('dummy-token');
    localStorage.setItem('token', this.token());
  }

  logout() {
    this.router.navigateByUrl('');
    this.token.set('');
    localStorage.removeItem('token');
  }
}
