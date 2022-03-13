import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'ap-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  pokemonDetail: any = [];
  constructor(private pokeApi: PokeapiService, private router: Router) {}

  pokeData() {
    this.pokeApi.getAllPokemon().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.pokeApi
          .getPokemonData(result.name)
          .subscribe((dataResponse: any) => {
            this.pokemonDetail.push(dataResponse);
          });
      });
    });
  }
  goPage(pokemon: any) {
    this.router.navigate(['/pokemon', pokemon.name]);
  }

  ngOnInit() {
    this.pokeData();
  }
}
