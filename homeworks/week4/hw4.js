const request = require('request');

request(
  {
    url: 'https://api.twitch.tv/helix/games/top',
    headers: {
      'Client-ID': '148hz8ogrvm9qgx62s8vuh5x7jrfcg',
    },
  },
  (error, respnse, body) => {
    const json = JSON.parse(body);
    json.data.forEach((alldata) => {
      console.log(`${alldata.id} ${alldata.name}`);
    });
  },
);
