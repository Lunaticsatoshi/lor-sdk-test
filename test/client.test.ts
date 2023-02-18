import { Client } from '../src';
import { response } from './movies';

describe('test v2 client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client({
      baseUrl: 'https://the-one-api.dev/v2',
      apiKey: 'EQzMH8wocdKIqoo_JQsX',
    });
  });

  it("Constructs without throwing", () => {
    new Client({
      baseUrl: 'https://the-one-api.dev/v2',
      apiKey: 'EQzMH8wocdKIqoo_JQsX',
    });
  })

  test('rest api call to get all movies', async () => {
    const res = await client.movies.getMovies();
    expect(res).toHaveProperty('docs');
    expect(res.docs).toBeDefined();
  });

  test('rest api call to get a single movie', async () => {
    const res = await client.movies.getMovieById('5cd95395de30eff6ebccde5d');
    expect(res).toEqual(response)
    expect(res).toHaveProperty('docs');
    expect(res.docs).toBeDefined();
  });
});
