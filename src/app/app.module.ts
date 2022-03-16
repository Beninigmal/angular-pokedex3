import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonListModule } from './components/pokemon-list/pokemon-list.module';
import { MaterialModule } from './module/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FavoritPokemonsComponent } from './components/favorit-pokemons/favorit-pokemons.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FavoritPokemonsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PokemonListModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
