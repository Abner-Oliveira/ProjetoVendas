import { Component, OnInit, ViewChild } from '@angular/core';
import { ListProdutos } from './produtos.service';
import { PoTableAction, PoTableColumn, PoModalComponent } from '@po-ui/ng-components';
import { PoDialogAlertLiterals, PoDialogConfirmLiterals, PoDialogService } from '@po-ui/ng-components';  //Modal do botão Excluir

interface CamposGrid{
  produto: string;
  categoria: string;
  valor: number;
  fornecedor: string;
  quantidade: string;
}

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  providers: [ProdutosComponent]
})

export class ProdutosComponent implements OnInit {
  aColumns: Array<PoTableColumn> = this.listprodutos.getColumns();
  aItems: Array<CamposGrid> = this.listprodutos.getItems();
  action: string;
  actionOptions: Array<string>;
  dialogMethod: string;
  help: string;
  literals: string;
  literalsAlert: PoDialogAlertLiterals;
  literalsConfirm: PoDialogConfirmLiterals;
  message: string;
  title: string;
  actions: Array<PoTableAction> = [
    {
      action: this.edit.bind(this),
      icon: 'po-icon-edit', 
      label: 'Editar'
    },
    {
      action: this.delete.bind(this),
      icon: 'po-icon-delete', 
      label: 'Excluir'
    }
  ]

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
//  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(
    private listprodutos: ListProdutos,
    private poAlert: PoDialogService //Modal do botão Excluir
  ) { }

  ngOnInit() {
    this.aColumns = this.listprodutos.getColumns();
    this.aItems = this.listprodutos.getItems();
    this.restore();
  }

  onClick() {
      alert(this.actions);
  }

  edit(item) {
    let produto = item.produto;
    let totalproduto = item.quantidade * item.valor;

    alert("Produto: " + produto + ". Quantidade total do produto " + totalproduto);
    //this.poModal.open();
  }

  delete(item) {
    let posicaolinha = this.aItems.indexOf(item);
    this.openDialog(posicaolinha); //Modal do botão Excluir
  }

  alertDialog() {
    this.poAlert.alert({
      literals: this.literalsAlert,
      title: this.title,
      message: this.message,
      ok: () => (this.actionOptions.includes('ok') ? (this.action = 'OK') : undefined)
    });
  }
  
  confirmDialog(posicaolinha) {
    this.poAlert.confirm({
      literals: this.literalsConfirm,
      title: this.title,
      message: this.message,
      confirm: () => (this.aItems.splice(posicaolinha, 1)),
      cancel: () => (this.actionOptions.includes('cancel') ? (this.action = 'Cancel') : undefined)
    });
  }

  openDialog(posicaolinha) {
    this.action = '';
    this.dialogMethod === 'alert' ? this.alertDialog() : this.confirmDialog(posicaolinha);
  }

  restore() {
    this.action = undefined;
    this.actionOptions = [];
    this.title = 'Excluir';
    this.message = 'Você tem certeza que deseja excluir o produto selecionado?';
    this.dialogMethod = undefined;
    this.literals = undefined;
    this.literalsAlert = undefined;
    this.literalsConfirm = undefined;
    this.help = '';
  }
}