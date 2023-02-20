// eslint-disable-next-line @typescript-eslint/no-var-requires
// const {Client} = require('@lunaticsatoshi/lor-sdk-test');
import { Client } from '@lunaticsatoshi/lor-sdk-test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const dotenv = require('dotenv');

// dotenv();

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  const client = new Client({
    apiKey: '',
  });

  const response = await client.movies.getMovies();

  console.log(JSON.parse(JSON.stringify(response, null, 4)));
})();
