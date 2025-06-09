This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
Having [`Node.js`](https://nodejs.org/en) installed on your PC is mandatory to run this application.

## Getting Started, Deploy app

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
Both API and frontend are included in the same project, so you should be able to access everything once the app is running.

**WARNING:** If the app doesn't load information, please make sure you specified the right app url on `line 12` in `app/page.tsx`

### API Endpoints
- `GET /api/cats` - Retrieve all cats in the database
- `GET /api/cats/[id]` - Retrieve a cat with specified id
- `POST /api/cats` - Add new a cat in the database. Make sure to include `photo_url, name, age, weight` fields in the formData request body
- `DELETE /api/cats/[id]` - Delete a given cat id from the database

## How the application and api could be extended and improved
Regarding the api, we can create more endpoints, for example, update cat information.
The application could be improved in many ways such as:
 - Add a favorite cat
 - Sort cat by age or weight on the web page
 - Create a kind of relationship between cats, like parent, child or brother
 - Add more information about cats, like skin color, birthdate, eye color

## Packages versions used
### Next: 15.3.3
### React & React-dom: 19.0.0
### sqlite: 5.1.1 
### sqlite3: 5.1.7
### zod: 3.25.56

