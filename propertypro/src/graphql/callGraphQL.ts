import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

// TODO: figure out a better way to pass arguments to a query.
// We shouldn't have to keep adding properties to this interface.
export interface GraphQLOptions {
  input?: object;
  variables?: object;
  id?: string;
  authMode?: GRAPHQL_AUTH_MODE;
}

async function callGraphQL<T>(
  query: any,
  options?: GraphQLOptions
): Promise<GraphQLResult<T>> {
  return (await API.graphql(
    graphqlOperation(query, options)
  )) as GraphQLResult<T>;
}

export default callGraphQL;
