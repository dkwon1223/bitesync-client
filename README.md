# BiteSync Frontend Application

A modern React-based restaurant management dashboard providing comprehensive inventory tracking, menu management, and order processing capabilities with real-time data synchronization and intuitive user experience design.

## 🚀 Live Demo

[View Application](your-deployment-url-here)

## 📋 Overview

BiteSync Frontend delivers a complete restaurant management interface built with React and modern web technologies. The application provides restaurant owners with powerful tools to manage inventory, create and edit menu items with dynamic ingredient relationships, process orders with detailed receipt views, and authenticate securely with JWT-based sessions.

## ✨ Key Features

- **Advanced Authentication System**: JWT-based authentication with automatic token management and refresh
- **Dynamic Inventory Management**: Real-time CRUD operations with modal-based editing interfaces
- **Intelligent Menu System**: Menu items with automatic cost calculation and ingredient requirement tracking
- **Comprehensive Order Processing**: Detailed order views with expandable receipts and status tracking
- **Responsive Design**: Mobile-first approach with collapsible navigation and adaptive layouts
- **Real-time Toast Notifications**: User feedback system with contextual success/error messaging

## 🛠️ Tech Stack

**Frontend Framework**
- React 18 with functional components and hooks
- React Router DOM 7 for client-side routing
- Vite for fast development and optimized builds

**UI/UX Libraries**
- Tailwind CSS for utility-first styling
- Headless UI for accessible component primitives
- Heroicons for consistent iconography
- React Toastify for notification management

**State Management**
- React Context API for global authentication state
- Custom hooks for authentication logic (useLogin, useLogout, useSignup)
- Local state management with useState and useEffect

**Authentication & Security**
- JWT token handling with automatic decode and storage
- Protected routes with authentication guards
- Secure API communication with Bearer token headers

## 🏗️ Application Architecture

```
src/
├── auth/                 # Authentication context and providers
├── components/          # Reusable UI components and modals
├── data/               # Static data and navigation configuration
├── hooks/              # Custom authentication and utility hooks
├── pages/              # Main application pages and layouts
└── assets/             # Icons, images, and static resources
```

## 📱 Core Components

### Authentication System
- **AuthContext**: Centralized authentication state with JWT management
- **Custom Hooks**: Dedicated hooks for login, logout, and signup operations
- **Protected Routing**: Conditional navigation based on authentication status

### Modal-Based CRUD Operations
```jsx
// Example: Dynamic inventory management
const EditInventoryModal = ({ editing, setEditing, itemId, token, userId }) => {
  const [formData, setFormData] = useState({
    name: "", imageUrl: "", quantity: "", unitPrice: 0, category: ""
  });
  
  // Fetch, update, and delete operations with error handling
  const updateInventoryItem = async () => {
    // API communication with authentication headers
  };
};
```

### Advanced Menu Management
- **Ingredient Relationship System**: Connect menu items to required inventory
- **Dynamic Cost Calculation**: Real-time cost-to-make updates based on ingredients
- **Availability Logic**: Automatic menu item availability based on inventory levels

### Comprehensive Order Interface
- **Expandable Order Details**: Collapsible receipt views with itemized breakdowns
- **Status Tracking**: Visual order status indicators with color-coded badges
- **Date/Time Formatting**: Internationalized date and currency formatting

## 🎯 Advanced Features

### Dynamic Navigation System
```jsx
// Conditional navigation based on authentication
export const authNavLinks = [
  { label: "Dashboard", route: "/dashboard", icon: dashboardIcon },
  { label: "Inventory", route: "/inventory", icon: inventoryIcon },
  // ... additional authenticated routes
];
```

### Complex Form Management
- **Multi-step Forms**: Inventory and menu item creation with image preview
- **Real-time Validation**: Client-side validation with immediate feedback
- **Dynamic Field Updates**: Conditional form fields based on user input

### State Synchronization
- **Optimistic Updates**: Immediate UI updates with API confirmation
- **Error Recovery**: Graceful error handling with state rollback
- **Cache Management**: Local state updates after successful API operations

## 🔐 Authentication Flow

1. **Login Process**: Credential submission with JWT extraction from headers
2. **Token Management**: Automatic localStorage persistence with decode validation
3. **Route Protection**: Conditional rendering based on authentication state
4. **Session Persistence**: Automatic token validation on application load

## 📊 Data Management Patterns

### API Integration
```jsx
// Standardized API communication pattern
const fetchUserInventory = async (token, userId) => {
  try {
    const response = await fetch(`${API_BASE}/inventory/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    // Error handling and data processing
  } catch (error) {
    // Toast notification with context-specific messaging
  }
};
```

### Real-time Updates
- **Immediate Feedback**: Toast notifications for all user actions
- **Optimistic Rendering**: UI updates before API confirmation
- **Error Handling**: Comprehensive error states with user-friendly messages

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone [repository-url]
   cd bitesync-client
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Configure API endpoints in source files
   # Update BASE_URL in components as needed
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   npm run preview
   ```

## 📱 Responsive Design Features

- **Mobile-First Approach**: Tailwind breakpoints for all screen sizes
- **Collapsible Navigation**: Hamburger menu for mobile devices
- **Adaptive Tables**: Horizontal scrolling for data-heavy interfaces
- **Touch-Friendly**: Optimized button sizes and touch targets

## 🎨 UI/UX Highlights

### Modern Design System
- **Consistent Color Palette**: Indigo-based theme with semantic color usage
- **Accessibility Focus**: Screen reader support and keyboard navigation
- **Loading States**: Skeleton screens and loading indicators
- **Error Boundaries**: Graceful error handling with recovery options

### Interactive Elements
- **Smooth Transitions**: CSS transitions for modal and navigation states
- **Visual Feedback**: Hover states and active indicators
- **Form Validation**: Real-time validation with clear error messaging

## 🔧 Development Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build with optimization
npm run lint     # ESLint code analysis
npm run preview  # Preview production build locally
```

## 📊 Performance Optimizations

- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Lazy loading and responsive images
- **Bundle Analysis**: Optimized dependencies and tree shaking
- **Caching Strategy**: Efficient API response caching

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive Web App capabilities
- Offline functionality considerations

## 📞 Integration Points

**Backend API**: RESTful API integration with JWT authentication
**External Services**: Toast notification system for user feedback
**Browser APIs**: LocalStorage for token persistence

---

*Built with React 18, Tailwind CSS, and modern web standards | Optimized for restaurant operations and user experience*
