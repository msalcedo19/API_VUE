import axios from "axios";

let headers =  {
    "Content-Type": "application/json"
}
const apiURL = "https://swapi.dev/api/";

class StarWarAPI {

    getFilms() {
        return axios.get(apiURL + "films/", {headers})
    }

    getFilmById(id) {
        return axios.get(apiURL + `films/${id}/`, {headers})
    }

    getCharacterById(url) {
        return axios.get(url, {headers})
    }

}

export default new StarWarAPI();


