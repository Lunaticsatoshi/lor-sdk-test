import nock from 'nock';
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

  test('rest api call', async () => {
    nock('https://the-one-api.dev/v2', {
      reqheaders: {
        Authorization: 'test-api-key',
      },
    })
      .get('/movies/')
      .reply(200, JSON.parse(JSON.stringify(response)));

    const res = await client.movies.getMovies();
    expect(res).toHaveProperty('docs');
    expect(res.docs).toBeDefined();
  });
});
