import gql from 'graphql-tag';

const userPayload = `
  id
  email
  firstName
  secondName
  coverImage
  coverImagePublicId
  createdAt
  isOnline
`;

export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $secondName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        secondName: $secondName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      firstName
      secondName
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      firstName
      secondName
      createdAt
      token
    }
  }
`;

export const GET_CURRENT_USER = gql`
    query( $userId: String!) {
        getCurrentUser(userId: $userId) {
          id
          firstName
          secondName
            # ${userPayload}
        #     isOnline
        #     posts {
        #      id
        #     }
        following{
                id
                follower
                user
                followerCoverImage
                followerFirstName
                followerSecondName
                userCoverImage
                userFirstName
                userSecondName
            }
        followers{
                id
                follower
                user
                followerCoverImage
                followerFirstName
                followerSecondName
                userCoverImage
                userFirstName
                userSecondName
            }
        #     notifications {
        #         id
        #         author {
        #         id
        #         username
        #         }
        #     follow {
        #      id
        #     }
        # }
    }
}
`;
export const FOLLOWING_USER = gql`
  query($userId: String!, $searchQuery: String!) {
    followingUser {
      id
      firstName
      secondName
      following {
        id
        follower
        user
        userCoverImage
        followerCoverImage
        followerFirstName
        followerSecondName
        userCoverImage
        userFirstName
        userSecondName
      }
      followers {
        id
        follower
        user
        followerCoverImage
        followerFirstName
        followerSecondName
        userCoverImage
        userFirstName
        userSecondName
      }
      # notifications {
      #   id
      #   author {
      #     id
      #     firstName
      #      secondName
      #   }
      #   follow {
      #     id
      #   }
      # }
    }
  }
`;
export const FOLLOWERS_USER = gql`
  query {
    followersUser {
      id
      firstName
      secondName
      following {
        id
        follower
        user
        followerCoverImage
        followerFirstName
        followerSecondName
        userCoverImage
        userFirstName
        userSecondName
      }
      followers {
        id
        follower
        user
        followerCoverImage
        followerFirstName
        followerSecondName
        userCoverImage
        userFirstName
        userSecondName
      }
      # notifications {
      #   id
      #   author {
      #     id
      #     firstName
      #      secondName
      #   }
      #   follow {
      #     id
      #   }
      # }
    }
  }
`;
export const GET_ALL_USERS = gql`
  query($userId: String!) {
    getUsers(userId: $userId) {
      id
      firstName
      secondName
      following {
        id
        follower
        user
        followerFirstName
        followerSecondName
        userFirstName
        userSecondName
      }
      followers {
        id
        follower
        user
        followerFirstName
        followerSecondName
        userFirstName
        userSecondName
      }
      # notifications {
      #   id
      #   author {
      #     id
      #     firstName
      #      secondName
      #   }
      #   follow {
      #     id
      #   }
      # }
    }
  }
`;

export const CREATE_FOLLOW = gql`
  mutation($input: CreateFollowInput!) {
    createFollow(input: $input) {
      id
    }
  }
`;

export const DELETE_FOLLOW = gql`
  mutation($input: DeleteFollowInput!) {
    deleteFollow(input: $input) {
      id
    }
  }
`;
export const GET_AUTH_USER = gql`
    query {
        getAuthUser{
            ${userPayload}
            images{
              id
              image
              imagePublicId
            }
            newConversations{
              id
              firstName
              secondName
            }
            followingCount
            followersCount
            following{
                id
                follower
                user
                followerCoverImage
                followerFirstName
                followerSecondName
                userCoverImage
                userFirstName
                userSecondName
            }
            followers{
                id
                follower
                user
                followerCoverImage
                followerFirstName
                followerSecondName
                userCoverImage
                userFirstName
                userSecondName
            }
        }
    }
`;

export const SEARCH_USERS = gql`
  query($searchQuery: String!) {
    searchUsers(searchQuery: $searchQuery) {
      firstName
      secondName
    }
  }
`;

export const IS_USER_ONLINE_SUBSCRIPTION = gql`
  subscription($authUserId: String!, $userId: String!) {
    isUserOnline(authUserId: $authUserId, userId: $userId) {
      userId
      isOnline
    }
  }
`;
