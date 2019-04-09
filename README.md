# MywebsitePortfolio

Angular application divide into several features modules. 
Main functionality: 2 games in 1 (tic-tac-toe + 4 in row). Other modules are not currently being developed, but they are there, to show complex and easy to expand, architecture of app. 

Interesting elements:
- good practice in application architecture:
	- divide into modules, 
	- lazy loading strategy for features modules,
	- shared module with global range elements,	
	- routing module for feature module,
- dynamic styles sheets loading with lazy modules (attaching-style-sheets.service.ts),
- module range style sheet,
- sessionStorage,
- Angular animations,
- directive,
- different sizes of the board,
- dynamic information popup (based on current game settings),
- basic use of canvas,
- generics functions,
- child routes,
- router guard: canActivate, canActivateChild to detect sessionStorage availability in client browser,
- RxJS,
- JSON.

Previous Git history won't be published.

Any feedback is welcome.

## Automatic informations:
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
