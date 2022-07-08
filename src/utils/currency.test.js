import { convert } from "./currency";

beforeEach(() => {
  // resetMocks to clear the cache. Otherwise it will carry over into the next test
  fetch.resetMocks();
});

it("converts correctly", async () => {
  // tell what fake response fetch should receive
  // a fetch returns a json object so JSON.stringify this
  fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 }}));
  const rates = await convert('USD', 'CAD');

  expect(rates).toEqual(1.42);
  expect(fetch).toHaveBeenCalledTimes(1);
  // expect this to have been called with USD
  expect(fetch).toHaveBeenCalledWith(`https://api.exchangeratesapi.io/latest?base=USD`)
});

it("catches errors and returns null", async () => {
 // mock a rejection
  fetch.mockReject(() => Promise.reject('API failure'));

  const rates = await convert('USD', 'CAD');
  // this will fail so we expect it to be null
  expect(rates).toEqual(null);
});
