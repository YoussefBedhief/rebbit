# Rebbit
![logo](https://github.com/YoussefBedhief/rebbit/assets/69478528/2be1cf2e-2782-4f81-825b-10877ae0ac1a)

This project is a reddit clone with Nextjs 13, TypeScript and Prisma and which includes many features like:
- Stunning design
- Login with Google account using next-auth
- Dark mode and light mode
- Improving performance using cashing with redis
- Parallel and intercepting route
- Possibility to create a community
- Manage Feed for authenticated users and non authenticated users
- Possibility to create a post with a stunning editor 
- What you see is what you get editor with Editorjs
- Possibility to comment to a post and reply to a comment
- Vote for post and for comment
- and much more feature ...

## Screenshots
![image](https://github.com/YoussefBedhief/rebbit/assets/69478528/4b11d8d0-c1b2-4514-9c76-c9564263f498)
![image](https://github.com/YoussefBedhief/rebbit/assets/69478528/b4db19da-8e08-4402-968e-3bf5e91ac588)

![image](https://github.com/YoussefBedhief/rebbit/assets/69478528/cb3c748e-bd0a-4f2c-8b5c-0a2abd34f396)
![image](https://github.com/YoussefBedhief/rebbit/assets/69478528/7c8eb013-f7d0-469c-9317-219262787830)

![image](https://github.com/YoussefBedhief/rebbit/assets/69478528/2638bf3f-4799-4283-b7f4-de65b24008cc)

![image](https://github.com/YoussefBedhief/rebbit/assets/69478528/0e74014c-8fed-4082-93c7-f1c089d91cad)
![image](https://github.com/YoussefBedhief/rebbit/assets/69478528/efa1133f-ff55-44bf-b2b2-78d1a8112641)






## Technologies used
<a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/> </a><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/></a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a><a href="https://cloud.google.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="gcp" width="40" height="40"/> </a><a href="https://redis.io" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="40" height="40"/> </a><a href="https://www.prisma.io/" target="_blank" rel="noreferrer"> <img src="https://github.com/YoussefBedhief/rebbit/assets/69478528/9a7198a1-4b47-4d16-b236-af9bcfb28c8b" alt="redis" width="40" height="40"/> </a>


## Clone the project

Clone the project with this command
```bash
  git clone [https://link-to-project](https://github.com/YoussefBedhief/rebbit.git)
```

Go to the directory
```bash
  cd real-time-chat
```

Install all the dependencies
```bash
  npm install
```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXTAUTH_SECRET`

`REDIS_URL`

`REDIS_SECRET`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`DATABASE_URL`

`UPLOADTHING_SECRET`

`UPLOADTHING_APP_ID`
