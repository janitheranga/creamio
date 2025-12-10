# 🥛 Creamio - Premium Dairy Products E-Commerce

A modern, responsive e-commerce platform for premium dairy products built with Next.js, React, and Tailwind CSS.

## 📋 Project Overview

Creamio is a full-featured e-commerce application specializing in artisan dairy products. The platform provides an intuitive shopping experience with advanced filtering, real-time cart management, wishlist functionality, and dynamic flash sales.

### Key Features

- **🛍️ Product Browsing**: Browse products with multiple view options (grid, 2-column, 3-column, 4-column layouts)
- **🔍 Smart Filtering**: Filter products by category, price range, and stock availability
- **⚡ Flash Sales**: Dynamic flash sales with real-time countdown timer
- **🛒 Shopping Cart**: Add/remove items, manage quantities with persistent state management
- **❤️ Wishlist**: Save favorite products for later with persistent storage
- **📱 Fully Responsive**: Mobile-optimized design with adaptive layouts
- **🎨 Beautiful UI**: Custom color palette (Celadon, Icy Aqua, Tea Green, Cherry Blossom)
- **✨ Smooth Animations**: Framer Motion animations throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd creamio
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm run dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── sections/       # Page sections (Hero, Categories, Reviews, etc.)
│   ├── ui/             # UI components (Dialog, Dropdown, etc.)
│   ├── TopNavbar.tsx   # Main navigation with cart sidebar
│   ├── Footer.tsx      # Footer component
│   └── ...
├── lib/                # Utilities and store management
│   ├── data.ts         # Product and category data
│   ├── utils.ts        # Helper functions
│   └── store/          # Zustand state management
├── flash-sales/        # Flash sales page with countdown timer
├── products/           # Products listing and filtering
├── cart/               # Shopping cart page
├── wishlist/           # Wishlist management
├── about/              # About page
├── contact/            # Contact page
└── globals.css         # Global styles and color variables
```

## 🎨 Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Image Optimization**: Next.js Image component
- **Type Safety**: TypeScript

## 🎯 Core Features

### Product Management
- Dynamic product filtering by category, price, and availability
- Multiple view layouts for different screen sizes
- Detailed product information with ratings and reviews
- Stock level indicators

### Shopping Features
- Real-time cart management with quantity controls
- Persistent cart storage using Zustand
- Wishlist functionality for saved products
- One-click add-to-cart from product listings

### Flash Sales
- Live countdown timer for sales duration
- Discounted pricing with percentage savings
- Maximum discount and average savings statistics
- Flash sale product filtering and sorting

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Optimized layouts for all screen sizes
- Mobile menu with smooth animations
- Touch-friendly interface

## 📦 Color Palette

- **Celadon**: Primary brand color (#36c971)
- **Icy Aqua**: Secondary color (#21dbde)
- **Tea Green**: Accent color (#91d926)
- **Cherry Blossom**: Alert/sale color (#ff002b)

## 🔧 Available Scripts

```bash
# Development
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Lint code
pnpm run lint
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: 1024px+ (lg)

## 🎬 Component Highlights

### TopNavbar
- Sticky navigation with logo and search
- Shopping cart sidebar with detailed preview
- Mobile menu with full-screen overlay and portal rendering
- Quick links to essential pages

### Flash Sales Page
- Real-time countdown timer (HH:MM:SS format)
- Statistics cards (max discount, product count, average savings)
- Sorting options (discount, price, rating)
- Responsive product grid

### Products Page
- Advanced filtering sidebar
- Multiple layout options (default on 3-column for desktop)
- Sort by featured, price, or rating
- Display count selector (6, 12, 24, 48)
- Mobile-responsive grid (1-column on mobile)

## 🚀 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Efficient state management with Zustand
- Memoized selectors to prevent unnecessary re-renders
- Tailwind CSS purging for optimized bundle
- Portal-based overlays for better performance

## 🛠️ Recent Updates

- ✅ Fixed mobile menu overlay with React Portal
- ✅ Implemented working countdown timer for flash sales
- ✅ Added icon support to mobile navigation menu
- ✅ Mobile menu closes on navigation
- ✅ Cleaned up globals.css (removed dark mode code)
- ✅ 3-column default layout for products page
- ✅ Mobile-responsive product grid

## � Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 📄 License

This project is open source and available under the MIT License.

---

Made with ❤️ for dairy lovers everywhere
