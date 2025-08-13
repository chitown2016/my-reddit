# Reddit App Design System

A cohesive design system that provides consistent, accessible, and beautiful user interfaces for the Reddit Popular Posts application.

## 🎨 Design Philosophy

Our design system is built on the principles of:
- **Consistency**: Unified visual language across all components
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Responsiveness**: Mobile-first approach with adaptive layouts
- **Performance**: Optimized animations and transitions
- **Maintainability**: CSS custom properties for easy theming and updates
- **Delight**: Engaging micro-interactions and smooth animations

## 🎯 Design Tokens

### Colors

#### Primary Colors
```css
--color-primary: #0079d3        /* Reddit's signature blue */
--color-primary-hover: #005fa3  /* Darker blue for hover states */
--color-primary-light: #e3f2fd  /* Light blue for backgrounds */
--color-primary-border: #bbdefb /* Blue border color */
```

#### Secondary Colors
```css
--color-success: #28a745        /* Green for success states */
--color-success-hover: #218838  /* Darker green for hover */
--color-neutral: #6c757d        /* Gray for secondary actions */
--color-neutral-hover: #5a6268  /* Darker gray for hover */
```

#### Text Colors
```css
--color-text-primary: #1a1a1b   /* Main text color */
--color-text-secondary: #666    /* Secondary text */
--color-text-muted: #999        /* Muted/disabled text */
```

#### Background Colors
```css
--color-bg-primary: #ffffff      /* Main background */
--color-bg-secondary: #f8f9fa   /* Secondary background */
--color-bg-tertiary: #f5f5f5    /* Tertiary background */
--color-bg-overlay: rgba(0, 0, 0, 0.7) /* Modal overlay */
```

#### Status Colors
```css
--color-error: #ff4444          /* Error states */
--color-error-bg: #ffe6e6       /* Error background */
--color-warning: #ffa500        /* Warning states */
--color-warning-bg: rgba(255, 165, 0, 0.1) /* Warning background */
```

### Typography

#### Font Families
```css
--font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
--font-family-mono: 'Courier New', monospace
```

#### Font Sizes
```css
--font-size-xs: 0.8rem    /* 12.8px */
--font-size-sm: 0.9rem    /* 14.4px */
--font-size-base: 1rem    /* 16px */
--font-size-lg: 1.1rem    /* 17.6px */
--font-size-xl: 1.2rem    /* 19.2px */
--font-size-2xl: 1.5rem   /* 24px */
--font-size-3xl: 1.8rem   /* 28.8px */
--font-size-4xl: 2.5rem   /* 40px */
```

#### Font Weights
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
```

#### Line Heights
```css
--line-height-tight: 1.2
--line-height-normal: 1.4
--line-height-relaxed: 1.6
```

### Spacing

```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 20px
--spacing-2xl: 24px
--spacing-3xl: 30px
--spacing-4xl: 40px
```

### Border Radius

```css
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
--radius-2xl: 16px
```

### Shadows

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.3)
```

### Transitions

```css
--transition-fast: 0.2s ease
--transition-normal: 0.3s ease
--transition-slow: 0.5s ease
--transition-bounce: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)
--transition-spring: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

## 🧩 Components

### Buttons

#### Basic Button
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-success">Success Button</button>
<button class="btn btn-outline">Outline Button</button>
```

#### Button Sizes
```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

#### Button Features
- **Accessibility**: Minimum 44px height for touch targets
- **Hover Effects**: Subtle lift animation with ripple effect
- **Focus States**: Clear outline for keyboard navigation
- **Responsive**: Full width on mobile devices
- **Micro-interactions**: Ripple effect and scale animation

### Cards

#### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here...</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

#### Card Features
- **Hover Effects**: Enhanced lift and shadow with shimmer effect
- **Consistent Padding**: 20px (16px on mobile)
- **Border Radius**: 12px for modern appearance
- **Flexible Layout**: Header, body, and footer sections
- **Shimmer Effect**: Subtle light sweep on hover

### Forms

#### Form Input
```html
<div class="form-group">
  <label class="form-label">Email Address</label>
  <input type="email" class="form-input" placeholder="Enter your email">
</div>
```

#### Form Features
- **Focus States**: Primary color border with glow effect
- **Accessibility**: Proper labels and minimum touch targets
- **Placeholder Styling**: Muted color for placeholder text
- **Responsive**: Full width inputs
- **Hover Effects**: Subtle lift and border color change

### Layout Components

#### Container
```html
<div class="container">
  <!-- Content with max-width and centered -->
</div>
```

#### Grid System
```html
<div class="grid grid-cols-auto gap-lg">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

#### Flexbox Utilities
```html
<div class="flex justify-between items-center gap-md">
  <span>Left Content</span>
  <span>Right Content</span>
</div>
```

## 🎭 Enhanced Animations

### Entrance Animations

#### Fade In
```css
.animate-fade-in {
  animation: fadeIn 0.3s ease;
}
```

#### Fade In Up
```css
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease;
}
```

#### Slide In
```css
.animate-slide-in {
  animation: slideIn 0.3s ease;
}
```

#### Bounce In
```css
.animate-bounce-in {
  animation: bounceIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

#### Scale In
```css
.animate-scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### Hover Effects

#### Hover Lift
```css
.hover-lift:hover {
  transform: translateY(-4px);
}
```

#### Hover Scale
```css
.hover-scale:hover {
  transform: scale(1.05);
}
```

#### Hover Rotate
```css
.hover-rotate:hover {
  transform: rotate(5deg);
}
```

#### Hover Glow
```css
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(0, 121, 211, 0.3);
}
```

### Continuous Animations

#### Loading Spinner
```css
.loading-spinner {
  animation: rotate 1s linear infinite;
}
```

#### Loading Dots
```css
.loading-dots span {
  animation: pulse 1.4s ease-in-out infinite both;
}
```

#### Pulse
```css
.animate-pulse {
  animation: pulse 2s infinite;
}
```

#### Float
```css
.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

#### Shimmer
```css
.animate-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
```

### Staggered Animations

Use staggered animation delays for sequential element animations:

```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

### Micro-interactions

#### Button Ripple Effect
Buttons include a subtle ripple effect on hover that expands from the center.

#### Card Shimmer
Cards feature a light sweep effect that moves across the surface on hover.

#### Form Focus Enhancement
Form inputs lift slightly and show a glow effect when focused.

#### Post Card Interactions
Post cards lift and scale on hover with enhanced shadows.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Up to 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px and above

### Mobile Adaptations
- **Typography**: Reduced font sizes for better readability
- **Spacing**: Adjusted padding and margins
- **Layout**: Single column grids, stacked flex containers
- **Buttons**: Full width for better touch targets
- **Animations**: Reduced motion for better performance

### Responsive Utilities
```css
/* Mobile-first approach */
.grid-cols-auto {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@media (max-width: 768px) {
  .grid-cols-auto {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
}
```

## ♿ Accessibility

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Clear focus indicators with primary color outline
- Logical tab order

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels where needed
- Screen reader only content with `.sr-only` class

### Color Contrast
- All text meets WCAG 2.1 AA contrast requirements
- High contrast mode support
- Color is never the only indicator of information

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  
  .btn:hover,
  .card:hover,
  .form-input:hover,
  .form-input:focus {
    transform: none !important;
  }
}
```

## 🛠️ Usage Guidelines

### When to Use Each Component

#### Buttons
- **Primary**: Main actions, form submissions
- **Secondary**: Alternative actions, cancellations
- **Success**: Positive actions, confirmations
- **Outline**: Secondary actions, links styled as buttons

#### Cards
- **Content Display**: Post cards, information panels
- **Interactive Elements**: Clickable content areas
- **Data Presentation**: Statistics, user information

#### Forms
- **User Input**: Search fields, contact forms
- **Data Entry**: Settings, preferences
- **Validation**: Error states, success feedback

#### Animations
- **Entrance**: Use for page loads and new content
- **Hover**: Enhance interactive elements
- **Loading**: Provide feedback during operations
- **Micro-interactions**: Add delight to user actions

### Best Practices

1. **Consistency**: Always use design tokens for colors, spacing, and typography
2. **Accessibility**: Include proper labels, focus states, and semantic HTML
3. **Responsive**: Test on multiple screen sizes
4. **Performance**: Use CSS transforms for animations
5. **Maintainability**: Use utility classes for common patterns
6. **Motion**: Respect user preferences for reduced motion

### Customization

The design system is built with CSS custom properties, making it easy to customize:

```css
:root {
  --color-primary: #your-brand-color;
  --font-family-primary: 'Your Font', sans-serif;
  --spacing-lg: 24px;
  --transition-spring: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## 📚 Examples

### Complete Component Example
```html
<div class="container">
  <h1 class="animate-fade-in">Welcome to Reddit Posts</h1>
  
  <div class="search-section animate-fade-in stagger-1">
    <form class="flex gap-md">
      <input 
        type="text" 
        class="form-input" 
        placeholder="Search posts..."
      >
      <button type="submit" class="btn btn-primary">
        🔍 Search
      </button>
    </form>
  </div>
  
  <div class="grid grid-cols-auto gap-lg">
    <div class="card animate-scale-in stagger-1 hover-lift">
      <div class="card-header">
        <h3>Post Title</h3>
      </div>
      <div class="card-body">
        <p class="text-secondary">Post content...</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline hover-glow">View Details</button>
      </div>
    </div>
  </div>
</div>
```

### Animation Showcase
Visit the `/design-system` route and navigate to the "Animations" tab to see all available animations in action.

This design system provides a solid foundation for building consistent, accessible, and delightful user interfaces while maintaining flexibility for future enhancements. 