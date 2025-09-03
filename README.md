# Price List Manager

A modern price list management application built with React, TypeScript, and cutting-edge web technologies. This project demonstrates modern frontend development skills and architecture patterns.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🛠️ Tech Stack

- **React 18** + **TypeScript** - Modern, type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Powerful data management
- **React Router** - Client-side routing
- **Yarn** - Fast dependency management

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **Yarn** 1.22.0 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/kfkkail/price-list-manager-app.git
cd price-list-manager-app

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── types/              # TypeScript definitions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
├── test-utils.tsx      # Testing utilities and providers
└── setupTests.ts       # Jest test configuration
```

## 🎯 What This Project Demonstrates

- **Modern React Patterns** - Hooks, TypeScript, component architecture
- **Build Tooling** - Vite configuration and optimization
- **Styling** - Tailwind CSS implementation
- **Data Management** - TanStack Query setup
- **Routing** - React Router implementation
- **Testing** - Comprehensive Jest test coverage

## 🧪 Testing

This project uses Jest and React Testing Library for unit testing, along with Chromatic for visual regression testing.

### Unit Testing

```bash
# Run tests in watch mode
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests for CI
yarn test:ci
```

### Test Coverage
- **App Component** - Routing and component integration tests
- **Dashboard Component** - UI rendering and accessibility tests
- **Main Entry Point** - App initialization and provider setup tests
- **Test Utilities** - Reusable testing functions and providers

### Test Structure
- **Component Tests** - Verify rendering, props, and user interactions
- **Integration Tests** - Test component interactions and routing
- **Accessibility Tests** - Ensure proper ARIA attributes and semantic HTML
- **Utility Tests** - Test helper functions and custom hooks

### Visual Testing with Chromatic

This project uses [Chromatic](https://www.chromatic.com/) for visual regression testing, which automatically captures screenshots of your components and detects visual changes.

#### How It Works

- **Automatic Testing:** Every PR automatically runs Chromatic to capture visual snapshots
- **Visual Regression Detection:** Chromatic compares screenshots across commits to detect unintended visual changes
- **Cross-Browser Testing:** Tests across multiple browsers and viewports
- **Accessibility Testing:** Built-in accessibility checks for each component

#### Storybook Stories

Components are documented and tested using Storybook stories:

```bash
# View stories locally
yarn storybook

# Build stories for production
yarn build-storybook
```

Stories are located in `src/**/*.stories.tsx` files and provide:
- Component documentation
- Interactive examples
- Visual testing scenarios
- Accessibility testing

## 🔗 Links
- **GitHub**: [kfkkail/price-list-manager-app](https://github.com/kfkkail/price-list-manager-app)

---

*This project showcases modern frontend development skills and serves as a portfolio piece demonstrating React, TypeScript, and modern web development expertise.*
