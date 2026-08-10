import { Component, input, computed, signal } from '@angular/core';
@Component({
  selector: 'app-stat-tile',
  templateUrl: './stat-tile.html',
  styleUrl: './stat-tile.css',
})
export class StatTile {
  readonly total = input.required<number>();
  readonly today = signal(new Date());
  readonly header = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.total()),
  );
  readonly numericDate = computed(() => {
    return this.today().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  });
}
