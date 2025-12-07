# Product Showcase & Enquiry Frontend

A React-based frontend application for browsing products, searching with filters, and submitting enquiries.

## Features

- **Product Listing**: Browse all products with pagination
- **Search & Filter**: Search by product name/description and filter by category
- **Pagination**: Navigate through products with prev/next controls
- **Product Details**: View detailed product information
- **Enquiry System**: Submit enquiries with customer details
- **User Authentication**: Sign in/Sign up with form validation
- **Responsive Design**: Mobile-friendly UI
- **Modal Popups**: Enquire and Login modals with smooth interactions

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: react-icons (FontAwesome)
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx       # Navigation header with sign in
│   │   │   └── Header.css
│   │   ├── Login/
│   │   │   ├── Login.jsx        # Login/Sign up modal
│   │   │   └── Login.css
│   │   ├── Enquire/
│   │   │   ├── Enquire.jsx      # Enquiry form modal
│   │   │   └── Enquire.css
│   │   └── ProductCart/
│   │       ├── Product.jsx      # Product card component
│   │       └── Product.css
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx         # Product listing with pagination
│   │   │   └── Home.css
│   │   └── ProductPage/
│   │       ├── ProductPage.jsx  # Single product detail
│   │       └── ProductPage.css
│   ├── context/
│   │   └── AppContext.jsx       # Global context for API URL
│   ├── App.js                   # Main app component with routes
│   ├── App.css
│   ├── index.js                 # React DOM render
│   └── index.css                # Global styles
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── package.json
└── README.md
```

## Installation

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in the browser.

### Build for Production
```bash
npm run build
```

Creates optimized build in `build/` folder.

## Configuration

Update the API base URL in `src/App.js`:

```javascript
const url = 'http://localhost:4000/api'  // Change to your backend URL
```

For production, use environment variables:
```javascript
const url = process.env.REACT_APP_API_URL || 'http://localhost:4000/api'
```

Create a `.env` file:
```
REACT_APP_API_URL=https://your-backend-api.com/api
```

## Pages & Components

### Home Page (`/`)
- Lists all products with pagination
- Search by product name/description
- Filter by category (Electronics, Furniture, Books)
- Pagination controls (prev/next)
- Product cards with quick details

### Product Page (`/product/:id`)
- Detailed product information
- Product image
- Full description
- Price
- "Enquire Now" button to open enquiry modal

### Header Component
- Navigation bar with branding
- Sign In button (opens login modal)
- Mobile hamburger menu
- Sticky positioning

### Login Modal
- Toggle between Sign Up and Login modes
- Form validation
- Terms & conditions checkbox
- Error message display
- Close button

### Enquire Modal
- Product details preview
- Customer information form (name, email, phone)
- Message textarea
- Submit and Cancel buttons
- Success/Error feedback

## Features Explained

### Pagination Logic
- Current page indicator (e.g., "Page 2 of 5")
- Previous button disabled on page 1
- Next button disabled on last page
- Page resets to 1 when search/category changes
- Fetches new products on page change

### Search & Filter
- Real-time search as you type
- Category dropdown filter
- Both filters work together
- Resets pagination when filter changes

### Authentication
- Sign up creates new user account
- Login returns JWT token
- Token stored in localStorage
- Useful for future user-specific features

### Enquiry Submission
- POST to backend with product ID and customer details
- Success message with auto-close
- Error handling and display
- Form clears after successful submission

## API Integration

### Base URL
Set in `src/App.js` via `AppContext`:
```javascript
const url = 'http://localhost:4000/api'
```

### Key Endpoints Used

**Products:**
```
GET /products?page=1&search=query&category=category
GET /products/:id
```

**Authentication:**
```
POST /user/register
POST /user/login
```

**Enquiries:**
```
POST /enquiries
```

## Styling Approach

- **CSS Classes**: BEM-like naming (`.component-element`)
- **Responsive**: Mobile-first with breakpoints at 768px, 480px
- **Colors**: Consistent color palette (#111827, #ff6b4a, etc.)
- **Spacing**: Uniform gap and padding values
- **Shadows & Borders**: Subtle, modern design
- **Transitions**: Smooth hover and state changes

## Mobile Responsiveness

- **Desktop**: 3-column product grid
- **Tablet (768px)**: 2-column product grid
- **Mobile (480px)**: 1-column product grid
- **Modals**: Stack vertically on mobile with scrolling
- **Header**: Hamburger menu on mobile

## Keyboard & Accessibility

- Form inputs with labels
- Modal close buttons (×)
- Disabled button states
- Focus-friendly interactive elements
- Semantic HTML structure

## Performance Optimizations

- Lazy component imports (optional)
- Efficient pagination
- Debounced search (optional enhancement)
- Image optimization via backend

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set Root Directory to `./frontend`
4. Set Environment Variable: `REACT_APP_API_URL=your-backend-url`
5. Deploy

### Deploy to Other Platforms

- **Netlify**: Similar to Vercel, drag & drop `build/` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: Static hosting option

## Environment Variables

Create `.env` file in frontend root:
```
REACT_APP_API_URL=https://your-backend-api.com/api
REACT_APP_ENV=production
```

Available in code as:
```javascript
process.env.REACT_APP_API_URL
```

## Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled
- Check API URL is correct
- Verify backend is running

### Pagination Not Working
- Check backend returns `pagination.totalPages`
- Verify page parameter is sent in query string
- Check network tab in DevTools

### Modal Not Appearing
- Verify modal state is managed in parent component
- Check z-index is higher than other elements
- Ensure onClick handlers are properly bound

### Products Not Loading
- Check network tab for API errors
- Verify backend URL in AppContext
- Check backend is running and accessible

## Future Enhancements

- Shopping cart functionality
- Product reviews and ratings
- User profile management
- Order history
- Wishlist feature
- Payment integration
- Email notifications
- Dark mode theme

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions, please check the GitHub repository or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: Active Development

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
