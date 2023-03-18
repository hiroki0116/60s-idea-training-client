import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getCookie, isAuth, setCookie } from "../utils/auth_functions";
import { auth } from "./firebase";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
});

const getToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    return isAuth() ? getCookie("token") : "";
  }
  const token = await auth.currentUser.getIdToken();
  setCookie("token", token);
  return token;
};

const authLink = setContext(async () => {
  return {
    headers: {
      "x-auth-token": await getToken(),
    },
  };
});

const options = {
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        IdeaRecord: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
};

const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(options),
});

function createApolloClient() {
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      for (const { message, locations, path } of graphQLErrors) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(options),
  });
}

export { apolloClient, createApolloClient };
