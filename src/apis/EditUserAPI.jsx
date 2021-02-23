import gql from 'graphql-tag';

export const CHANGE_FIRSTNAME = gql`
  mutation($id: ID!, $newFirstName: String!) {
    changeFirstName(id: $id, newFirstName: $newFirstName) {
      firstName
    }
  }
`;

export const CHANGE_SECONDNAME = gql`
  mutation($id: ID!, $newSecondName: String!) {
    changeSecondName(id: $id, newSecondName: $newSecondName) {
      secondName
    }
  }
`;
export const CHANGE_EMAIL = gql`
  mutation($id: ID!, $newEmail: String!) {
    changeEmail(id: $id, newEmail: $newEmail) {
      email
    }
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation($id: ID!, $newPassword: String!) {
    changeEmail(id: $id, newPassword: $newPassword) {
      id
    }
  }
`;
export const UPLOAD_PHOTO = gql`
  mutation($input: UploadUserPhotoInput!) {
    uploadUserPhoto(input: $input) {
      id
    }
  }
`;

export const UPLOAD_PHOTOS = gql`
  mutation uploadUserPhotos($input: UploadUserPhotosInput) {
    uploadUserPhotos(input: $input) {
      id
    }
  }
`;

export const DELETE_USER_PHOTOS = gql`
  mutation deleteUserPhotos($deleteUserPhotosInput: DeleteUserPhotosInput) {
    deleteUserPhotos(deleteUserPhotosInput: $deleteUserPhotosInput) {
      images {
        image
      }
    }
  }
`;
export const DELETE_USER_COVER_PHOTO = gql`
  mutation deleteUserCoverPhoto($id: ID!, $coverImage: String, $coverImagePublicId: String) {
    deleteUserCoverPhoto(
      id: $id
      coverImage: $coverImage
      coverImagePublicId: $coverImagePublicId
    ) {
      coverImage
    }
  }
`;
