import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import {useRouter,useRoute} from 'vue-router'
import router from '@/router'


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
    async fetchPokemon(pokemonId,randomPokiimonId) {
      this.pokemonId=randomPokiimonId
        this.error = null
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
         console.log(response.data) 
        this.pokemon = {
          name: response.data.name,
          id: response.data.id,
          image: response.data.sprites.other.dream_world.front_default,
          abilities: response.data.abilities,
          moves: response.data.moves,
          weight: response.data.weight,
          height: response.data.height,
          types: response.data.types,
          base_experience: response.data.base_experience,
          cries: response.data.cries.legacy
        }

        this.LocalPokemonArray.push(this.pokemon)
        console.log(this.LocalPokemonArray)
        this.cardcolor(this.pokemon.types,this.pokemon.id)

    }
    catch  {
      
    }

  },

  cardcolor(types,id){
    console.log(types)
    console.log(types[0].type.name)
    const typeName=types[0].type.name
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
    this.typeColor[id]=colorMapping[typeName]
  },
   openDetailsView(index,id){
    router.push({name:'Details',params:{id:id}})
    console.log(index)
    if (this.LocalPokemonArray.length > 0){
       this.pokemonIndex =this.LocalPokemonArray[index]
      console.log(this.pokemonIndex)
      console.log(index) 

    }
     
   
  
    
  }
  

 
  }})
