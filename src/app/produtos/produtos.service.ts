import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable(
    {
    providedIn:"root"
    }
)

export class ListProdutos {

  getColumns(): Array<PoTableColumn> {
    return [
        { label: 'Nome do Produto', property: 'produto'},
        { label: 'Categoria', property: 'categoria'},
        { label: 'Valor unitário', property: 'valor', type: 'currency', format: 'BRL'},
        { label: 'Nome do Fornecedor', property: 'fornecedor'},
        { label: 'Quantidade em estoque', property: 'quantidade', type: 'number', format: '1.0-0'}
            ];
            }

  getItems() {
    //let aItems:Array<string|string|number|string|string>;

    return[
      {
        produto: 'Tênis',
        categoria: 'Calçados',
        valor: 450.23,
        fornecedor: 'Nike',
        quantidade: '20'
      },
      {
        produto: 'Camiseta',
        categoria: 'Roupa',
        valor: 120.75,
        fornecedor: 'Tommy Hilfiger',
        quantidade: '30'
      },
      {
        produto: 'Relógio',
        categoria: 'Acessórios',
        valor: 1050,
        fornecedor: 'Tommy Hilfiger',
        quantidade: '1200'
      }     

    ];
  }
}