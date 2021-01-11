import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: PrismicLink({
    uri: 'https://linksraiza.prismic.io/graphql',
  }),
  cache: new InMemoryCache(),
});

export async function query(queryString) {
  return await client.query({
    query: gql`
      ${queryString}
    `,
  });
}
