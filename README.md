This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install yarn packages and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


The application uses `next-firebase-auth` package for providing firebase authentication to nextjs projects. The users can login with custom username and password or can use google credentials via oauth2.

firebase configs are provided from environment variables stored in .env.local file as below (this is git ignored).

Field | Value
--- | ---
NEXT_PUBLIC_API_HOST | Firebase api key
FIREBASE_CLIENT_EMAIL | $email client
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY | public key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL | database url
NEXT_PUBLIC_FIREBASE_PROJECT_ID | firebase project id
COOKIE_SECRET_CURRENT | cookie secret
COOKIE_SECRET_PREVIOUS | cookie secret (different from above)
NEXT_PUBLIC_COOKIE_SECURE | secure cookie (boolean)
NEXT_PUBLIC_FIREBASE_APP_NAME | firebase application name
FIREBASE_PRIVATE_KEY | private key
---

### Deploy Using Docker (Recommended)

```
> docker run -t woven_box_ui . --build-arg COOKIE_SECRET_PREVIOUS=$COOKIE_SECRET_PREVIOUS --build-arg COOKIE_SECRET_CURRENT=$COOKIE_SECRET_CURRENT --build-arg NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=$NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY --build-arg NEXT_PUBLIC_FIREBASE_APP_NAME=$NEXT_PUBLIC_FIREBASE_APP_NAME --build-arg NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

> docker run -it --name woven_box_ui -p 3000:3000 -e NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST -e FIREBASE_CLIENT_EMAIL=$FIREBASE_CLIENT_EMAIL -e NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=$NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY -e NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN -e NEXT_PUBLIC_FIREBASE_DATABASE_URL=$NEXT_PUBLIC_FIREBASE_DATABASE_URL -e NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID -e COOKIE_SECRET_CURRENT=$COOKIE_SECRET_CURRENT -e COOKIE_SECRET_PREVIOUS=$COOKIE_SECRET_PREVIOUS -e NEXT_PUBLIC_COOKIE_SECURE=$NEXT_PUBLIC_COOKIE_SECURE -e NEXT_PUBLIC_FIREBASE_APP_NAME=$NEXT_PUBLIC_FIREBASE_APP_NAME
```

Then open [http://localhost:3000](http://localhost:3000)



## How to stop and remove

```bash
> docker stop woven_box_ui
> docker rm woven_box_ui
```

### END
