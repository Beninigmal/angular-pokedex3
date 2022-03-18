import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorit-pokemons',
  templateUrl: './favorit-pokemons.component.html',
  styleUrls: ['./favorit-pokemons.component.scss'],
})
export class FavoritPokemonsComponent implements OnInit {
  localData = JSON.parse(<any>localStorage.getItem('@favorits'));
  constructor(private router: Router) {}

  goPage(pokemon: any) {
    this.router.navigate(['/pokemon', pokemon.name]);
  }

  ngOnInit() {
    console.log(this.localData.favorite);
  }
}
