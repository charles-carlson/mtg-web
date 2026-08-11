import { Component, ElementRef, model, viewChild } from '@angular/core';
import { SortBy } from '../gen/cards_pb';

const SORT_OPTIONS = [
  { value: SortBy.NAME_ASC, label: 'Name A–Z' },
  { value: SortBy.NAME_DESC, label: 'Name Z–A' },
  { value: SortBy.PRICE_ASC, label: 'Price: Low to High' },
  { value: SortBy.PRICE_DESC, label: 'Price: High to Low' },
] as const;

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort-dropdown.html',
  styleUrl: './sort-dropdown.css',
})
export class SortDropdown {
  private readonly drawer = viewChild.required<ElementRef<HTMLDialogElement>>('drawer');

  protected readonly options = SORT_OPTIONS;

  readonly selected = model<SortBy>(SortBy.SORT_UNSPECIFIED);

  open() {
    this.drawer().nativeElement.showModal();
  }
  close() {
    this.drawer().nativeElement.close();
  }
  select(value: SortBy) {
    this.selected.set(value);
    this.close();
  }
}
