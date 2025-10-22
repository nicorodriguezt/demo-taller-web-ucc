// src/app/shop-bad.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoReduxService } from './no-redux.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-bad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bar">
      <h3>Store (anti-patrones)</h3>
      <div class="right">
        <span class="badge">Cart (local): {{ localCartCount }}</span>
      </div>
    </header>

    <section *ngIf="loading">Cargando productos…</section>
    <section *ngIf="error" class="err">Error: {{ error }}</section>

    <div class="grid" *ngIf="products.length">
      <article class="card" *ngFor="let p of products">
        <div class="title">{{ p.title }}</div>
        <div class="row">
          <button style="background-color: grey;" (click)="add(p.id, p.title)">Add</button>
          <button style="background-color: grey;" class="ghost" (click)="remove(p.id)">Remove</button>
        </div>
      </article>
    </div>
  `,
  styles: [`
    .bar{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #eee}
    .right{display:flex;gap:8px;align-items:center}
    .badge{background:#d81b60;color:#fff;padding:2px 8px;border-radius:999px;font-weight:600}
    .grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));margin-top:12px}
    .card{border:1px solid #e6e6e6;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px}
    .title{font-weight:600;line-height:1.2}
    .row{display:flex;gap:8px}
    button{padding:6px 10px;border-radius:8px;border:1px solid #ddd;background:#fff;cursor:pointer}
    button:hover{background:#f7f7f7}
    .ghost{background:#fafafa}
    .err{color:crimson;margin:8px 0}
    .hint{opacity:.8;margin-top:12px;font-size:.9rem}
  `]
})
export class NoReduxComponent implements OnInit {
  private svc = inject(NoReduxService);

  // ❌ Estado duplicado en el componente (se puede “desincronizar”)
  products: { id: number; title: string }[] = [];
  loading = false;
  error?: string;
  localCartCount = 0;   // ← contador "local" que intentamos mantener a mano

  // ❌ Suscripción manual (si olvidás OnDestroy → fuga)
  private sub?: Subscription;

  ngOnInit() {
    // Dispara carga cada vez que se monta (duplica requests si navegás de ida/vuelta)
    this.svc.loadProducts();

    // ❌ Nos suscribimos “a mano” (potencial fuga si no desuscribimos)
    this.sub = this.svc.state$.subscribe(s => {
      this.products = s.products;
      this.loading = s.loading;
      this.error = s.error;

      // ❌ Calculamos el contador local “a ojo” leyendo el estado cada vez:
      //    si hay condiciones de carrera, puede quedarse atrasado respecto al real.
      const realCount = s.cart.reduce((acc, i) => acc + i.qty, 0);

      // Simulamos un bug de sincronización: a veces demoramos el update del local
      if (Math.random() < 0.3) {
        setTimeout(() => (this.localCartCount = realCount), 120); // llega tarde
      } else {
        this.localCartCount = realCount;
      }
    });
  }

  // ❌ Si no implementás ngOnDestroy → memoria filtrada (mantiene la subs activa)
  // ngOnDestroy() { this.sub?.unsubscribe(); }

  reload() { this.svc.loadProducts(); } // ← cada click pega de nuevo (sin cache)
  add(id: number, title: string) { this.svc.addToCart(id, title); }
  remove(id: number) { this.svc.removeFromCart(id); }
}
