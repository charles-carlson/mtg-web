import { Component, inject, resource } from '@angular/core';
import { SetService } from '../core/sets.service';
import { SetItem } from './set-item';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.html',
  styleUrl: './sets.css',
  imports: [SetItem],
})
export class Sets {
  private readonly setService = inject(SetService);
  readonly setResource = resource({
    loader: async () => {
      return (await this.setService.getSetInfo()).sets;
    },
  });
}
