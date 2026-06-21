# Presentation Generator

AI-powered PowerPoint presentation generator with email verification, cloud storage, and customizable styles.

##  Features

- The application uses the OpenAI API to generate JSON data, which is then converted into a presentation.
- Email registration with OTP verification using Brevo.
- JWT authentication (access + refresh tokens)
-  File storage in Cloudflare R2 (AWS S3 compatible)
-  Image support via Pexels API
-  Multiple presentation styles with ability to add custom ones

##  Tech Stack

**Backend:** NestJS, PostgreSQL, Prisma, Brevo  
**Frontend:** React, TypeScript, Tailwind CSS v4  
**AI:** OpenAI API  
**Storage:** Cloudflare R2  
**Images:** Pexels API  
**Email:** Brevo API

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BrehunKabuto/presgen.git
cd your-repo
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PORT` | Backend port (default: 3000) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for JWT signing |
| `ACCESS_SECRET` | Secret for access tokens |
| `REFRESH_SECRET` | Secret for refresh tokens |
| `OPENAI_API_KEY` | OpenAI API key → [platform.openai.com](https://platform.openai.com) |
| `PEXELS_API_KEY` | Pexels API key → [pexels.com/api](https://www.pexels.com/api/) |
| `AWS_ACCOUNT_ENDPOINT` | Cloudflare R2 endpoint |
| `AWS_ACCESS_KEY` | R2 access key |
| `AWS_SECRET_ACCESS_KEY` | R2 secret key |
| `BUCKET_NAME` | R2 bucket name |
| `PUBLIC_ACCESS_KEY` | R2 public URL |
| `MAIL_USER` | Gmail address for sending emails |
| `BREVO_API` | Brevo API key → [brevo.com](https://brevo.com) |
| `FRONTEND_URL` | Frontend URL (e.g. http://localhost:5173) |
| `NODE_ENV` | `development` or `production` |

### 4. Run migrations

```bash
npx prisma migrate dev
```

### 5. Start the app

```bash
pnpm start:dev
```

##  Adding Custom Styles

Copy the base template from `src/automizer/templates/`
Make your changes
rename file 
**Important:** Do not rename or delete existing elements in the template

##  API

### Create Presentation

**POST** `/presentation/generate`

> Requires authorization (Bearer token)

**Body:**

| Field | Type  | Description |
|---|---|---|
| `slideCount` | number  | Number of slides |
| `userPrompt` | string  | Topic or description |
| `providerName` | string  | AI provider (e.g. `OpenAI`) |
| `modelName` | string  | Specific model (e.g. `gpt-4o`) |
| `style` | string  | Presentation style name |

**Example:**

```json
{
  "slideCount": 10,
  "userPrompt": "Introduction to Machine Learning",
  "providerName": "OpenAI",
  "modelName": "gpt-4o",
  "style": "dark"
}
```
## Docker

### Run with Docker Compose

1. Copy `.env.example` to `.env` and fill in the values
2. Change `DATABASE_URL` to:
```env
   DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydb"
```
3. Start:
```bash
   docker-compose up --build
```
4. Run migrations:
```bash
   docker-compose exec backend npx prisma migrate deploy
```

App will be available at `http://localhost:3000`

## License

MIT © BrehunKabuto
