import { Component, inject, resource, computed, signal } from '@angular/core';
import { StatService } from '../core/stats.service';
import { StatTile } from './stat-tile';
import { CardItem } from '../cards/card-item';
import { DistributionBar, DistributionChart } from './stat-chart';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.css',
  imports: [StatTile, CardItem, DistributionChart],
})
export class Stats {
  private readonly statsService = inject(StatService);

  readonly setResource = resource({
    loader: async () => {
      return await this.statsService.getStatInfo();
    },
  });

  // rarity_dist — single hue, fixed order, no legend, not clickable
  readonly rarityBars = computed<DistributionBar[]>(() => {
    const d = this.setResource.value()?.rarityDist;
    if (!d) return [];
    return [
      { label: 'Common', value: d.common, color: 'rarity-1' },
      { label: 'Uncommon', value: d.uncommon, color: 'rarity-2' },
      { label: 'Rare', value: d.rare, color: 'rarity-3' },
      { label: 'Mythic', value: d.mythic, color: 'rarity-4' },
    ];
  });

  // color_dist — WUBRG identity hues + legend
  colorBars = computed<DistributionBar[]>(() => {
    const d = this.setResource.value()?.colorDist;
    if (!d) return [];
    return [
      { label: 'White', value: d.white, color: 'hue-1' },
      { label: 'Blue', value: d.blue, color: 'hue-2' },
      { label: 'Black', value: d.black, color: 'hue-3' },
      { label: 'Red', value: d.red, color: 'hue-4' },
      { label: 'Green', value: d.green, color: 'hue-5' },
      { label: 'Colorless', value: d.colorless, color: 'hue-6' },
    ];
  });

  // type_dist — single hue, clickable → drives subtype_dist drill-down
  typeBars = computed<DistributionBar[]>(() =>
    Object.entries(this.setResource.value()?.typeDist ?? {}).map(([label, value]) => ({
      label,
      value,
      color: 'type-hue',
    })),
  );
  selectedType = signal<string | null>(null);
  onTypeClick(bar: DistributionBar) {
    this.selectedType.set(bar.label);
  }
  subtypeBars = computed<DistributionBar[]>(() => {
    const type = this.selectedType();
    const dist = type ? this.setResource.value()?.subtypeDist[type]?.counts : undefined;
    return Object.entries(dist ?? {}).map(([label, value]) => ({
      label,
      value,
      color: 'type-hue',
    }));
  });
}
