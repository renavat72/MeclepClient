import gql from 'graphql-tag'

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
    $imagesOfEvent: String
) {
  createPost(
    infoPost:{
      timeOfEvent: $timeOfEvent
      nameOfEvent: $nameOfEvent
      typeOfEvent: $typeOfEvent
      aboutOfEvent:  $aboutOfEvent
      privateEvent: $privateEvent
      notifyFriends:  $notifyFriends
      adultEvent:  $adultEvent
      imagesOfEvent: $imagesOfEvent
      },
      locationOfEvent:{
          lat: $lat
          lng: $lng
          address: $address
      }
     )
    {
    id createdAt firstname timeOfEvent nameOfEvent typeOfEvent aboutOfEvent address lat lng imagesOfEvent
    likes{
      id firstname secondname createdAt
    }
    likeCount
    comments{
      id body firstname secondname createdAt
    }
    commentCount
  }
}
`
export const REGISTER_USER = gql`
mutation register(
   $firstname: String!
   $secondname: String!
   $email: String!
   $password: String!
   $confirmPassword: String!
) {
    register(
        registerInput: {
            firstname: $firstname
            secondname: $secondname
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ){
        id email firstname secondname createdAt token
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
        firstname
        secondname
        createdAt
        token
    }
}
`

export const CHANGE_FIRSTNAME = gql`
    mutation($currentFirstname: String!, $newFirstname: String!){
        changeFirstname(currentFirstname: $currentFirstname, newFirstname: $newFirstname){
            firstname
        }
    }
`;

export const CHANGE_SECONDNAME = gql`
    mutation($currentSecondname: String! $newSecondname: String!){
        changeInfo( currentSecondname: $currentSecondname, newSecondname: $newSecondname){
            secondname
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            firstname
            secondname
            createdAt
            email
            profileImage
        }
    }
`;

export const GET_ALL_USERS = gql`
    query{
        getUsers{
            id
            createdAt
            firstname
            secondname
            profileImage
        }
    }

`

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
            firstname
            secondname
            privateEvent
            notifyFriends
            adultEvent
            imagesOfEvent
            likeCount
            likes{
                id
                # firstname
                # secondname
            }
        }
    }
`
export const FETCH_POST_QUERY = gql`
   query {
        getPost{
            id
            nameOfEvent
            aboutOfEvent
            timeOfEvent
            address
            lat
            lng
            typeOfEvent
            createdAt
            firstname
            secondname
            privateEvent
            notifyFriends
            adultEvent
            imagesOfEvent
            likeCount
            likes{
                id
                # firstname
                # secondname
            }
        }
    }
`
export const LIKE_POST = gql `
    mutation likePost($postID: ID!){
        likePost(postId: $postId)
        {
            id
            likes{
                id firstname secondname
            }
            likeCount
        }
    }
`

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`