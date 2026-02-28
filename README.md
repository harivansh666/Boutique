# Boutique

A modern fashion boutique application with client (frontend) and server (backend).

## Features

- Product management
- Order processing
- Custom stitching requests
- User authentication

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (via Neon DB)
- **ORM**: Drizzle

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/harivansh666/Boutique.git
   ```

2. Install dependencies:

   ```bash
   # In root directory
   cd client && npm install
   cd ../server && npm install
   ```

3. Configure environment variables in `server/.env`.

4. Run the development servers:
   ```bash
   # Client
   cd client && npm run dev
   # Server
   cd server && npm run dev
   ```
