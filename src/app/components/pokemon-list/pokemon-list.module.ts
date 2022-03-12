import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MaterialModule } from 'src/app/module/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent

  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialModule,

  ],
  exports: [
    PokemonListComponent,
    PokemonCardComponent,


  ]
})
export class PokemonListModule { }
