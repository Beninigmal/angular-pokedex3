import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  constructor(private http: HttpClient) {}

  getDetails(nome: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  }
}
