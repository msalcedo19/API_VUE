<template>
  <div id="app">
    <span v-if="errorMessage.length > 0" style="color: red">{{`Ocurrio el siguiente error: ${errorMessage}`}}</span>
    <div class="row" style="margin: 25px 0">
      <select ref="seleccionado" v-model="filmId">
        <option :key="elemento.url" v-for="elemento in this.table.data">{{elemento.url[elemento.url.length - 2]}}</option>
      </select>
      <button v-on:click="search">Search</button>
    </div>
    <table style="margin: 0 auto">
      <thead>
      <tr>
        <th :key="column" v-for="column in table.columns">
          {{ column.charAt(0).toUpperCase() + column.slice(1) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr @click="selectedMovie(row.characters)" :key="row.title" v-for="row in table.data" style="cursor: pointer;">
        <td :key="column" v-for="column in table.columns">
          {{row[column]}}
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="characters.data.length > 0" style="margin: 20px 0">
      <span class="title">Characters</span>
      <div class="row">
        <div :key="character.url" v-for="character in characters.data">
          <div style="width: 400px; height: 200px; border: 2px solid #000; padding-top: 10px">
            <div :key="att" v-for="att in characters.attributes">
              <div  style="margin: 10px 0" v-if="att == 'name'">
                <span>{{character[att]}}</span>
              </div>
              <div v-else class="row">
                <div class="column">
                  {{att}}
                </div>
                <div class="column">
                  {{character[att] + (att == 'height' ? ' cm':att == 'mass' ? ' kg': '')}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import starWarProvider from "@/providers/starWarProvider";

export default {
  name: 'App',
  components: {},
  data(){
    return {
      filmId: '',
      table: {
        columns: ["id", "title", "director", "release_date", "producer"],
        data: []
      },
      characters: {
        data: [],
        attributes: ["name", "birth_year", "eye_color", "gender", "hair_color", "height", "mass", "skin_color"],
      },
      errorMessage: "",
    }
  },
  methods: {
    search(){
      starWarProvider.getFilmById(this.filmId).then(res => {
        if(res.data){
          this.selectedMovie(res.data.characters)
        }
      });
    },

    selectedMovie(characters){
      this.characters.data = [];
      for(let i in characters){
        starWarProvider.getCharacterById(characters[i]).then(res => {
          if(res.data){
            this.characters.data.push(res.data)
          }
        });
      }
    }

  },
  beforeMount() {
    starWarProvider.getFilms().then(res => {
      if(res.data.results && res.data.results.length > 0){
        for(let i in res.data.results){
          res.data.results[i].id = res.data.results[i].url[res.data.results[i].url.length - 2]
          this.table.data.push(res.data.results[i])
        }
      }
    }, err => {
      this.errorMessage = err.message
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.row{
  display: flex;
  flex-wrap: wrap;
  place-content: center;
}
.column {
  flex: 50%;
}

.title{
  font-weight: bold;
  font-size: 20px;
}
</style>
