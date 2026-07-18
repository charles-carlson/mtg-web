import {
  Component,
  ElementRef,
  computed,
  inject,
  output,
  signal,
  viewChild,
  type WritableSignal,
} from '@angular/core';
import { CardsService } from '../core/cards.service';

const COLORS = [
  { code: 'W', label: 'White' },
  { code: 'U', label: 'Blue' },
  { code: 'B', label: 'Black' },
  { code: 'R', label: 'Red' },
  { code: 'G', label: 'Green' },
] as const;

const RARITIES = [
  { value: 'common', label: 'Common' },
  { value: 'uncommon', label: 'Uncommon' },
  { value: 'rare', label: 'Rare' },
  { value: 'mythic', label: 'Mythic' },
] as const;

const PAGESIZES = [25, 50, 75, 100];

export interface CardFilter {
  set: string;
  colors: string[];
  rarity: string[];
  pageSize: number;
}

@Component({
  selector: 'app-card-filter-dropdown',
  templateUrl: './card-filter-dropdown.html',
  styleUrl: './card-filter-dropdown.css',
})
export class CardFilterDropDown {
  private readonly cardSvc = inject(CardsService);
  private readonly drawer = viewChild.required<ElementRef<HTMLDialogElement>>('drawer');

  protected readonly colors = COLORS;
  protected readonly rarities = RARITIES;
  protected readonly pageSizes = PAGESIZES;
  sets = signal<string[]>([]);
  query = signal('');
  filteredSets = computed(() => {
    const q = this.query().toUpperCase();
    return this.sets().filter((s) => s.startsWith(q));
  });
  selectedColors = signal<string[]>([]);
  selectedRarities = signal<string[]>([]);
  selectedSet = signal<string>('');
  selectedPageSize = signal<number>(50);
  activeCount = computed(
    () =>
      this.selectedColors().length + this.selectedRarities().length + (this.selectedSet() ? 1 : 0),
  );

  readonly apply = output<CardFilter>();

  constructor() {
    this.cardSvc.listSets().then((res) => this.sets.set(res.sets));
  }

  open() {
    this.drawer().nativeElement.showModal();
  }
  close() {
    this.drawer().nativeElement.close();
  }

  private toggle(sig: WritableSignal<string[]>, value: string) {
    sig.update((cur) => (cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]));
  }
  toggleColor(c: string) {
    this.toggle(this.selectedColors, c);
  }
  toggleRarity(r: string) {
    this.toggle(this.selectedRarities, r);
  }
  selectSet(s: string) {
    this.selectedSet.set(s);
  }
  selectPageSize(p: number) {
    this.selectedPageSize.set(p);
  }

  clearAll() {
    this.selectedColors.set([]);
    this.selectedRarities.set([]);
    this.selectedSet.set('');
    this.selectedPageSize.set(50);
  }

  onApply() {
    this.apply.emit({
      set: this.selectedSet(),
      colors: this.selectedColors(),
      rarity: this.selectedRarities(),
      pageSize: this.selectedPageSize(),
    });
    this.close();
  }
}
