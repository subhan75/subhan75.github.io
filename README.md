# Subhan's Portfolio & Blog

A modern, full-stack web application built with **TanStack Start** and TypeScript, designed to showcase projects, share insights, and demonstrate full-stack development capabilities.

## 🚀 Features

- **Modern Tech Stack**: Built with TanStack Start, React 19, TypeScript, and Vite
- **File-Based Routing**: Clean, scalable routing system using TanStack Router
- **UI Components**: Comprehensive component library using Radix UI and Tailwind CSS
- **Responsive Design**: Mobile-first approach with Tailwind CSS and React Resizable Panels
- **Form Handling**: Powerful form management with React Hook Form and Zod validation
- **State Management**: Server-side and client-side state management with TanStack Query
- **Data Visualization**: Charts and graphs with Recharts
- **Accessibility**: Built with accessibility in mind using Radix UI primitives

## 📋 Tech Stack

### Frontend
- **Framework**: React 19
- **Routing**: TanStack Router & TanStack Start
- **Styling**: Tailwind CSS + Vite integration
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Data Fetching**: TanStack Query

### Development
- **Language**: TypeScript
- **Build Tool**: Vite
- **Linting**: ESLint
- **Formatting**: Prettier
- **Node**: Nitro 3

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/subhan75/subhan75.github.io.git
   cd subhan75.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🛠️ Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build the project for production
- **`npm run build:dev`** - Build in development mode (useful for debugging)
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run format`** - Format code with Prettier

## 📁 Project Structure

```
src/
├── routes/              # File-based routing (TanStack Router)
│   ├── __root.tsx      # App shell/layout
│   ├── index.tsx       # Home page
│   ├── about.tsx       # About page
│   └── ...other routes
├── components/         # Reusable UI components
├── lib/               # Utility functions and helpers
└── ...other directories
```

### Routing Conventions

- **`index.tsx`** → `/`
- **`about.tsx`** → `/about`
- **`users/index.tsx`** → `/users`
- **`users/$id.tsx`** → `/users/:id` (dynamic route)
- **`posts/{-$category}.tsx`** → `/posts/:category?` (optional segment)
- **`files/$.tsx`** → `/files/*` (catch-all route)
- **`__root.tsx`** → App shell (wraps all pages)

For detailed routing documentation, see [src/routes/README.md](./src/routes/README.md).

## 🎨 Styling

This project uses **Tailwind CSS v4** with Vite integration for fast, utility-first styling. Component library built with Radix UI primitives ensures accessibility and consistency.

### Tailwind Features
- Dark mode support
- Responsive utilities
- Custom animations with `tw-animate-css`
- PostCSS integration

## 📝 Key Dependencies

| Package | Purpose |
|---------|---------|
| `@tanstack/react-start` | Full-stack framework |
| `@tanstack/react-router` | Type-safe routing |
| `@tanstack/react-query` | Data fetching & caching |
| `@radix-ui/*` | Unstyled, accessible UI primitives |
| `tailwindcss` | Utility-first CSS framework |
| `react-hook-form` | Performant form state management |
| `zod` | TypeScript-first schema validation |
| `recharts` | Composable charting library |

## 🚀 Deployment

This is a GitHub Pages site. The site is deployed at:
- **URL**: https://subhan75.github.io

### Deploy Changes
1. Merge your PR to `main`
2. GitHub Actions will automatically build and deploy

## 💡 Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run linting: `npm run lint`
4. Format code: `npm run format`
5. Commit with clear messages
6. Push and create a Pull Request

## 📚 Learning Resources

- [TanStack Start Documentation](https://tanstack.com/start/latest)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)

## 📄 License

This project is open source. Feel free to use it as a template or reference for your own projects.

## ✨ About

Built by **Subhan** as a portfolio and blogging platform. Showcasing modern full-stack development practices with TypeScript, React, and cutting-edge tooling.

---

**Last Updated**: June 2026
