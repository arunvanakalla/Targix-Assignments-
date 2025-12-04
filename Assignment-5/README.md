# Product Management App

A modern React-based product management application that allows users to browse, search, filter, and add products. The app features a clean interface built with Ant Design and integrates with the DummyJSON API for product data.

## Features

- 🔍 **Product Search** - Search products by name or keyword
- 📊 **Product Listing** - View all products in a table format with title, price, and category
- 🏷️ **Category Filtering** - Filter products by category dynamically
- 📅 **Date Range Selection** - Select start and end dates for filtering (defaults to last 7 days)
- ➕ **Add New Products** - Create new products through a multi-step form process
- ✅ **Product Confirmation** - Review and confirm product details before creation
- 🎨 **Modern UI** - Beautiful interface built with Ant Design components
- 🔄 **Routing** - Seamless navigation between product listing and confirmation pages

## Tech Stack

- **React** (v19.2.1) - UI library
- **React Router DOM** (v7.10.1) - Client-side routing
- **Ant Design** (v6.0.1) - UI component library
- **Axios** (v1.13.2) - HTTP client for API requests
- **Day.js** (v1.11.19) - Date manipulation library
- **React Scripts** (v5.0.1) - Build tooling

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **npm** (v6 or higher) or **yarn**

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd product-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Mode

Start the development server:

```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

The page will automatically reload when you make changes to the code.

### Production Build

Create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

### Running Tests

Run the test suite:

```bash
npm test
```

## Project Structure

```
product-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── index.js          # Application entry point with routing
│   ├── index.css         # Global styles
│   ├── PageOne.jsx       # Product listing page with search/filter
│   ├── PageTwo.jsx       # Product confirmation and creation page
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
└── README.md
```

## Application Flow

1. **Page One (`/`)** - Product Listing Page
   - Displays products in a table format
   - Search functionality to find products
   - Category filter dropdown (dynamically populated)
   - Date range picker (start and end dates)
   - "Add Product" button to create new products

2. **Page Two (`/confirm`)** - Product Confirmation Page
   - Displays form with product details from Page One
   - Allows editing before final submission
   - Submits product to API and shows success/error messages
   - Redirects back to Page One after successful creation

## API Integration

The application uses the [DummyJSON API](https://dummyjson.com/) for product data:

- **GET** `https://dummyjson.com/products` - Fetch all products
- **GET** `https://dummyjson.com/products/search?q={query}` - Search products
- **POST** `https://dummyjson.com/products/add` - Create a new product

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized and minified for best performance.

### `npm run eject`

**Note: This is a one-way operation. Once you eject, you can't go back!**

Ejects from Create React App to get full control over the build configuration.

## Features in Detail

### Product Search
- Real-time search functionality
- Searches through product titles and descriptions
- Updates results dynamically

### Category Filtering
- Categories are dynamically extracted from fetched products
- "All Categories" option to show all products
- Works in combination with search

### Date Range Selection
- Default range: Last 7 days
- End date cannot be before start date
- Date picker with validation

### Add Product Flow
1. Click "Add Product" button on Page One
2. Fill in the form (Title, Price, Description, Category)
3. Click "Next" to proceed to confirmation page
4. Review and edit if needed on Page Two
5. Click "Confirm & Create Product" to submit
6. Success message displayed and redirect to Page One

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and not licensed for public use.

## Contributing

This is a private project. Contributions are not accepted at this time.