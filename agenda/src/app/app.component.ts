import { Component } from '@angular/core';
import { AdicionaContatoComponent } from './adiciona-contato/adiciona-contato.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdicionaContatoComponent],
  template: `<app-adiciona-contato />`
})
export class AppComponent {}