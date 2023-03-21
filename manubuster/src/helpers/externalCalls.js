import axios from 'axios';

const baseURI = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4';
const headers = {
    'Accept': 'application/json',
    'Client-ID': '956nqfewwdj2i6rf22or9bw4xu2j83',
    'Authorization': 'Bearer wvum0vz0zxked4md4tkn0rlaefjv4m',
};

async function getGameId(gameName) { 
    await axios({
        url: `${baseURI}/games`,
        method: 'POST',
        headers: headers,
        data: `fields name, cover; search "${gameName}"; limit 1;`
      })
      .then(response => {
          return response.data[0].cover;
      })
      .catch(err => {
          console.log(err);
      });
};

export default async function getGameCover(gameName) {
    const exampleURL = 'https://picsum.photos/264/352';
    const gameId = await getGameId(gameName);
    await axios({
        url: `${baseURI}/covers`,
          method: 'POST',
          headers: headers,
          data: `fields url; where id = ${gameId}; limit 1;`
        })
        .then(response => {
            return response.data[0].url ?? exampleURL;
        })
        .catch(err => {
            console.log(err);
            return exampleURL;
        });
};
