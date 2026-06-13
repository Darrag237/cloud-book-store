# 📚 Cloud Book Store

A full-stack online bookstore application built with **Next.js 15**, **TypeScript**, and **MongoDB**, fully containerized with **Docker** and served through **Nginx** as a reverse proxy.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS, Radix UI, shadcn/ui |
| Database | MongoDB 6.0 (via Mongoose) |
| Auth | JWT + bcryptjs |
| Containerization | Docker, Docker Compose |
| Reverse Proxy | Nginx |
| Package Manager | pnpm |

---

## 📁 Project Structure

```
cloud-book-store/
├── app/               # Next.js App Router (pages & API routes)
├── components/        # Reusable UI components (shadcn/ui + custom)
├── hooks/             # Custom React hooks
├── lib/               # Utilities, DB connection, helpers
├── styles/            # Global CSS
├── public/            # Static assets
├── scripts/           # Utility scripts
├── init-db/           # Database seed/init scripts
├── init-mongo/        # MongoDB initialization scripts (Docker entrypoint)
├── nginx/conf.d/      # Nginx reverse proxy configuration
├── Dockerfile         # Multi-stage production Docker build
├── docker-compose.yml # Full stack orchestration
└── start-project.sh   # Project startup script
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://mongo:27017/bookstore
JWT_SECRET=your_jwt_secret_key_here
MONGO_USER=admin
MONGO_PASSWORD=your_secure_password
MONGO_DB=bookstore
```

---

## 🐳 Getting Started with Docker (Recommended)

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) installed

### Run the application

```bash
# Clone the repository
git clone https://github.com/Darrag237/cloud-book-store.git
cd cloud-book-store

# Copy and configure environment variables
cp .env.example .env   # then edit .env with your values

# Start all services
docker-compose up --build -d
```

The app will be available at **http://localhost:3000**

### Stop the application

```bash
docker-compose down
```

To also remove stored data volumes:

```bash
docker-compose down -v
```

---

## 💻 Local Development (Without Docker)

### Prerequisites
- Node.js 18+
- pnpm
- MongoDB running locally

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Docker Architecture

The `docker-compose.yml` orchestrates two services on a shared `bookstore-network`:

```
┌─────────────────────────────────────┐
│           bookstore-network         │
│                                     │
│  ┌─────────────┐  ┌──────────────┐  │
│  │  Next.js    │  │   MongoDB    │  │
│  │  :3000      │──│   :27017     │  │
│  └─────────────┘  └──────────────┘  │
│         │                           │
└─────────┼───────────────────────────┘
          │
     Nginx Proxy
```

The Dockerfile uses a **multi-stage build** (deps → builder → runner) to produce a lean production image.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `./start-project.sh` | Start the full project (Docker) |

---

## 🔒 Authentication

Authentication is handled via **JSON Web Tokens (JWT)**. Passwords are hashed using **bcryptjs** before being stored in MongoDB.

---

## 📦 Key Dependencies

- **Next.js 15** — App Router, Server Actions, API Routes
- **Radix UI / shadcn/ui** — Accessible, composable UI primitives
- **Mongoose** — MongoDB ODM
- **React Hook Form + Zod** — Form handling and schema validation
- **Recharts** — Data visualization
- **next-themes** — Dark/light mode support

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built by [@Darrag237](https://github.com/Darrag237)
