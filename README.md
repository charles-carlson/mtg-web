# MtgWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# mtg-web

## Project Status / Milestones
- [x] Card grid backed by the MTG-GRPC service over gRPC-Web (Connect transport)
- [x] Live name search — debounced signal → `searchCards`
- [x] Filter drawer — native `<dialog>` modal; multi-select colors & rarity, single-select set with a mini-search; applies on **Apply** into a `filters` signal that drives the card resource
- [ ] Pagination UI — surface `next_page_token` (infinite scroll or pager); today only the first `pageSize: 50` results show
- [ ] Card detail modal (click a card → detail view)
- [ ] Multi-set filter (blocked on backend `repeated string sets`)
- [ ] Colorless filter (blocked on backend empty-`colors` semantics)
- [ ] Client-side filtering once the backend serves the full collection / read-model cache

## Potential Fixes / Known Issues
- **Set filter is single-select.** `SearchCardsRequest.set` is one string, so the drawer uses radios + an "All sets" default. Multi-set needs the backend proto change.
- **Colorless option removed.** Scryfall's `colors` field is `[]` for colorless cards (not `["C"]`), so a `["C"]` filter matched nothing. Re-add once the backend supports empty-array matching.
- **No pagination.** `searchCards` / `listCards` return `next_page_token`, but the grid ignores it and shows only the first page.
- **`::backdrop` styling** may not apply from the scoped component stylesheet (Angular view encapsulation); move that one rule to global `src/styles.css` if the drawer backdrop doesn't dim.
