import { Component, OnInit, ViewChild } from '@angular/core';
import { ListProdutos } from './produtos.service';
//import { FormprodutoComponent } from './produtos/FormprodutoComponent.ts';
//import { FormprodutoComponent } from './produtos/formproduto/formproduto.component';
import {FormprodutoComponent} from './formproduto/formproduto.component'
import { Router, ActivatedRoute } from '@angular/router';
import { PoComboComponent, PoDisclaimer, PoInputComponent, PoMultiselectOption, PoSelectOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { PoDialogAlertLiterals, PoDialogConfirmLiterals, PoDialogService } from '@po-ui/ng-components';
export * from '../produtos/formproduto/formproduto.component'

/**
 * Estrutura de opções dos Filtros
 */
class cmbOptFiltros {
	label: string;
	value: string;

	constructor(
		label: string,
		value: string,

	) {
		this.value = value,	this.label = label;
	}
}

/**
 * Estrutura para o Disclaimer
 */
class disclaimerItemStruct implements PoDisclaimer {
	//$id: string;
	label: string;
	value: string;
	//field: string;
	//tipo: string;
}

interface CamposGrid{
  produto: string,
  categoria: string,
  valor: number,
  fornecedor: string,
  quantidade: string
}

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  providers: [ProdutosComponent]
})

export class ProdutosComponent implements OnInit {
  aColumns: Array<PoTableColumn> = this.listprodutos.getColumns()
  aItems = this.listprodutos.getProdutos()
  //aItems: Array<CamposGrid> = []
  afilteredItems: Array<any> = []
  aItemsOriginal = this.aItems
  action: string;
  actionOptions: Array<string>;
  dialogMethod: string;
  help: string;
  literals: string;
  literalsAlert: PoDialogAlertLiterals;
  literalsConfirm: PoDialogConfirmLiterals;
  message: string;
  title: string;
  //listOptCmpFilter: Array<cmbOptFiltros> = [];
  listOptFilter:Array<PoMultiselectOption> = [];
  //listOptCmpFilter: Array<any> = [{ value: 'Opção 1' }, { value: 'Opção 2' }];
  //listOptCmpFilter  = this.listprodutos.getColumns()[0].label;
  disclaimers: Array<disclaimerItemStruct> = [];
  optSelected: cmbOptFiltros;
  opcaoSelecionado: string;
  valorInputado: string;
  afiltrosDisclamer: Array<PoDisclaimer> = [];
  
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

  @ViewChild("txtFiltro") txtFiltro: PoInputComponent;
  @ViewChild("comboFiltro", { static: true })
  cmbFiltro: PoComboComponent;
  cLabelInput: string;

  constructor(
    private listprodutos: ListProdutos,
    private poAlert:      PoDialogService,
    private router:       Router,
		private route:        ActivatedRoute,

    ) { 
    //this.optSelected = new cmbOptFiltros("", "");
    //this.listOptCmpFilter.push(new cmbOptFiltros("Título", "CONCTITULO"));
    }

  ngOnInit() {
   //this.aColumns = this.listprodutos.getColumns();
    this.listprodutos.cargaProdutos();
    this.aItems = this.listprodutos.getProdutos();
    //this.afilteredItems = [...this.aItems]
    this.restore();
  }

  onClick() {
      alert(this.actions);
  }

  edit(item) {
    let produto = item.produto;
    let totalproduto = item.quantidade * item.valor;

    alert("Produto: " + produto + ". Quantidade total do produto " + totalproduto);
  }

  delete(item) {
    let posicaolinha = this.aItems.indexOf(item);
    this.openDialog(posicaolinha);
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

  addFiltro() {
    let itemDisclaimer: disclaimerItemStruct = new disclaimerItemStruct();
    
    itemDisclaimer.label = this.txtFiltro.getScreenValue();
    itemDisclaimer.value = this.txtFiltro.getScreenValue();

  }

	/**
	 * Monta a lista para o combo
	 * @param entidade - Entidade selecionada
	 */
  /*
	fillComboFilter(entidade: string) {
		this.listComboFilter = new Array<PoSelectOption>();
		if (entidade == "E2_FILIAL") {
			let arrFilial = JSON.parse(sessionStorage.getItem("PFSListUsu"));
			arrFilial.forEach((filial) => {
				let item: PoSelectOption = {
					label: filial.descricao,
					value: filial.filial,
				};

				this.listComboFilter.push(item);
			});
		}
	}
*/
  options: Array<PoSelectOption> = this.ListaValoresCombo();
  /*
  options: Array<PoMultiselectOption> = [
    { value: 'poMultiselect1', label: 'PO Multiselect 1' },
    { value: 'poMultiselect2', label: 'PO Multiselect 2' }
  ];
  */
  ListaValoresCombo(){
    let aListaFiltro: Array<PoSelectOption> = [];

    aListaFiltro.push({label: this.aColumns[0].label, value: this.aColumns[0].property})
    aListaFiltro.push({label: this.aColumns[3].label, value: this.aColumns[3].property})
    aListaFiltro.push({label: this.aColumns[4].label, value: this.aColumns[4].property})
  /*
    for (var i = 0; i < 3; i++) {
      this.listOptFilter.push({label: this.aColumns[1].label, value: this.aColumns[i].property});
      this.listOptFilter.push({label: this.aColumns[i].label, value: this.aColumns[i].property});
      this.listOptFilter.push({label: this.aColumns[i].label, value: this.aColumns[i].property});
      //if (i < 3) {this.listOptCmpFilter += ','} else {''};
    }
  */      
    return aListaFiltro
  }
	/**
	 * Atualiza a opção selecionada
	 * @param selectedValue - Campo selecionado para buscar o indice
	 */
	changeCmpFilter(selectedValue: string) {
    this.opcaoSelecionado = selectedValue
    this.cLabelInput = this.exibeLabelInput();
  }

  exibeLabelInput(){
    let aLabelInput = this.options
    
    return aLabelInput.find(linha => linha.value == this.opcaoSelecionado).label
  }

  GetValorFiltro(valorDigitado: any){
    this.valorInputado = valorDigitado
    //this.aItems = this.aItems.filter(linha => linha.produto == this.valorInputado) // Se quiser aplicar o filtro direto pelo p-change (Ao dar um tab no componente)
    if (typeof(valorDigitado) == "number"){
      valorDigitado = 0
      }
    else {
      valorDigitado = undefined
      }
  }

  filtrarTabela(){
    setTimeout(() => {
      let filter =  this.afiltrosDisclamer.find(item => item.value == this.valorInputado)
        if (this.valorInputado != "" && this.valorInputado != " " && this.valorInputado !== undefined)
          {
            if (this.opcaoSelecionado == "produto")
              this.aItems = this.aItems.filter(linha => linha.produto.indexOf(this.valorInputado) > -1)
            else if (this.opcaoSelecionado == "fornecedor")
              this.aItems = this.aItems.filter(linha => linha.fornecedor.indexOf(this.valorInputado) > -1)
            else if (this.opcaoSelecionado == "quantidade")
              this.aItems = this.aItems.filter(linha => linha.quantidade.toString().indexOf(this.valorInputado) > -1)
            if (!filter){
                filter = {property: this.opcaoSelecionado, value: this.valorInputado} // Atribui o valor para o filter caso o valor não for encontrado na inicialização
              }
            else {
                this.afiltrosDisclamer.splice(this.afiltrosDisclamer.indexOf(filter), 1) // Remove o valor antigo encontrado no array e adiciona o novo valor digitado (Substitui)
                filter = Object.assign({}, filter)
              }
              this.afiltrosDisclamer = [...this.afiltrosDisclamer, filter] // Adiciona o valor do filter no final do array (empilhando os valores)
              //this.afiltrosDisclamer.push(filter) // Adiciona o valor do filter no final do array
          }
        else (
          this.aItems = this.aItemsOriginal
        )

        this.opcaoSelecionado = undefined
        this.cmbFiltro.writeValue("")

      }, 1000)
  }

  onclear(){this.changeCmpFilter = null}
  
  changeFilters(afiltrosDisclamer: Array<PoDisclaimer>) {
    let nI = 0
    this.afilteredItems = this.aItemsOriginal
    for (nI; nI < this.afiltrosDisclamer.length; nI++) {
      this.afiltrosDisclamer.length > 0 ? this.atualizaFiltro(afiltrosDisclamer, nI) : this.resetFilters(); // condicao ? valor1 : valor2 (Se a condição for verdadeira o valor será 1, senão 2)
    }
    this.aItems = this.afilteredItems
  }

  atualizaFiltro(filters: Array<PoDisclaimer>, linha) {
    if (filters.map(item => filters.includes(item))){
      let valorFiltro = ""
      if (filters[linha].property == "produto"){
        valorFiltro = filters[filters.findIndex(linha => linha.property == "fornecedor")].value.toLowerCase()
        this.afilteredItems = this.afilteredItems.filter(linha => linha.fornecedor.toLowerCase().indexOf(valorFiltro) > -1)
      }
      else if (filters[linha].property == "fornecedor"){
        valorFiltro = filters[filters.findIndex(linha => linha.property == "fornecedor")].value.toLowerCase()
        this.afilteredItems = this.afilteredItems.filter(linha => linha.fornecedor.toLowerCase().indexOf(valorFiltro) > -1)
      }
      else if (filters[linha].property == "quantidade"){
        valorFiltro = filters[filters.findIndex(linha => linha.property == "quantidade")].value.toLowerCase()
        this.afilteredItems = this.afilteredItems.filter(linha => linha.quantidade.toLowerCase().indexOf(valorFiltro) > -1)
      }
    }
  }
 
  resetFilters() {
    this.aItems = this.aItemsOriginal
  }

  incluiProduto(){
    this.router.navigate(["/produtos/cadastro"]);
    //this.router.navigate(["/produtos/cadastro"], { relativeTo: this.route });
    //this.router.navigate(["/cadastro"], { relativeTo: this.route });
  }


}