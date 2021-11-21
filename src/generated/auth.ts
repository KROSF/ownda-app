/* THIS IS A GENERATED FILE - DO NOT MODIFY */
import type * as Schema from './schema';

import { gql } from 'urql';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RegisterMutationVariables = Schema.Exact<{
  email: Schema.Scalars['String'];
  password: Schema.Scalars['String'];
  passwordConfirmation: Schema.Scalars['String'];
  confirmUrl: Schema.Scalars['String'];
}>;

export type RegisterMutation = {
  userRegister?: Schema.Maybe<{
    credentials?: Schema.Maybe<
      Pick<
        Schema.Credential,
        'accessToken' | 'client' | 'uid' | 'expiry' | 'tokenType'
      >
    >;
  }>;
};

export type RefreshTokenMutationVariables = Schema.Exact<{
  [key: string]: never;
}>;

export type RefreshTokenMutation = {
  refreshToken?: Schema.Maybe<{
    credentials: Pick<
      Schema.Credential,
      'accessToken' | 'client' | 'uid' | 'expiry' | 'tokenType'
    >;
  }>;
};

export const RegisterDocument = gql`
  mutation Register(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $confirmUrl: String!
  ) {
    userRegister(
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
      confirmUrl: $confirmUrl
    ) {
      credentials {
        accessToken
        client
        uid
        expiry
        tokenType
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
  );
}
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken(input: {}) {
      credentials {
        accessToken
        client
        uid
        expiry
        tokenType
      }
    }
  }
`;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument,
  );
}
