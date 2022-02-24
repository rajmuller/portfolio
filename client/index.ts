import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../graphql/generated'; // THIS FILE IS THE GENERATED FILE

export const sdk = () => {
  const client = new GraphQLClient(
    'https://xqw2al3e.api.sanity.io/v1/graphql/production/default'
  );
  const _sdk = getSdk(client);
  return _sdk;
};
