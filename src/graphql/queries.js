import { gql } from "apollo-boost";
import { jobsFields } from "../graphql/fragments";

export const GET_COUNTRY = gql`
  query getCountry($q: LocationInput!) {
    country(input: $q) {
      id
      name
      jobs {
        ...jobInfo
      }
    }
  }
  ${jobsFields}
`;

export const GET_CITY = gql`
  query getCity($q: LocationInput!) {
    city(input: $q) {
      name
      country {
        name
      }
      createdAt
      jobs {
        ...jobInfo
      }
    }
  }
  ${jobsFields}
`;
export const GET_JOBS = gql`
  query getJobs {
    cities {
      slug
    }
    jobs {
      ...jobInfo
    }
  }
  ${jobsFields}
`;

export const GET_COMPANYS = gql`
  query getCompanies {
    companies {
      id
      name
      slug
      jobs {
        ...jobInfo
      }
    }
  }
  ${jobsFields}
`;

export const GET_LOCATIONS = gql`
  query getLocations($l: LocationsInput!) {
    locations(input: $l) {
      slug
      name
      type
    }
  }
`;
