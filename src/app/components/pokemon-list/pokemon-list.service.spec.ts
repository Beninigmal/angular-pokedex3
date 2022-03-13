/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PokemonListService } from './pokemon-list.service';

describe('Service: PokemonList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonListService]
    });
  });

  it('should ...', inject([PokemonListService], (service: PokemonListService) => {
    expect(service).toBeTruthy();
  }));
});
