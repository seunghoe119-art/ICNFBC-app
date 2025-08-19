# replit.md

## Overview

This is a modern basketball club website built with React and TypeScript. The application serves as a landing page and membership portal for "ICN FIRE," a workplace basketball club that focuses on structured 5-on-5 training and team development. The site features a multi-page design with smooth slide animations between pages, including home, about, rules, finance, and contact pages with membership application functionality.

## Recent Changes (January 2025)

- **Converted from single-page to multi-page architecture**: Transformed the scroll-based single-page layout into a React Router-based multi-page structure
- **Added page transition animations**: Implemented directional slide animations using framer-motion - pages slide left-to-right when moving to right menu items, right-to-left when moving to left menu items
- **Implemented scroll-based navigation animations**: 
  - Navigation hides when scrolling down and appears when scrolling up or at top
  - Footer slides up from bottom when near end of page content
  - Both use smooth CSS transforms with proper transition timing
- **Restructured navigation system**: Updated Navigation and Footer components to use router links instead of scroll-to-section functionality
- **Created page-based components**: Organized sections into dedicated pages in src/pages/ directory
- **Enhanced layout structure**: Fixed Navigation and Footer with proper content padding to prevent overlapping

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Pattern**: RESTful API endpoints for membership applications and contact messages
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot module replacement via Vite middleware integration

### Component Design
- **Layout**: Multi-page application with persistent Navigation and Footer
- **Page Structure**: 
  - Home (/): Hero, About, Highlights, Tournaments
  - About Us (/about): Schedule, News
  - Rules (/rules): Rules, JoinUs
  - Finance (/finance): Finance
  - Join Us (/contact): Contact
- **Page Transitions**: Right-to-left slide animations using framer-motion
- **Component Structure**: Modular section-based components organized into page layouts
- **Design System**: Consistent design tokens using CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### Data Layer
- **Schema Definition**: Shared TypeScript types using Drizzle ORM schema definitions
- **Database Preparation**: Drizzle configuration setup for PostgreSQL (schema ready but currently using in-memory storage)
- **Type Safety**: End-to-end type safety from database schema to frontend components

### Development Workflow
- **Build System**: ESBuild for server bundling, Vite for client bundling
- **Development Server**: Express server with Vite middleware for hot reloading
- **Code Organization**: Monorepo structure with shared types and schemas

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM (configured for PostgreSQL)
- **@neondatabase/serverless**: Database driver for Neon PostgreSQL
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### UI Components
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Tools
- **vite**: Frontend build tool and development server
- **typescript**: Type checking and compilation
- **esbuild**: Server-side bundling
- **drizzle-kit**: Database migration and introspection tools

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling (conditional)