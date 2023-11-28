
## Introduction

This README outlines the steps to run and test this web application built using TypeScript React, Tailwind CSS, Next.js, Apollo, Graphql, and SQLite3

## Prerequisites

Before proceeding, ensure you have Node.js and npm installed

## Setting up the project

1. **Clone the repository**
2. **Install Dependencies**

## Running the Development Server

1. Start the frontned: 
    - in root directory run : 
    ```bash
     npm run dev
     ```

2. **Start the Backend Server**:
   - Open a new terminal window and navigate to the server directory:
     ```bash
     cd server
     ```
   - Start the server using Node.js:
     ```bash
     node index.js
     ```


## Accessing Apollo Server
- Once the servers are running, you can access the Apollo server at `http://localhost:4000`.
- Here, you can run GraphQL queries and mutations.


## Mutations

 ```bash
mutation SignUp {
  signUp(email: "test@gmail.com", password: "test1234") {
    id
    email
  }
}
```

 ```bash
mutation {
  signIn(email: "test@gmail.com" , password: "password123") {
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
```

 ```bash
mutation UpdateProfile {
  updateProfile(
    userId: 1
    companyName: "Example"
    companyDescription: "Example"
    companyCategory: "Technology"
  ) {
    id
    email
    companyName
    companyDescription
    companyCategory
  }
}
```

 ```bash
mutation AddToCart {
  addToCart(userId: 1, productId: 1) {
    id
    userId
    productId
  }
}
```

## Queries

 ```bash
query GetCartItemsByUserId {
  getCartItemsByUserId(userId: 1) {
    id
    title
    description
    price
  }
}
```
