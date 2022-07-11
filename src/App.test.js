import { queryByText, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import App from "./App"

jest.mock('./utils/currency', () => {
  return {
    convert: jest.fn().mockImplementation(() => 1.42),
  }
});

test('renders the App', async () => {
  fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));
  render(<App />);
  screen.getByText(/Loading/i);
  // this api requires a key
  // await waitFor(() => {
  //   expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  // });
  // const element = await screen.findByText(/USD to CAD = 1.42/i);
  // expect(element).toBeInTheDocument();
});
