import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $nameOfEvent: String!
    $timeOfEvent: String!
    $typeOfEvent: String!
    $aboutOfEvent: String!
    $lat: Float
    $lng: Float
    $address: String
    $privateEvent: Boolean
    $notifyFriends: Boolean
    $adultEvent: Boolean
    $image: Upload
  ) {
    createPost(
      infoPost: {
        timeOfEvent: $timeOfEvent
        nameOfEvent: $nameOfEvent
        typeOfEvent: $typeOfEvent
        aboutOfEvent: $aboutOfEvent
        privateEvent: $privateEvent
        notifyFriends: $notifyFriends
        adultEvent: $adultEvent
        image: $image
      }
      locationOfEvent: { lat: $lat, lng: $lng, address: $address }
    ) {
      id
      createdAt
      firstName
      timeOfEvent
      nameOfEvent
      typeOfEvent
      aboutOfEvent
      address
      lat
      lng
      image
      adultEvent
      notifyFriends
      privateEvent
      likes {
        id
        firstName
        secondName
        createdAt
      }

      comments {
        id
        body
        firstName
        secondName
        createdAt
      }
    }
  }
`;

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      userId
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

export const FETCH_POST_QUERY = gql`
  query {
    getPost {
      id
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
      # likeCount
      likes {
        id
        # firstName
        # secondName
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation($postId: String!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        firstName
        secondName
      }
      # likeCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

export const FILTER_TYPE_POST = gql`
  query($searchQuery: String!) {
    filterTypePost(searchQuery: $searchQuery) {
      id
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
      # likeCount
      likes {
        id
        # firstName
        # secondName
      }
    }
  }
`;

export const SEARCH_POST = gql`
  query($searchQuery: String!) {
    searchPost(searchQuery: $searchQuery) {
      id
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
      # likeCount
      likes {
        id
        # firstName
        # secondName
      }
    }
  }
`;
