import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  constructor(private http: HttpClient) {}

  getAllPokemon() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=8');
  }

  getPokemonData(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
