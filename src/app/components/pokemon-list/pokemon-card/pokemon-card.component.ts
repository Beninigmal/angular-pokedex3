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
  page: number = 1;
  totalPokemon: number = 0;
  favoritePokemons: any = [];
  isFavorite: boolean = false;

  uniquePokemon: any = [];
  favoriteUniquePokemons: any = new Set();

  constructor(private pokeApi: PokeapiService, private router: Router) {}

  pokeData() {
    this.pokeApi.getAllPokemon(10, this.page + 0).subscribe((response: any) => {
      this.totalPokemon = response.count;
      response.results.forEach((result: any) => {
        this.pokeApi
          .getPokemonData(result.name)
          .subscribe((dataResponse: any) => {
            this.pokemonDetail.push(this.checkFavorite(dataResponse));
          });
      });
    });
  }
  goPage(pokemon: any) {
    this.router.navigate(['/pokemon', pokemon.name]);
  }

  //Checa se é favorito e muda a estrela
  checkFavorite(pokemon: any) {
    let pokeFilter = [];
    var pokemonStorage: any = localStorage.getItem('@favorits');
    pokemonStorage = JSON.parse(pokemonStorage);

    if (pokemonStorage) {
      pokeFilter = pokemonStorage.filter((value: any) => {
        return value.id === pokemon.id;
      });
    }
    if (pokeFilter.length > 0) {
      pokemon.favorite = true;
      pokemon.favoriteLabel = 'star';
      return pokemon;
    }

    pokemon.favorite = false;
    pokemon.favoriteLabel = 'star_border';
    return pokemon;
  }
  //Remove valores repetidos
  keepUniquePokemonFavorite() {
    this.favoritePokemons.forEach((favorite: number) => {
      this.favoriteUniquePokemons.add(favorite);
      this.uniquePokemon = [...this.favoriteUniquePokemons.values()];
    });
  }
  //Adiciona no LocalStorage
  addFavoriteLocal(pokemon: any) {
    var pokemonStorage: any = localStorage.getItem('@favorits');
    let pokeArr = [];

    if (pokemonStorage) {
      pokeArr = JSON.parse(pokemonStorage);
    }
    pokemon.favorite = true;
    pokemon.favoriteLabel = 'star';

    pokeArr.push(pokemon);

    const existPokemon = pokeArr.includes(pokemon.id);

    if (existPokemon) return;

    localStorage.setItem('@favorits', JSON.stringify(pokeArr));
  }

  removeFavoriteLocal(pokemon: any) {
    //verificar se o pokemon existe
    var pokemonStorage: any = localStorage.getItem('@favorits');
    let pokeArr = [];

    if (pokemonStorage) {
      pokeArr = JSON.parse(pokemonStorage);
    }
    pokemon.favorite = false;
    pokemon.favoriteLabel = 'star_border';

    const filteredPokemon = pokeArr.filter((favorite: any) => {
      return pokemon.id !== favorite.id;
    });

    localStorage.setItem('@favorits', JSON.stringify(filteredPokemon));
  }
  //Função principal
  setFavorite(pokemon: any) {
    if (pokemon.favorite === false) {
      this.addFavoriteLocal(pokemon);
    } else {
      this.removeFavoriteLocal(pokemon);
    }
  }

  ngOnInit() {
    this.pokeData();
  }
}
