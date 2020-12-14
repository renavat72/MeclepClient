import gql from 'graphql-tag'

const userPayload = `
  id
  email
  firstName
  secondName
  image
  imagePublicId
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
    ){
        id email firstName secondName createdAt token
    }
}
`

export const LOGIN_USER = gql`
mutation login(
    $email: String!
    $password: String!
) {
    login (
            email: $email
            password: $password
    ) {
        id
        email
        firstName
        secondName
        createdAt
        token
        
    }
}
`

export const CHANGE_FIRSTNAME = gql`
    mutation($currentFirstName: String!, $newFirstName: String!){
        changeFirstName(currentFirstName: $currentFirstName, newFirstName: $newFirstName){
            firstName
        }
    }
`;

export const CHANGE_SECONDNAME = gql`
    mutation($currentSecondName: String! $newSecondName: String!){
        changeInfo( currentSecondName: $currentSecondName, newSecondName: $newSecondName){
            secondName
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query( $userId: String!) {
        getCurrentUser(userId: $userId) {
          id
          firstName
          secondName
        #     ${userPayload}
        #     isOnline
        #     posts {
        #      id
        #     }
        #     following {
        #      id
        #     }
        #     followers {
        #      id
        #     }
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
     query{
      followingUser {
        id
        firstName
        secondName
        following {
          id
          user
        }
        followers {
          id
          user
        }
        notifications {
          id
          author {
            id
            firstName
             secondName
          }
          follow {
            id
          }
        }

    }
  }
`
export const GET_ALL_USERS = gql`
     query($userId: String!) {
        getUsers(userId: $userId) {          
        id
        firstName
        secondName
        following {
          id
          user
        }
        followers {
          id
          user
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
`

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
            newConversations{
              id
              firstName
              secondName
            }
            followingCount
            followersCount
            following{
                id
                user
            }
            followers{
                id
                user
            }
        }
    }
`

export const SEARCH_USERS = gql`
    query($searchQuery: String!) {
        searchUsers(searchQuery: $searchQuery){
          firstName
          secondName
        }
        }
`
export const UPLOAD_PHOTO = gql`
  mutation($input: UploadUserPhotoInput!) {
    uploadUserPhoto(input: $input) {
      id image imagePublicId
    }
  }
`;
