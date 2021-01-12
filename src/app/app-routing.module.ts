import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { FormprodutoComponent } from './produtos/formproduto/formproduto.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
/*   
  {path: 'clientes', component: ClientesComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'produtos/cadastro', component: FormprodutoComponent}
*/
  {path: "clientes", component: ClientesComponent},
  {path: "produtos", children:[
    {path: "", pathMatch: "full", component: ProdutosComponent},  
    {path: "cadastro", component: FormprodutoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
