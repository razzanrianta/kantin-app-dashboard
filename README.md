# Kantin FILKOM — Frontend Dashboard

A web-based canteen ordering application built with Vue 3 and TypeScript. Kantin FILKOM allows users to browse canteens, view products, place orders, upload payment proofs, and manage incoming orders as a merchant.

## Features

### Authentication

* User registration and login.
* JWT-based authentication.
* Persistent authentication using browser local storage.
* Protected routes for authenticated users.
* User profile access and logout functionality.

### Canteen & Product Browsing

* Browse available merchants.
* View merchant details, including descriptions, locations, and contact information.
* Browse products and their prices.
* Add products to the shopping cart.

### Shopping Cart & Checkout

* View cart items, quantities, and subtotals.
* Calculate the total order price.
* Validate that an order contains products from a single merchant.
* Create orders and navigate to the order details page.

### Order Management

* View order history and order details.
* Track order status.
* Upload payment proof for an order.
* View incoming sales orders as a merchant.
* Access individual sales order details.

### Merchant Management

* View shops associated with the authenticated user.
* View shop information and product listings.
* Access incoming orders for a specific shop.
* Submit merchant applications.

## Tech Stack

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| Vue 3          | Frontend framework                |
| TypeScript     | Static typing                     |
| Vite           | Development server and build tool |
| Vue Router     | Client-side routing               |
| Pinia          | State management                  |
| Axios          | HTTP requests to the backend API  |
| Tailwind CSS 4 | Utility-first styling             |

## Project Structure

```text
kantin-app-dashboard/
├── public/                 # Static assets
├── src/
│   ├── api/                # Axios API client
│   ├── assets/             # Styles and application assets
│   ├── components/         # Reusable Vue components
│   ├── router/             # Route definitions and navigation guards
│   ├── stores/             # Pinia stores
│   ├── types/              # TypeScript interfaces and types
│   ├── views/              # Application pages
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Prerequisites

Before running the application, make sure you have installed:

* Node.js `22.18+` or `24.12+` (or another version satisfying the project's `package.json` engine requirement).
* npm.
* The [Kantin FILKOM backend API](https://github.com/razzanrianta) running locally.

The frontend currently proxies API requests and uploaded-file requests to a backend running at `http://localhost:3000`.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/razzanrianta/kantin-app-dashboard.git
cd kantin-app-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend

The Axios client uses `/api` as its base URL. Vite is configured to proxy requests to the backend at `http://localhost:3000`.

The relevant configuration in `vite.config.ts` is:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '/uploads': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
},
```

Start the backend separately and ensure that it is accessible at the configured address.

If your backend runs on a different host or port, update the Vite proxy configuration accordingly.

### 4. Run the development server

```bash
npm run dev
```

Vite will display the local URL in the terminal. Open that URL in your browser to access the application.

## Available Scripts

| Command              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`        | Start the Vite development server                          |
| `npm run build`      | Run TypeScript checks and build the production application |
| `npm run build-only` | Build the application without the separate type-check step |
| `npm run type-check` | Check TypeScript and Vue component types                   |
| `npm run preview`    | Preview the production build locally                       |
| `npm run lint`       | Run Oxlint and ESLint                                      |
| `npm run format`     | Format source files with Prettier                          |

## Authentication & API Integration

The application uses Axios to communicate with the backend API.

The shared Axios client is defined in `src/api/axios.ts` and includes a request interceptor that attaches the stored access token to outgoing requests.

```ts
const token = localStorage.getItem('access_token')

if (token) {
  config.headers.Authorization = `Bearer ${token}`
}
```

Authenticated requests therefore include a bearer token when one is available.

The application uses Pinia to manage client-side state, including authentication and shopping cart state, while Vue Router handles navigation and protected routes.

## Order Statuses

The frontend includes presentation logic for the following order statuses:

| Status                 | Display Meaning                          |
| ---------------------- | ---------------------------------------- |
| `WAITING_PAYMENT`      | Waiting for payment proof                |
| `WAITING_VERIFICATION` | Waiting for merchant verification        |
| `PAID`                 | Payment confirmed; order can be prepared |
| `READY`                | Order is ready for pickup                |
| `COMPLETED`            | Order completed                          |
| `CANCELLED`            | Order cancelled                          |

Actual status transitions are handled by the backend.

## Production Build

To generate an optimized production build, run:

```bash
npm run build
```

The generated static assets are placed in the `dist/` directory.

To preview the build locally:

```bash
npm run preview
```

For deployment, configure the production API URL and uploaded-file URL appropriately. The current Vite proxy is intended for local development and does not replace production backend configuration.

## Related Repository

* [Kantin FILKOM — Frontend Dashboard](https://github.com/razzanrianta/kantin-app-dashboard)
* [Kantin FILKOM - Backend](https://github.com/razzanrianta/kantin-app)

## License

No license has been specified for this repository yet.
