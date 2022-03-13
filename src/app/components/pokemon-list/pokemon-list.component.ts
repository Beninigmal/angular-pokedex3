import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'ap-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any = [];

  constructor(private pokeApi: PokeapiService) {}

  getAllPokemon() {
    this.pokeApi.getAllPokemon().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.pokeApi
          .getPokemonData(result.name)
          .subscribe((dataResponse: any) => {
            this.pokemons.push(dataResponse);
            console.log('list', this.pokemons);
          });
      });
    });
  }

  ngOnInit(): void {
    this.getAllPokemon();
  }
}
