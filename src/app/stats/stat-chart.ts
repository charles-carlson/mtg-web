import { Component, input, output, computed } from '@angular/core';
// distribution-chart.ts
export interface DistributionBar {
  label: string;
  value: number;
  color: string; // resolved by the caller — single hue for rarity/type, WUBRG hue for color
}

@Component({
  selector: 'app-distribution-chart',
  templateUrl: './stat-chart.html',
  styleUrl: './stat-chart.css',
})
export class DistributionChart {
  readonly title = input.required<string>();
  readonly bars = input.required<DistributionBar[]>();
  readonly showLegend = input(false); // WUBRG needs it; single-hue rarity/type don't
  readonly clickable = input(false); // only type_dist sets this true
  readonly barClick = output<DistributionBar>(); // type_dist listens, drives the subtype drill-down

  readonly maxValue = computed(() => Math.max(...this.bars().map((b) => b.value), 1));
  pct(v: number) {
    return Math.round((v / this.maxValue()) * 100);
  }
}
