import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  resolvers: {
    Rates: {
      numberOfCurrencies: root => {
        console.log(root);
        return 3;
      }
    }
  }
});

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          numberOfCurrencies @client
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <ExchangeRates />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
