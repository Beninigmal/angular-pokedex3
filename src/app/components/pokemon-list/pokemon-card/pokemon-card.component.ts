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
  favoritLabel: string = 'star_border';
  uniquePokemon: any = [];
  favoriteUniquePokemons: any = new Set();
  favorits = JSON.parse(<any>localStorage.getItem('@favorits')) || [];

  constructor(private pokeApi: PokeapiService, private router: Router) {}

  pokeData() {
    this.pokeApi.getAllPokemon(10, this.page + 0).subscribe((response: any) => {
      this.totalPokemon = response.count;
      response.results.forEach((result: any) => {
        this.pokeApi
          .getPokemonData(result.name)
          .subscribe((dataResponse: any) => {
            dataResponse = {
              ...dataResponse,
              favorite: this.isFavorite,
              favoritelabel: this.favoritLabel,
            };
            this.pokemonDetail.push(dataResponse);
          });
      });
    });
  }
  goPage(pokemon: any) {
    this.router.navigate(['/pokemon', pokemon.name]);
  }

  //Checa se é favorito e muda a estrela
  checkFavorite(id: number) {
    this.pokemonDetail.map((pokemon: any) => {
      if (pokemon.id === id) {
        pokemon.favorite = !pokemon.favorite;
        if (pokemon.favorite === false) {
          pokemon.favoriteLabel = 'star_border';
        } else {
          pokemon.favoriteLabel = 'star';
        }
        this.favoritePokemons.push(pokemon);
      }
    });
  }
  //Remove valores repetidos
  keepUniquePokemonFavorite() {
    this.favoritePokemons.forEach((favorite: number) => {
      this.favoriteUniquePokemons.add(favorite);
      this.uniquePokemon = [...this.favoriteUniquePokemons.values()];
    });
  }
  //Adiciona no LocalStorage
  addFavoriteLocal() {
    this.favorits.push(
      localStorage.setItem('@favorits', JSON.stringify(this.uniquePokemon))
    );
    console.log('favorits', this.favorits);
  }

  removeFavoriteLocal(id: number) {
    this.uniquePokemon = this.favorits.filter((favorite: any) => {
      return favorite.id !== id;
    });

    localStorage.setItem('@favorits', JSON.stringify(this.uniquePokemon));
  }
  //Função principal
  setFavorite(id: number) {
    this.checkFavorite(id);
    this.keepUniquePokemonFavorite();

    if (this.favorits.id === id) {
      this.removeFavoriteLocal(this.favorits);
    } else {
      this.addFavoriteLocal();
    }
    console.log(this.favorits.id);

    console.log('set', this.favorits);
  }

  // setFavorite(id: number) {
  //
  //   this.pokemonDetail.map((pokemon: any) => {
  //     if (pokemon.id === id) {
  //       pokemon.favorite = !pokemon.favorite;
  //       if (pokemon.favorite === false) {
  //         pokemon.favoriteLabel = 'star_border';
  //       } else {
  //         pokemon.favoriteLabel = 'star';
  //       }
  //       this.favoritePokemons.push(pokemon.id);

  //       //-----------Trata pokemons repetidos------------
  //       const favoriteUniquePokemons: any = new Set();
  //       this.favoritePokemons.forEach((favorite: number) => {
  //         favoriteUniquePokemons.add(favorite);
  //       });

  //       this.uniquePokemon = [...favoriteUniquePokemons.values()];
  //       //-----------------------------------------------

  //       //------Construir lógica para remover do localStorage-------
  //       let favorito: any = [];
  //       JSON.stringify(localStorage.setItem('@favorite', favorito));
  //       favorito = this.uniquePokemon.filter((favorite: number) => {
  //         return pokemon.id !== this.uniquePokemon;
  //       });

  //       if (pokemon.favorite === false) {
  //         localStorage.removeItem('@favorite');
  //         localStorage.setItem('@favorite', favorito);
  //       } else {
  //         localStorage.setItem('@favorite', JSON.stringify(favorito));
  //         console.log(favorito);
  //       }
  //     }
  //   });

  // console.log('detail', this.pokemonDetail[id]);

  // console.log('unique', this.uniquePokemon);

  ngOnInit() {
    this.pokeData();
    console.log(this.favorits);
  }
}
