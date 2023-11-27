import { gql } from "@apollo/client";

export const GET_PACKAGES = gql`
  query GetPackages {
    getProducts {
      id
      title
      description
      price
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        companyName
        companyDescription
        companyCategory
      }
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($userId: ID!, $companyName: String, $companyDescription: String, $companyCategory: String) {
    updateProfile(
      userId: $userId
      companyName: $companyName
      companyDescription: $companyDescription
      companyCategory: $companyCategory
    ) {
      id
      email
      companyName
      companyDescription
      companyCategory
    }
  }
`;
