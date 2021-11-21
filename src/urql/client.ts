import {
  createClient,
  fetchExchange,
  makeOperation,
  dedupExchange,
} from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { Storage } from '@app/storage';
import type { Credential } from '@app/generated/schema';
import {
  RefreshTokenDocument,
  RefreshTokenMutation,
} from '@app/generated/auth';
import { offlineExchange } from '@urql/exchange-graphcache';
import schema from '@app/generated/schema.json';
import { makeAsyncStorage } from './mmkv';
import { errorExchange } from '@urql/core';

const storage = makeAsyncStorage();

export const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [
    dedupExchange,
    offlineExchange({
      schema: schema as any,
      storage,
      updates: {},
      optimistic: {},
    }),
    errorExchange({
      onError: error => {
        const isAuthError = error.graphQLErrors.some(
          e => e.extensions?.code === 'AUTHENTICATION_ERROR',
        );

        if (isAuthError) {
          Storage.delete('@token');
        }
      },
    }),
    authExchange<Credential>({
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.accessToken) {
          return operation;
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `${authState.tokenType} ${authState.accessToken}`,
            },
          },
        });
      },
      willAuthError: ({ authState }) => {
        if (!authState) {
          return true;
        }
        // e.g. check for expiration, existence of auth etc
        return false;
      },
      didAuthError: ({ error }) => {
        // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'AUTHENTICATION_ERROR',
        );
      },
      getAuth: async ({ authState, mutate }) => {
        if (!authState) {
          return Storage.getCredential();
        }

        const { data } = await mutate<RefreshTokenMutation>(
          RefreshTokenDocument,
        );

        if (data?.refreshToken) {
          Storage.setCredential(data.refreshToken.credentials);

          return data.refreshToken.credentials;
        }

        return null;
      },
    }),
    fetchExchange,
  ],
});
