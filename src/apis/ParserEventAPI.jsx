import gql from 'graphql-tag';

export const FETCH_PARSER_EVENTS_QUERY = gql`
  query {
    getParserEvents {
      id
      createdAt
      title
      isOnline
      headerDescription
      urlContent
      description
      city
      address
      lat
      lng
      typeOfEvent
      time
      period
      website
      images
    }
  }
`;

export const FETCH_ALL_EVENTS_QUERY = gql`
  query($limit: Int, $skip: Int, $first: Int, $after: String) {
    getParserEvents(limit: $limit, skip: $skip, first: $first, after: $after) {
      id
      createdAt
      title
      isOnline
      headerDescription
      urlContent
      description
      city
      address
      lat
      lng
      typeOfEvent
      time
      period
      website
      images
      likes {
        id
        userId
        # firstName
        # secondName
      }
    }
    getPosts(limit: $limit, skip: $skip, first: $first, after: $after) {
      id
      userId
      createdAt
      nameOfEvent
      aboutOfEvent
      timeOfEvent
      address
      lat
      lng
      typeOfEvent
      createdAt
      firstName
      secondName
      privateEvent
      notifyFriends
      adultEvent
      image
      likes {
        id
        userId
        # firstName
        # secondName
      }
    }
  }
`;

export const LIKE_PARSER_EVENT = gql`
  mutation($parserEventId: String!) {
    likeParserPost(parserEventId: $parserEventId) {
      id
      likes {
        id
        firstName
        secondName
      }
    }
  }
`;
