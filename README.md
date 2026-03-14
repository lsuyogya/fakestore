Vercel And Netlify Bots seem to be blacklisted by cloudflare protection or some other anti-bot measure on fakestore api. SSR data fetch requests failed at build time when deploying. Since the task specifically asked for data fetching at SSR, I did not change the data fetching logic to CSR. The build works fine locally.

Please run the project locally.  

## Running the Project Locally

After cloning,

### 1. Install Dependencies

Install the required packages using npm.

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root and copy the contents from `.env.sample`.
Update the values in `.env` as needed.

### 3. Run the Development Server

```bash
npm run build
npm run start
```

### 4. Open the Application

Open the application in your browser:

```
http://localhost:3000
```
