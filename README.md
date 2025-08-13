# Reddit Popular Posts App

A modern React application that displays popular Reddit posts with a cohesive design system, search functionality, and interactive features.

## ✨ Features

- **📱 Responsive Design**: Mobile-first approach with adaptive layouts
- **🎨 Cohesive Design System**: Consistent UI components and design tokens
- **🔍 Search Functionality**: Search Reddit posts across multiple categories
- **📊 Category Filtering**: Filter posts by technology, gaming, science, and more
- **🎥 Media Support**: Display videos and images from Reddit posts
- **📋 Raw JSON View**: Developer-friendly JSON data display
- **♿ Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **⚡ Performance**: Optimized with React 19 and modern build tools

## 🎨 Design System

This application features a comprehensive design system that ensures consistency and accessibility across all components.

### Design System Features

- **🎯 Design Tokens**: CSS custom properties for colors, typography, spacing, and more
- **🧩 Component Library**: Reusable UI components (buttons, cards, forms, layouts)
- **📱 Responsive Utilities**: Mobile-first grid and flexbox utilities
- **♿ Accessibility**: Focus states, screen reader support, and keyboard navigation
- **🎭 Animations**: Smooth transitions and hover effects
- **🌙 Theme Support**: Easy customization and theming capabilities

### View the Design System

Visit `/design-system` in the application to see all available components and their variations.

### Design System Documentation

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for comprehensive documentation including:
- Design tokens and their usage
- Component examples and variations
- Accessibility guidelines
- Responsive design patterns
- Customization options

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-reddit
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── PostsView.jsx    # Main posts display
│   ├── PostDetailModal.jsx # Post detail modal
│   ├── RawJsonView.jsx  # JSON data view
│   └── DesignSystemShowcase.jsx # Design system demo
├── features/            # Redux slices
│   └── reddit/         # Reddit API integration
├── styles/             # CSS files
│   └── design-system.css # Design system styles
├── assets/             # Static assets
└── __tests__/          # Test files
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run e2e` - Run end-to-end tests

## 🎯 Key Components

### PostsView
The main component that displays Reddit posts with:
- Category filtering
- Search functionality
- Post cards with media support
- Modal detail views

### Design System
A comprehensive showcase of all UI components including:
- Button variants and sizes
- Card layouts and styles
- Form elements
- Typography examples
- Color palette
- Layout utilities

## 🔧 Customization

### Design System Customization

The design system is built with CSS custom properties, making it easy to customize:

```css
:root {
  --color-primary: #your-brand-color;
  --font-family-primary: 'Your Font', sans-serif;
  --spacing-lg: 24px;
}
```

### Adding New Components

1. Create your component in `src/components/`
2. Use design system classes and tokens
3. Add examples to the design system showcase
4. Update documentation as needed

## 📱 Responsive Design

The application uses a mobile-first approach with:
- **Mobile**: Up to 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: 1025px and above

All components automatically adapt to different screen sizes.

## ♿ Accessibility

The application follows WCAG 2.1 AA guidelines:
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Semantic HTML structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the design system guidelines
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Reddit API for providing the data
- React team for the amazing framework
- The design system community for best practices
