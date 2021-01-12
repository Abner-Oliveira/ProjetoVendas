import { Inject, Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { ProdutosComponent } from './produtos.component';

interface ProdutoStruct {
  produto: string;
  categoria: string;
  valor: number;
  fornecedor: string;
  quantidade: number;
}

@Injectable(
    {
    providedIn:"root"
    }
)

export class ListProdutos implements ProdutoStruct {
  public aProdutos: Array<ProdutoStruct> = []
  produto:string
  categoria:string
  valor:number
  fornecedor:string
  quantidade:number
  
  constructor(
    // Se for passado algo dentro do construtor, o angular vai entender que não será um atributo e sim uma nova classe que deverá ser injetada (Devido ter o @Injectable no componente produtos.services.ts)
    ){}
/*
  ngOnInit() {
    this.cargaProdutos()
    this.getProdutos()
  }
*/
  getColumns(): Array<PoTableColumn> {
    
    return [
          { label: 'Nome do Produto', property: 'produto'},
          { label: 'Categoria', property: 'categoria'},
          { label: 'Valor unitário', property: 'valor', type: 'currency', format: 'BRL'},
          { label: 'Nome do Fornecedor', property: 'fornecedor'},
          { label: 'Quantidade em estoque', property: 'quantidade', type: 'number', format: '1.0-0'}
            ];
  }

  public setProdutos(produto: string, categoria: string, valor: number, fornecedor: string, quantidade: number){
    let Produto = new ListProdutos();

    Produto.produto = produto
    Produto.categoria = categoria
    Produto.valor = valor
    Produto.fornecedor = fornecedor
    Produto.quantidade = quantidade

    this.aProdutos.push(Produto)

/*
    this.produto = produto
    this.categoria = categoria
    this.valor = valor
    this.fornecedor = fornecedor
    this.quantidade = quantidade
 */ 
  }

  public getProdutos() {
    return this.aProdutos
  }

  public cargaProdutos() {
  //  let produto = new ListProdutos();
    if (this.aProdutos.length == 0){
      this.setProdutos('Tênis'   , 'Calçados'  , 450.23, 'Nike'          , 30)
      this.setProdutos('Camiseta', 'Roupa'     , 120.75, 'Tommy Hilfiger', 30)
      this.setProdutos('Relógio' , 'Acessórios', 1050  , 'Tommy Hilfiger', 1200)
    }
/*
    produto.produto = 'Tênis'
    produto.categoria= 'Calçados'
    produto.valor = 450.23
    produto.fornecedor = 'Nike'
    produto.quantidade = 30
    this.aProdutos.push(produto)

    produto = new ListProdutos();
    produto.produto ='Camiseta'
    produto.categoria = 'Roupa'
    produto.valor = 120.75
    produto.fornecedor = 'Tommy Hilfiger'
    produto.quantidade = 30
    this.aProdutos.push(produto)

    produto = new ListProdutos();
    produto.produto = 'Relógio'
    produto.categoria = 'Acessórios'
    produto.valor = 1050
    produto.fornecedor = 'Tommy Hilfiger'
    produto.quantidade = 1200
    this.aProdutos.push(produto)
*/
    return
  }
}