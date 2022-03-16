import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonListService } from '../pokemon-list.service';

@Component({
  selector: 'ap-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonData: any = [];
  pokemonName: string = '';

  constructor(
    private pokeApi: PokemonListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      this.pokemonName = param.name;
    });

    this.pokeApi.getDetails(this.pokemonName).subscribe((poke) => {
      this.pokemonData.push(poke);
    });
  }
}
