# User Catalog - Frontend Technical Challenge

A React TypeScript application that consumes REST and GraphQL APIs to display an interactive user catalog with their posts.

Reponsive

![Captura de pantalla (584)](https://github.com/user-attachments/assets/b27e6205-7807-4c02-8c1c-8e96ce9666ab)
![Captura de pantalla (585)](https://github.com/user-attachments/assets/eb97ee31-58d5-4f87-a65a-3c10a41c3e22)
![Captura de pantalla (586)](https://github.com/user-attachments/assets/8f9f06ed-6e13-46c4-870c-9338d1ae9b7e)

## 🚀 Features!


- **User listing**: Fetched from JSONPlaceholder REST API
- **User details**: Complete information with responsive design
- **User posts**: Loaded from GraphQL Zero API
- **Real-time search**: Filter users by name
- **Global state management**: Implemented with Zustand
- **Data validation**: Type-safe validation with Zod
- **Responsive design**: Built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 🛠 Tech Stack

- **React 18** with Hooks
- **TypeScript** for static typing
- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Zustand** for global state management
- **Zod** for runtime data validation
- **REST API** (JSONPlaceholder)
- **GraphQL** (GraphQL Zero)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd user-catalog-app
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open in browser**
\`\`\`
http://localhost:3000
\`\`\`

## 🏗 Project Architecture

The architecture I wanted to implement is called layered modular architecture, inspired by Clean Architecture.

## 🔧 Implementation Details

### ✅ Functional Requirements
- [x] Display users list from REST API
- [x] Show user details on click
- [x] Fetch user posts via GraphQL
- [x] Implement search functionality by name
- [x] Responsive design implementation

### ✅ Technical Requirements
- [x] React.js with Hooks
- [x] TypeScript implementation
- [x] Zod for data validation
- [x] Zustand for state management
- [x] Tailwind CSS for styling
- [x] REST API and GraphQL consumption
- [x] JSON data format handling
- [x] Clean, commented code structure

## 🎨 UI/UX Implementation

### Design Patterns
- **Mobile-first responsive design**: Adapts to mobile, tablet, and desktop
- **Loading states**: Skeleton loaders and spinners for better UX
- **Error handling**: Graceful error states with user feedback
- **Interactive elements**: Hover effects and smooth transitions
- **Accessibility**: ARIA labels and semantic HTML structure

### Component Architecture
- **Container/Presentational pattern**: Separation of logic and UI
- **Custom hooks**: Reusable stateful logic
- **Compound components**: Flexible component composition
- **Props drilling prevention**: Global state for shared data

## 📊 API Integration

### REST API - JSONPlaceholder
\`\`\`typescript
// Endpoint configuration
const API_BASE_URL = "https://jsonplaceholder.typicode.com"

// Service implementation
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`)
  const data = await response.json()
  return UsersSchema.parse(data) // Zod validation
}
\`\`\`

### GraphQL API - GraphQL Zero
\`\`\`typescript
// GraphQL query
const GET_USER_POSTS_QUERY = `
  query GetUserPosts($userId: ID!) {
    user(id: $userId) {
      posts {
        data {
          id
          title
          body
          user { id }
        }
      }
    }
  }
`

// Service implementation with error handling
export async function fetchUserPosts(userId: number): Promise<Post[]>
\`\`\`

## 🧪 Data Validation Strategy

### Zod Schema Implementation
\`\`\`typescript
// Runtime type validation
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
})

// Type inference from schema
export type User = z.infer<typeof UserSchema>
\`\`\`

### Benefits
- **Runtime safety**: Validates API responses at runtime
- **Type inference**: Automatic TypeScript types from schemas
- **Error handling**: Detailed validation error messages
- **Documentation**: Self-documenting data structures

## 🔄 State Management

### Zustand Store Implementation
\`\`\`typescript
interface UserStore {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}))
\`\`\`

### Architecture Benefits
- **Minimal boilerplate**: Less code than Redux
- **TypeScript support**: Full type safety
- **DevTools integration**: Redux DevTools compatibility
- **Performance**: Selective re-renders

## ⚡ Performance Optimizations

### React Optimizations
- **useMemo**: Memoized filtered user list
- **useCallback**: Stable function references
- **Component splitting**: Lazy loading potential
- **Efficient re-renders**: Minimal state updates

### Network Optimizations
- **Error boundaries**: Graceful failure handling
- **Loading states**: Progressive data loading
- **Debounced search**: Optimized search input
- **Caching strategy**: Ready for implementation

## 🧪 Code Quality Standards

### TypeScript Configuration
- **Strict mode**: Enabled for maximum type safety
- **No implicit any**: Explicit typing required
- **Unused variables**: Compilation errors for unused code
- **Import organization**: Consistent import structure

### Code Style Guidelines
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Naming conventions**: Descriptive variable names
- **Comment standards**: JSDoc-style documentation

## 🔍 Testing Strategy (Ready for Implementation)

### Unit Testing
\`\`\`typescript
// Example test structure
describe('useUsers hook', () => {
  it('should fetch users on mount', async () => {
    // Test implementation
  })
  
  it('should filter users by search term', () => {
    // Test implementation
  })
})
\`\`\`

### Integration Testing
- **API mocking**: Mock service responses
- **Component testing**: React Testing Library
- **E2E testing**: Cypress or Playwright ready
- **Accessibility testing**: axe-core integration

## 🚀 Deployment & Production

### Build Configuration
\`\`\`bash
# Production build
npm run build

# Static export (if needed)
npm run export

# Start production server
npm start
\`\`\`

### Environment Variables
\`\`\`env
# API endpoints (if needed)
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_GRAPHQL_URL=https://graphqlzero.almansi.me/api
\`\`\`

## 📈 Future Enhancements

### Performance Improvements
- [ ] **Pagination**: Handle large datasets efficiently
- [ ] **Virtual scrolling**: Optimize long lists
- [ ] **Image optimization**: Lazy loading for avatars
- [ ] **Service worker**: Offline functionality

### Feature Additions
- [ ] **Advanced filtering**: Multiple filter criteria
- [ ] **Sorting options**: Sort by different fields
- [ ] **Dark mode**: Theme switching capability
- [ ] **Favorites**: Save favorite users locally
- [ ] **Export functionality**: Download user data

### Technical Improvements
- [ ] **Unit tests**: Comprehensive test coverage
- [ ] **E2E tests**: User journey testing
- [ ] **Performance monitoring**: Core Web Vitals tracking
- [ ] **Error tracking**: Sentry integration
- [ ] **Analytics**: User behavior tracking

## 🐛 Troubleshooting

### Common Issues

**API Connection Issues**
\`\`\`bash
# Check network connectivity
curl https://jsonplaceholder.typicode.com/users

# Verify CORS settings
# APIs used are CORS-enabled for development
\`\`\`

**Build Errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
\`\`\`

**TypeScript Errors**
\`\`\`bash
# Check TypeScript configuration
npx tsc --noEmit

# Verify type definitions
npm run type-check
\`\`\`

## 📚 Learning Resources

### Technologies Used
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zod Documentation](https://zod.dev/)

### API References
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [GraphQL Zero API](https://graphqlzero.almansi.me/)
- 
-----------------------------------------------------------------------------------------------------------------------------------------
## 👨‍💻 Development Notes

### Code Organization Philosophy
- Each component has a clear responsibility.
- Composition is prioritized over inheritance.
- Separation of logic, UI, and data.
- Use of reusable utilities and hooks (DRY principle).

### Performance Considerations
- Optimized imports and package reduction.
- Avoid unnecessary re-rendering (memo, useCallback).
- Minimize API calls and cache usage.
- Meticulous user experience (UX): progressive loading and visual feedback.

- ------------------------------------------------------------------------------------------------------------------------------------------
**Developed with passion for the technical challenge of front-end development**

*This project demonstrates modern development practices with React, a degree of TypeScript proficiency, API integration skills, and attention to detail in the user experience.*
