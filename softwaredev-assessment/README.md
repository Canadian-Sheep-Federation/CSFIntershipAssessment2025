This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# API Functionality

Using http://localhost:3000/api/createReview you can create a Review for an NBA team. ['Create Review' API Documentation](./app/api/createReview/createReview.md)

Using `http://localhost:3000/api/getCommentsbyId?teamId=${id}?' you can get all the comments associated with a team based on the team's Id. ['GetCommentsById' API Documentation](./app/api/getCommentsbyId/getComments.md)

# Application

NBA Review Application that allows users to leave comments and rating on any NBA team.

Reviews, when submitted, are sent as documents to a collection in MongoDB through the 'createReview/route.ts'

When you click on the 'Review/Comments' button on an NBA team, a [Review Form](./app/components/ReviewForm.tsx) is loaded as well as any comments made previously on the team. The comments are automatically loaded when routed to the page.

API usage is modularized for easier reading and debugging.
All API functions are located [here](./app/APIfunctions/)

# Improvement and Extension
The application could use some character limits for the inputs
The frontend could also have error handling to maintain clarity with users
The UI could be more organized and modernized to look better
Could be extended to allow users create accounts and authenticate themselves.
Calculate and display the average rating for each team.

The API could have better error handling.
API functions could be designed to run and cache results before getting to the page that needs the results.
Make two different collections in MongoDB for each conference for better and more efficient storage.

Unit tests would be helpful in ensuring functionality remains the same accross all unchanged features.


# Deployment
The application could be deployed using Vercel or AWS CodeDeploy
API should utilize API Keys and rate limits to prevent unauthorized usage and overusage.

