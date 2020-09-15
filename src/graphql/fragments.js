import { gql } from "apollo-boost";

export const jobsFields = gql`
  fragment jobInfo on Job {
    company {
      logoUrl
      name
    }
    tags {
      name
    }
    title
    isFeatured
    isPublished
    createdAt
    remotes {
      name
    }
    applyUrl
    slug
    cities {
      name
      country {
        name
      }
    }
    remotes {
      name
    }
  }
`;
