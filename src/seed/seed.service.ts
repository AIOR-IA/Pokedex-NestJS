import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/pokemon.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=500`);
    const res = data.results.map( pokemon => {
      return {
        name:pokemon.name,
        no:parseInt(pokemon.url.split('/')[6])
      }
    })


    return res;
  }

  
}
