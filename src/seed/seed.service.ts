import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/pokemon.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  constructor(private pokemonService: PokemonService) {

  }

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const inserAllPromiseArrary = [];
    const { data } = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=500`);
    const res = data.results.map( pokemon => {
      return {
        name:pokemon.name,
        no:parseInt(pokemon.url.split('/')[6])
      }
    })

    await this.pokemonService.cleanPokemonsDb();
    res.forEach((pokemon:Pokemon) => {
      inserAllPromiseArrary.push(this.pokemonService.create(pokemon)); 
    });

    await Promise.all(inserAllPromiseArrary);
    return `Seed Completed`;
  }

  
}
