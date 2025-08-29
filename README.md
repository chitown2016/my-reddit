# Reddit Popular Posts App

A modern React application that displays popular Reddit posts with search functionality and interactive features.

## ✨ Features

- **📱 Responsive Design**: Mobile-first approach with adaptive layouts

- **🔍 Search Functionality**: Search Reddit posts across multiple categories
- **📊 Category Filtering**: Filter posts by technology, gaming, science, and more
- **🎥 Media Support**: Display videos and images from Reddit posts
- **📋 Raw JSON View**: Developer-friendly JSON data display
- **♿ Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **⚡ Performance**: Optimized with React 19 and modern build tools





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
│   └── RawJsonView.jsx  # JSON data view
├── features/            # Redux slices
│   └── reddit/         # Reddit API integration
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




## 🔧 Customization

### Adding New Components

1. Create your component in `src/components/`
2. Add tests for new features
3. Update documentation as needed

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
3. Follow the coding guidelines
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Reddit API for providing the data
- React team for the amazing framework
- The React community for best practices
