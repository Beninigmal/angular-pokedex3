import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MaterialModule } from 'src/app/module/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent,
    PokemonDetailComponent,
  ],
  imports: [CommonModule, MatNativeDateModule, MaterialModule],
  exports: [PokemonListComponent, PokemonCardComponent, PokemonDetailComponent],
})
export class PokemonListModule {}
