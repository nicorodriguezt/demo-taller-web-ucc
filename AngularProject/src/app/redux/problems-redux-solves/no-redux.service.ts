// src/app/shop-bad.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Product = { id: number; title: string };
export type CartItem = { id: number; title: string; qty: number };

type State = {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  error?: string;
};

@Injectable({ providedIn: 'root' })
export class NoReduxService {
  // ❌ Estado mutable compartido
  private state: State = { products: [], cart: [], loading: false };

  // ❌ Exponemos un BehaviorSubject (cualquiera podría next() si lo exportáramos)
  private subject = new BehaviorSubject<State>(this.state);
  state$ = this.subject.asObservable();

  // ❌ No hay cache: cada call va a la red
  async loadProducts() {
    this.setState({ ...this.state, loading: true, error: undefined });
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=6');
      const data = (await res.json()) as any[];
      const products: Product[] = data.map(p => ({ id: p.id, title: p.title }));
      // Simula latencia
      await new Promise(r => setTimeout(r, 300));
      this.setState({ ...this.state, loading: false, products });
    } catch (err: any) {
      this.setState({ ...this.state, loading: false, error: String(err) });
    }
  }

  // ❌ Condición de carrera: snapshot “viejo” + setTimeout → pisadas
  addToCart(id: number, title: string) {
    const snapshot = this.state; // ← captura el estado "actual" AHORA
    // Simulamos latencia en cálculo (dos clicks rápidos usarán el MISMO snapshot)
    setTimeout(() => {
      const i = snapshot.cart.findIndex(c => c.id === id);
      const cart =
        i >= 0
          ? snapshot.cart.map(c => (c.id === id ? { ...c, qty: c.qty + 1 } : c))
          : [...snapshot.cart, { id, title, qty: 1 }];
      // ❌ Escribimos usando el snapshot viejo: el segundo click pisa al primero
      this.setState({ ...snapshot, cart });
    }, Math.random() * 250); // latencia variable para que se note el problema
  }

  // ❌ Eliminación simple sin transacciones
  removeFromCart(id: number) {
    // También propenso a pisadas si se mezcla con addToCart "lento"
    const snapshot = this.state;
    setTimeout(() => {
      this.setState({ ...snapshot, cart: snapshot.cart.filter(c => c.id !== id) });
    }, Math.random() * 200);
  }

  // ---------- Helpers “peligrosos” ----------
  private setState(next: State) {
    this.state = next;        // ❌ mutación global sin logs ni inmutabilidad real
    this.subject.next(this.state);
  }
}
