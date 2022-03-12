import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritPokemonsComponent } from './components/favorit-pokemons/favorit-pokemons.component';
import { PokemonDetailComponent } from './components/pokemon-list/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'favoritos', component: FavoritPokemonsComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
