import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

      const pokemon = await this.pokemonModel.create( createPokemonDto );

      return pokemon;
    } catch (error) {
      if(error.code === 11000) {
        throw new BadRequestException(`Pokemons exists in db ${ JSON.stringify( error.keyValue ) }`);
      }
      console.log(error);
      throw new InternalServerErrorException(`can't create Pokemon - check server logs`);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon:Pokemon;

    if( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({
        no: term
      })
    }

    if( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() })
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with no ${term} not found.`);
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
