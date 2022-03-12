import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'ap-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any = [];

  @Output() pokeData = new EventEmitter<any>();

  constructor(private pokeApi: PokeapiService) {}

  getAllPokemon() {
    this.pokeApi.getAllPokemon().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.pokeApi
          .getPokemonData(result.name)
          .subscribe((dataResponse: any) => {
            this.pokemons.push({ dataResponse, cols: 1, rows: 1 });
            console.log(this.pokemons);
          });
      });
    });
  }

  ngOnInit(): void {
    this.getAllPokemon();
  }
}
