import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Produtos', link: 'produtos', icon: 'po-icon-pushcart' , shortLabel: "Produtos"/*,action: this.onClick.bind(this)*/ },
    { label: 'Clientes', link: 'clientes', icon: 'po-icon-clipboard', shortLabel: "Clientes" }
  ];

  private onClick() {
    alert('Teste de Commit')
  }
}
