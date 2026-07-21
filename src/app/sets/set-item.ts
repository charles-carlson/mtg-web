import { Component, computed, input } from '@angular/core';
import { SetCompletion } from '../gen/cards_pb';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.html',
  styleUrl: './set-item.css',
  imports: [NgOptimizedImage],
})
export class SetItem {
  readonly set = input.required<SetCompletion>();
  // completion percentage; total can be 0 (printed_size unknown) — guard the divide
  readonly pct = computed(() => {
    const s = this.set();
    return s.total > 0 ? Math.round((s.owned / s.total) * 100) : 0;
  });
}
