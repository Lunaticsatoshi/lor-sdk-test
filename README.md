<div align="center">
	<h1>Lord of the Rings SDK</h1>
	<p>
		<b>A simple and easy to use client for the <a href="https://the-one-api.dev/">Lord of the Rings API</a></b>
	</p>
	<br>
</div>

[![npm version](https://badge.fury.io/js/@lunaticsatoshi%2Flor-sdk-test.svg)](https://www.npmjs.com/package/@lunaticsatoshi/lor-sdk-test)

## Installation

```
npm install @lunaticsatoshi/lor-sdk-test
```

## Usage

> Use One API's [Getting Started Guide](https://the-one-api.dev/documentation) to get set up to use LOR API.

Import and initialize a client using an **integration token** or an OAuth **access token**.

```js
const { Client } = require("@lunaticsatoshi/lor-sdk-test")
// Modern js
import { Client } from "@lunaticsatoshi/lor-sdk-test"

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
```

### Make a request to All Movies.

> See the complete list of endpoints in the [API reference](https://the-one-api.dev/documentation).

```js
(async () => {
  const client = new Client({
    apiKey: 'YOUR_API_KEY',
    baseUrl: 'BASE_URL',
  });

  const response = await client.movies.getMovies();

  console.log(JSON.parse(JSON.stringify(response, null, 4)));
})();
```

Each method returns a `Promise` which resolves the response.

```
{
    "docs": [
        {
            "_id": "5cd95395de30eff6ebccde56",
            "name": "The Lord of the Rings Series",
            "runtimeInMinutes": 558,
            "budgetInMillions": 281,
            "boxOfficeRevenueInMillions": 2917,
            "academyAwardNominations": 30,
            "academyAwardWins": 17,
            "rottenTomatoesScore": 94
        },
        {
            "_id": "5cd95395de30eff6ebccde57",
            "name": "The Hobbit Series",
            "runtimeInMinutes": 462,
            "budgetInMillions": 675,
            "boxOfficeRevenueInMillions": 2932,
            "academyAwardNominations": 7,
            "academyAwardWins": 1,
            "rottenTomatoesScore": 66.33333333
        },
    ],
    "total": 8,
    "limit": 1000,
    "offset": 0,
    "page": 1,
    "pages": 1
}
```

### Get a single movie.

```js
(async () => {
  const client = new Client({
    apiKey: 'YOUR_API_KEY',
    baseUrl: 'BASE_URL',
  });

  const response = await client.movies.getMovieById("5cd95395de30eff6ebccde5b");

  console.log(JSON.parse(JSON.stringify(response, null, 4)));
})();
```

### Get Quote from a single movie.

```js
(async () => {
  const client = new Client({
    apiKey: 'YOUR_API_KEY',
    baseUrl: 'BASE_URL',
  });

  const response = await client.movies.getMovieQuote("5cd95395de30eff6ebccde5b");

  console.log(JSON.parse(JSON.stringify(response, null, 4)));
})();
```

## Contributing

Note this is only for developers who want to contribute code to the SDK


### Clone the Repository

```
git clone https://github.com/Lunaticsatoshi/lor-sdk-test
```

### Building

```
yarn build
```

### Testing

```
yarn test
```

## Requirements

This package supports the following minimum versions:

- Runtime: `node >= 12`
- Type definitions (optional): `typescript >= 4.5`

Earlier versions may still work, but we encourage people building new applications to upgrade to the current stable.


## 🔐 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Suggestions and Bug Reports
Since this is an open source project all suggestions, requests and bug reports are always welcomed. If you have any don't forget to leave them in the issues section. But we recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other.

Don't forget to checkout the [CONTRIBUTING.md](CONTRIBUTING.md) for more info on how to contribute to this project.