import { InMemoryCache, makeVar } from "@apollo/client";

const local = typeof window !== "undefined";

export const isLoggedInVar = makeVar(
  local && localStorage?.getItem("isLoggedIn")
    ? JSON.parse(localStorage?.getItem("isLoggedIn"))
    : false
);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        }
      }
    }
  }
});
