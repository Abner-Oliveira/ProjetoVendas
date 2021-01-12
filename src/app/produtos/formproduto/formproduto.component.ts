import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoDecimalComponent, PoInputComponent } from '@po-ui/ng-components';
import { ListProdutos} from '../produtos.service'

@Component({
  selector: 'app-formproduto',
  templateUrl: './formproduto.component.html',
  styleUrls: ['./formproduto.component.css']
})
export class FormprodutoComponent implements OnInit {
  aProduto = new ListProdutos()
  cNomeProduto: string
  nValorUnitario: number
  
  @ViewChild("txtNomeProduto") txtNomeProduto: PoInputComponent;
  @ViewChild("nmbVlrUnitario") nmbVlrUnitario: PoDecimalComponent;
  
  constructor(
    private listaprodutos: ListProdutos,
    private router: Router
    ) {}

  ngOnInit(): void {}

  insereProduto(){
    if (this.aProduto.produto.length > 0
        || this.aProduto.categoria.length > 0
        || this.aProduto.valor > 0
        || this.aProduto.fornecedor.length > 0
        || this.aProduto.quantidade > 0 )
          {
            this.listaprodutos.setProdutos(this.aProduto.produto,
                                          this.aProduto.categoria,
                                          this.aProduto.valor,
                                          this.aProduto.fornecedor,
                                          this.aProduto.quantidade)
          }
  this.router.navigate(["produtos"]);
  }

  retornaProduto(){
    this.router.navigate(["produtos"]);
  }

  GetDadosProduto(valorDigitado: any, IDCampo){
    if (IDCampo == "Nome do produto"){
      this.aProduto.produto = valorDigitado
    }
    else if (IDCampo == "Categoria do produto"){
      this.aProduto.categoria = valorDigitado
    }
    else if (IDCampo == "Nome do fornecedor"){
      this.aProduto.fornecedor = valorDigitado
    }
    else if (IDCampo == "Valor unitario"){
      this.aProduto.valor = parseFloat(valorDigitado.replace(",","."))
    }
    else if (IDCampo == "Quantidade em estoque"){
      this.aProduto.quantidade = parseInt(valorDigitado)
    }
  }
}