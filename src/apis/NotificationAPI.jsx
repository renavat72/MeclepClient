import gql from 'graphql-tag';

const notificationPayload = `
  id
  createdAt
  author {
    id
    firstName
    secondName
    image
  }
  follow {
    id
  }
  comment {
    id
    post {
      id
      image
    }
  }
  like {
    id
    post {
      id
      image
    }
  }
`;

export const CREATE_NOTIFICATION = gql`
  mutation($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      id
    }
  }
`;