import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
import router from '@/router'
import { parse } from 'vue/compiler-sfc'


export const useAuthStore = defineStore('auth',  {
  state: () => ({
    pokemonId: '',
    LocalPokemonArray:[],
    pokemon: {
      name: '',
      id: '',
      image: '',
      abilities: [],
      moves: [],
      weight: '',
      height: '',
      types: [],
    },
    pokemonIndex:{
    },
    typeColor: {},
    error: null,    
  }),
  getters: {
  },
  actions: {
    async fetchPokemon(pokemonId, randomPokiimonId) {
      this.pokemonId = randomPokiimonId;
      this.error = null;
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = response.data;
        
        console.log(data);
    
        const pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          abilities: data.abilities.map(a => a.ability.name),
          moves: data.moves.map(m => m.move.name),
          weight: data.weight,
          height: data.height,
          types: data.types.map(t => t.type.name),
          base_experience: data.base_experience,
        };
    
        this.LocalPokemonArray.push(pokemon);
        this.cardcolor(pokemon.types, pokemon.id);
    
        await axios.post('http://localhost:3000/pokemon', 
          {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          abilities: JSON.stringify(pokemon.abilities),
          moves: JSON.stringify(pokemon.moves),
          weight: pokemon.weight,
          height: pokemon.height,
          types: JSON.stringify(pokemon.types),
          base_experience: pokemon.base_experience,
        });
    
        console.log('Pokemon added successfully:', pokemon);
        console.log(pokemon.types, pokemon.id);

        
      } catch (error) {
        console.error('Error fetching and saving Pokemon data', error);
      }
    },
  cardcolor(types,id){
    const typeName = types[0];
    console.log(typeName);
    const colorMapping={
      'normal':'#a8a878',
      'fire':'#f08030',
      'fighting':'#c03028',
      'water':'#6890f0',
      'flying':'#a890f0',
      'grass':'#78c850',
      'poison':'#a040a0',
      'electric':'#f8d030',
      'ground':'#e0c068',
      'psychic':'#f85888',
      'rock':'#b8a038',
      'ice':'#98d8d8',
      'bug':'#a8b820',
      'dragon':'#7038f8',
      'ghost':'#705898',
      'dark':'#705848',
      'steel':'#b8b8d0',
      'fairy':'#ee99ac'
  
    }
    this.typeColor[id] = colorMapping[typeName] || '#ffffff'; // default color if type not found
    console.log(`Color set for ${id}: ${this.typeColor[id]}`);
  
  },
   openDetailsView(index,id){
    router.push({name:'Details',params:{id:id}})
    console.log(index)
    if (this.LocalPokemonArray.length > 0){
       this.pokemonIndex =this.LocalPokemonArray[index]
      console.log(this.pokemonIndex)
      console.log(index) 
    }
  },
  async fetchPokemon1(pokemonId) {
    try {
      const response = await axios.get(`http://localhost:3000/pokemon/${pokemonId}`);
      const data = response.data;
      console.log('Received data:', data);
  
      // Log individual fields
      console.log('Abilities:', data.abilities);
      console.log('Moves:', data.moves);
      console.log('Types:', data.types);
  
      let abilities = [];
      let moves = [];
      let types = [];
  
      try {
        abilities = JSON.parse(data.abilities);
      } catch (e) {
        console.error('Error parsing abilities:', e);
      }
  
      try {
        moves = JSON.parse(data.moves);
        console.log(moves);
      } catch (e) {
        console.error('Error parsing moves:', e);
      }
  
      try {
        types = JSON.parse(data.types);
        console.log(types);
      } catch (e) {
        console.error('Error parsing types:', e);
      }
  
      const pokemon = {
        name: data.name,
        id: data.id,
        image: data.image,
        abilities: abilities,
        moves: moves,
        weight: data.weight,
        height: data.height,
        types: types,
        base_experience: data.base_experience,
      };
  
      this.LocalPokemonArray.push(pokemon);
      this.cardcolor(JSON.parse(pokemon.types), pokemon.id); // Call cardcolor function with pokemon.types, pokemon.id);
      console.log(pokemon.types)
      console.log(JSON.parse(pokemon.types));
      console.log('Response data:', data);
      console.log(this.LocalPokemonArray);
      //cardcolor(pokemon.types, pokemon.id);
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
    }
  },
  async retrieveAllPokemons() {
    for (let i = 601; i <= 1100; i++) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const { id, name, sprites, abilities, moves, weight, height, types, base_experience } = response.data;
        const pokemon = {
          id,
          name,
          image: sprites.other.dream_world.front_default,
          abilities: abilities.map(a => a.ability.name),
          moves: moves.map(m => m.move.name),
          weight,
          height,
          types: types.map(t => t.type.name),
          base_experience
        };
        this.LocalPokemonArray.push(pokemon);
        console.log(this.LocalPokemonArray);
  
        await axios.post('http://localhost:3000/pokemon', {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          abilities: JSON.stringify(pokemon.abilities),
          moves: JSON.stringify(pokemon.moves),
          weight: pokemon.weight,
          height: pokemon.height,
          types: JSON.stringify(pokemon.types),
          base_experience: pokemon.base_experience,
        });
      } catch (error) {
        console.error(`Failed to fetch data for Pokemon ${i}:`, error);
      }
    }
  }
  
  
  
  
  

 
  }})
