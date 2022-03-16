import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'ap-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any = [];
  page: number = 1;
  totalPokemon: number = 0;

  constructor(private pokeApi: PokeapiService) {}

  getAllPokemon() {
    this.pokeApi.getAllPokemon(10, this.page + 0).subscribe((response: any) => {
      this.totalPokemon = response.count;
      response.results.forEach((result: any) => {
        this.pokeApi
          .getPokemonData(result.name)
          .subscribe((dataResponse: any) => {
            this.pokemons.push(dataResponse);
          });
      });
    });
  }

  ngOnInit(): void {
    this.getAllPokemon();
  }
}
