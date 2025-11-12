# A2SV Food Wagen

The **Food Wagen** is a web application designed for the efficient management of food items, including viewing, searching, adding, editing, and deleting food entries.

- **Live link:** https://the-food-wagen.vercel.app
- **Design link:** [Figma Design](https://www.figma.com/design/4VRw3oQRrn0WWwHSqgyhCF/Eskalate-Hiring-2025---Web-Assessment?node-id=1-189&t=BZCH8M1Sd3UnXoGW-0)

## 🚀 Core Features

- **Food Item Management (CRUD):** Complete functionality to add, edit, and delete food items.
- **Search & Filtering:** Filtering of food items by name via API calls.
- **Responsive Design:** Fully responsive layout adhering to the provided Figma design for mobile, tablet, and desktop views.

## 🏗️ Tech Stack

- **Framework:** Next.js (React + TypeScript)
- **Styling:** TailwindCSS
- **UI Components:** Shadcn/ui
- **State Management:** Redux Toolkit + React Context API
- **HTTP Client:** Axios + Interceptors
- **Forms & Validation** React Hook Form + Zod
- **Testing Jest** / React Testing Library
- **Package Manager**: npm

## ⚙️ Project Setup

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (18+ recommended)
- npm (or yarn/pnpm)
- Git

```bash
# Clone the repository
git clone https://github.com/aimedivin/food-wagen.git

# Navigate to the project directory
cd food-wagen

# Install dependencies
npm install
- Add require environment variable as listed in .env.example

# Start the development server
npm run dev
```

To build and run the application in production mode:

```bash
# Build the project
npm run build

# Start the production server
npm start
```

### 🧪 Testing

The project includes tests using Jest and React Testing Library for critical functionality

#### Test Scenarios Covered

- Component Rendering
- User Interaction.
- API Mocking

```bash
# Run all Tests
npm run test

# Run test and view coverage
npm run test:coverage
```
