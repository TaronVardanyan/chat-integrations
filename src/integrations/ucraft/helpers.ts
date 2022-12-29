import { gql } from "@apollo/client";

export const getTemplateThumbnailQuery = gql`
  query template($id: ID!) {
    template(id: $id) {
      id
      name
      thumbnail
    }
  }
`;
