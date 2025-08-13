import React, { useState } from 'react';
import '../styles/design-system.css';

function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState('buttons');

  const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'layout', label: 'Layout' },
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Colors' },
    { id: 'animations', label: 'Animations' },
    { id: 'error-recovery', label: 'Error Recovery' }
  ];

  return (
    <div className="container">
      <h1 className="animate-fade-in">Design System Showcase</h1>
      <p className="text-secondary text-center animate-fade-in stagger-1">
        A comprehensive guide to all design system components and their variations
      </p>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-md mb-4xl animate-fade-in stagger-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="animate-fade-in-up stagger-3">
        {activeTab === 'buttons' && <ButtonsSection />}
        {activeTab === 'cards' && <CardsSection />}
        {activeTab === 'forms' && <FormsSection />}
        {activeTab === 'layout' && <LayoutSection />}
        {activeTab === 'typography' && <TypographySection />}
        {activeTab === 'colors' && <ColorsSection />}
        {activeTab === 'animations' && <AnimationsSection />}
        {activeTab === 'error-recovery' && <ErrorRecoverySection />}
      </div>
    </div>
  );
}

function ButtonsSection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Buttons</h2>
      
      <div className="card mb-4xl animate-fade-in stagger-1">
        <div className="card-header">
          <h3>Button Variants</h3>
        </div>
        <div className="card-body">
          <div className="flex gap-md flex-wrap">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-success">Success Button</button>
            <button className="btn btn-outline">Outline Button</button>
          </div>
        </div>
      </div>

      <div className="card mb-4xl animate-fade-in stagger-2">
        <div className="card-header">
          <h3>Button Sizes</h3>
        </div>
        <div className="card-body">
          <div className="flex gap-md items-center flex-wrap">
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary">Default</button>
            <button className="btn btn-primary btn-lg">Large</button>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in stagger-3">
        <div className="card-header">
          <h3>Button States</h3>
        </div>
        <div className="card-body">
          <div className="flex gap-md flex-wrap">
            <button className="btn btn-primary" disabled>Disabled</button>
            <button className="btn btn-primary">
              <span>🔍</span>
              With Icon
            </button>
            <button className="btn btn-outline">
              <span>📝</span>
              Loading...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsSection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Cards</h2>
      
      <div className="grid grid-cols-auto gap-lg">
        <div className="card animate-scale-in stagger-1">
          <div className="card-header">
            <h3>Basic Card</h3>
          </div>
          <div className="card-body">
            <p>This is a basic card with header, body, and footer sections.</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary">Action</button>
          </div>
        </div>

        <div className="card animate-scale-in stagger-2">
          <div className="card-header">
            <h3>Content Card</h3>
            <p className="text-secondary">With subtitle</p>
          </div>
          <div className="card-body">
            <p>Cards can contain various types of content including text, images, and interactive elements.</p>
            <div className="flex gap-sm mt-lg">
              <span className="text-success">✓ Success</span>
              <span className="text-error">✗ Error</span>
            </div>
          </div>
        </div>

        <div className="card animate-scale-in stagger-3">
          <div className="card-body">
            <h3>Simple Card</h3>
            <p>Cards without headers or footers are also supported for simple content display.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormsSection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Forms</h2>
      
      <div className="card animate-fade-in-up">
        <div className="card-header">
          <h3>Form Elements</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-lg">
            <div className="form-group animate-fade-in stagger-1">
              <label className="form-label">Text Input</label>
              <input type="text" className="form-input" placeholder="Enter text here" />
            </div>
            
            <div className="form-group animate-fade-in stagger-2">
              <label className="form-label">Email Input</label>
              <input type="email" className="form-input" placeholder="user@example.com" />
            </div>
            
            <div className="form-group animate-fade-in stagger-3">
              <label className="form-label">Password Input</label>
              <input type="password" className="form-input" placeholder="Enter password" />
            </div>
            
            <div className="form-group animate-fade-in stagger-4">
              <label className="form-label">Number Input</label>
              <input type="number" className="form-input" placeholder="0" />
            </div>
          </div>
          
          <div className="form-group animate-fade-in stagger-5">
            <label className="form-label">Textarea</label>
            <textarea 
              className="form-input" 
              rows="4" 
              placeholder="Enter longer text here..."
            ></textarea>
          </div>
          
          <div className="flex gap-md">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoutSection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Layout Components</h2>
      
      <div className="card mb-4xl animate-fade-in stagger-1">
        <div className="card-header">
          <h3>Grid System</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-3 gap-md mb-lg">
            <div className="card animate-bounce-in stagger-1">
              <div className="card-body text-center">
                <h4>Column 1</h4>
                <p className="text-secondary">Grid item</p>
              </div>
            </div>
            <div className="card animate-bounce-in stagger-2">
              <div className="card-body text-center">
                <h4>Column 2</h4>
                <p className="text-secondary">Grid item</p>
              </div>
            </div>
            <div className="card animate-bounce-in stagger-3">
              <div className="card-body text-center">
                <h4>Column 3</h4>
                <p className="text-secondary">Grid item</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-auto gap-md">
            <div className="card animate-scale-in stagger-1">
              <div className="card-body text-center">
                <h4>Auto Grid</h4>
                <p className="text-secondary">Responsive columns</p>
              </div>
            </div>
            <div className="card animate-scale-in stagger-2">
              <div className="card-body text-center">
                <h4>Auto Grid</h4>
                <p className="text-secondary">Responsive columns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in stagger-2">
        <div className="card-header">
          <h3>Flexbox Utilities</h3>
        </div>
        <div className="card-body">
          <div className="flex justify-between items-center gap-md mb-lg">
            <span>Left Content</span>
            <span>Right Content</span>
          </div>
          
          <div className="flex justify-center items-center gap-md mb-lg">
            <button className="btn btn-primary">Center</button>
            <button className="btn btn-secondary">Aligned</button>
          </div>
          
          <div className="flex flex-col gap-md">
            <div className="flex gap-md">
              <span>Item 1</span>
              <span>Item 2</span>
              <span>Item 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographySection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Typography</h2>
      
      <div className="card mb-4xl animate-fade-in stagger-1">
        <div className="card-header">
          <h3>Headings</h3>
        </div>
        <div className="card-body">
          <h1>Heading 1 - Main Title</h1>
          <h2>Heading 2 - Section Title</h2>
          <h3>Heading 3 - Subsection Title</h3>
          <h4>Heading 4 - Card Title</h4>
        </div>
      </div>

      <div className="card mb-4xl animate-fade-in stagger-2">
        <div className="card-header">
          <h3>Text Styles</h3>
        </div>
        <div className="card-body">
          <p>This is a regular paragraph with normal text styling.</p>
          <p className="text-secondary">This is secondary text with muted color.</p>
          <p className="text-muted">This is muted text for less important information.</p>
          <p className="text-success">This is success text for positive feedback.</p>
          <p className="text-error">This is error text for error messages.</p>
        </div>
      </div>

      <div className="card animate-fade-in stagger-3">
        <div className="card-header">
          <h3>Text Alignment</h3>
        </div>
        <div className="card-body">
          <p className="text-left">Left aligned text</p>
          <p className="text-center">Center aligned text</p>
          <p className="text-right">Right aligned text</p>
        </div>
      </div>
    </div>
  );
}

function ColorsSection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Color Palette</h2>
      
      <div className="grid grid-cols-auto gap-lg">
        <div className="card animate-scale-in stagger-1">
          <div className="card-header">
            <h3>Primary Colors</h3>
          </div>
          <div className="card-body">
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-md">
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: 'var(--radius-md)'
                  }}
                ></div>
                <span>Primary Blue (#0079d3)</span>
              </div>
              <div className="flex items-center gap-md">
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'var(--color-primary-hover)',
                    borderRadius: 'var(--radius-md)'
                  }}
                ></div>
                <span>Primary Hover (#005fa3)</span>
              </div>
              <div className="flex items-center gap-md">
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-primary)'
                  }}
                ></div>
                <span>Primary Light (#e3f2fd)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card animate-scale-in stagger-2">
          <div className="card-header">
            <h3>Secondary Colors</h3>
          </div>
          <div className="card-body">
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-md">
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'var(--color-success)',
                    borderRadius: 'var(--radius-md)'
                  }}
                ></div>
                <span>Success Green (#28a745)</span>
              </div>
              <div className="flex items-center gap-md">
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'var(--color-neutral)',
                    borderRadius: 'var(--radius-md)'
                  }}
                ></div>
                <span>Neutral Gray (#6c757d)</span>
              </div>
              <div className="flex items-center gap-md">
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'var(--color-error)',
                    borderRadius: 'var(--radius-md)'
                  }}
                ></div>
                <span>Error Red (#ff4444)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card animate-scale-in stagger-3">
          <div className="card-header">
            <h3>Text Colors</h3>
          </div>
          <div className="card-body">
            <div className="flex flex-col gap-md">
              <p className="text-primary">Primary Text (#1a1a1b)</p>
              <p className="text-secondary">Secondary Text (#666)</p>
              <p className="text-muted">Muted Text (#999)</p>
            </div>
          </div>
        </div>

        <div className="card animate-scale-in stagger-4">
          <div className="card-header">
            <h3>Background Colors</h3>
          </div>
          <div className="card-body">
            <div className="flex flex-col gap-md">
              <div 
                style={{ 
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                Primary Background (#ffffff)
              </div>
              <div 
                style={{ 
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                Secondary Background (#f8f9fa)
              </div>
              <div 
                style={{ 
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                Tertiary Background (#f5f5f5)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimationsSection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Animations & Transitions</h2>
      
      <div className="card mb-4xl animate-fade-in stagger-1">
        <div className="card-header">
          <h3>Entrance Animations</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-lg">
            <div className="text-center">
              <div className="btn btn-primary mb-md animate-fade-in">Fade In</div>
              <p className="text-sm text-secondary">Smooth fade in from transparent</p>
            </div>
            <div className="text-center">
              <div className="btn btn-secondary mb-md animate-fade-in-up">Fade In Up</div>
              <p className="text-sm text-secondary">Fade in with upward movement</p>
            </div>
            <div className="text-center">
              <div className="btn btn-success mb-md animate-slide-in">Slide In</div>
              <p className="text-sm text-secondary">Slide in from top with scale</p>
            </div>
            <div className="text-center">
              <div className="btn btn-outline mb-md animate-bounce-in">Bounce In</div>
              <p className="text-sm text-secondary">Bouncy entrance animation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4xl animate-fade-in stagger-2">
        <div className="card-header">
          <h3>Hover Effects</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-lg">
            <div className="text-center">
              <div className="btn btn-primary mb-md hover-lift">Hover Lift</div>
              <p className="text-sm text-secondary">Lifts up on hover</p>
            </div>
            <div className="text-center">
              <div className="btn btn-secondary mb-md hover-scale">Hover Scale</div>
              <p className="text-sm text-secondary">Scales up on hover</p>
            </div>
            <div className="text-center">
              <div className="btn btn-success mb-md hover-rotate">Hover Rotate</div>
              <p className="text-sm text-secondary">Slight rotation on hover</p>
            </div>
            <div className="text-center">
              <div className="btn btn-outline mb-md hover-glow">Hover Glow</div>
              <p className="text-sm text-secondary">Glowing effect on hover</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4xl animate-fade-in stagger-3">
        <div className="card-header">
          <h3>Continuous Animations</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-3 gap-lg">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-md"></div>
              <p className="text-sm text-secondary">Loading Spinner</p>
            </div>
            <div className="text-center">
              <div className="loading-dots mx-auto mb-md">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="text-sm text-secondary">Loading Dots</p>
            </div>
            <div className="text-center">
              <div className="animate-pulse mb-md">
                <div className="w-12 h-12 bg-primary rounded-full mx-auto"></div>
              </div>
              <p className="text-sm text-secondary">Pulse Animation</p>
            </div>
            <div className="text-center">
              <div className="animate-float mb-md">
                <div className="w-12 h-12 bg-success rounded-full mx-auto"></div>
              </div>
              <p className="text-sm text-secondary">Float Animation</p>
            </div>
            <div className="text-center">
              <div className="animate-rotate mb-md">
                <div className="w-12 h-12 bg-warning rounded-full mx-auto"></div>
              </div>
              <p className="text-sm text-secondary">Rotate Animation</p>
            </div>
            <div className="text-center">
              <div className="animate-shimmer mb-md">
                <div className="w-12 h-12 bg-neutral rounded-full mx-auto"></div>
              </div>
              <p className="text-sm text-secondary">Shimmer Effect</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in stagger-4">
        <div className="card-header">
          <h3>Interactive Elements</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-auto gap-lg">
            <div className="card hover-lift">
              <div className="card-body text-center">
                <h4>Hover to Lift</h4>
                <p className="text-secondary">This card lifts on hover</p>
              </div>
            </div>
            <div className="card hover-scale">
              <div className="card-body text-center">
                <h4>Hover to Scale</h4>
                <p className="text-secondary">This card scales on hover</p>
              </div>
            </div>
            <div className="card hover-glow">
              <div className="card-body text-center">
                <h4>Hover to Glow</h4>
                <p className="text-secondary">This card glows on hover</p>
              </div>
            </div>
          </div>
          
          <div className="mt-lg">
            <h4>Form Input with Focus Animation</h4>
            <div className="form-group">
              <label className="form-label">Try focusing this input</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Click or tab to focus..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorRecoverySection() {
  return (
    <div>
      <h2 className="animate-slide-in-left">Error Recovery</h2>
      
      <div className="card mb-4xl animate-fade-in stagger-1">
        <div className="card-header">
          <h3>Error States</h3>
        </div>
        <div className="card-body">
          <div className="flex gap-md flex-wrap">
            <div className="text-center">
              <div className="btn btn-error mb-md">Error Button</div>
              <p className="text-sm text-secondary">Indicates an error state.</p>
            </div>
            <div className="text-center">
              <div className="btn btn-warning mb-md">Warning Button</div>
              <p className="text-sm text-secondary">Indicates a warning state.</p>
            </div>
            <div className="text-center">
              <div className="btn btn-info mb-md">Info Button</div>
              <p className="text-sm text-secondary">Indicates informational state.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4xl animate-fade-in stagger-2">
        <div className="card-header">
          <h3>Error Messages</h3>
        </div>
        <div className="card-body">
          <div className="flex gap-md flex-wrap">
            <div className="text-center">
              <div className="text-error">Error: Invalid input.</div>
              <p className="text-sm text-secondary">Standard error message.</p>
            </div>
            <div className="text-center">
              <div className="text-warning">Warning: This action cannot be undone.</div>
              <p className="text-sm text-secondary">Standard warning message.</p>
            </div>
            <div className="text-center">
              <div className="text-info">Info: This is an informational message.</div>
              <p className="text-sm text-secondary">Standard info message.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in stagger-3">
        <div className="card-header">
          <h3>Error Handling</h3>
        </div>
        <div className="card-body">
          <div className="flex gap-md flex-wrap">
            <div className="text-center">
              <div className="btn btn-error mb-md" disabled>Disabled Error Button</div>
              <p className="text-sm text-secondary">Error button in disabled state.</p>
            </div>
            <div className="text-center">
              <div className="btn btn-warning mb-md" disabled>Disabled Warning Button</div>
              <p className="text-sm text-secondary">Warning button in disabled state.</p>
            </div>
            <div className="text-center">
              <div className="btn btn-info mb-md" disabled>Disabled Info Button</div>
              <p className="text-sm text-secondary">Info button in disabled state.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignSystemShowcase; 