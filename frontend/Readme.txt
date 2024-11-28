# Amazing E-commerce Frontend

A modern e-commerce platform built with React, Material-UI, and Redux Toolkit.

## Features

- User authentication (login, register, password reset)
- Product browsing and searching
- Shopping cart management
- Order processing
- Address management
- User profile management
- Responsive design for all devices
- Protected routes for authenticated users
- Admin dashboard
- Real-time form validation
- Toast notifications
- Animated components

## Technologies Used

- React 18
- Redux Toolkit
- Material-UI (MUI)
- React Router DOM
- Axios
- React Hot Toast
- Vite
- ESLint

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
bash
git clone https://github.com/halit-altun/fullstack-web-project.git
cd amazing-ecommerce/frontend

2. Install dependencies:
bash
npm install
or
yarn install

3. Create a `.env` file in the frontend directory and add necessary environment variables:
bash
npm run dev
or
yarn dev

## Project Structure
frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ ├── Cart/
│ │ ├── Common/
│ │ ├── Layout/
│ │ └── Product/
│ ├── contexts/
│ ├── pages/
│ ├── redux/
│ │ ├── slices/
│ │ └── store.jsx
│ ├── services/
│ ├── styles/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
├── .eslintrc.js
├── .gitignore
├── package.json
└── vite.config.js

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews the production build locally

## Configuration

### API Configuration
The application uses Axios for API calls. The base configuration can be found in `src/services/api.js`.

### Redux Store
Redux store configuration is in `src/redux/store.jsx`. The application uses Redux Toolkit for state management.

### Routing
Route configurations are managed in `src/routes/AppRoutes.jsx`.

## Authentication

The application uses JWT tokens for authentication. Tokens are stored in localStorage and managed through the AuthContext.

## Styling

- Material-UI (MUI) is used for component styling
- Custom styled components using MUI's styled API
- Global styles are defined in `src/styles/global.css`
- Theme customization is available in `src/App.jsx`

## Error Handling

- API errors are handled through Axios interceptors
- Toast notifications for user feedback
- Error boundaries for React component errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Your Name - [@halit-altun](https://github.com/halit-altun)

Project Link: [https://github.com/halit-altun/fullstack-web-project)

## Acknowledgments

- [Material-UI](https://mui.com/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)