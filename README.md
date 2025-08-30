

A modern, responsive guitar e-commerce platform built with React and Apollo Client, featuring multi-language support and smooth navigation between guitar brands, models, and detailed product views.

## ✨ Features

- **Brand Showcase**: Browse through a curated collection of premium guitar brands
- **Smart Search & Filters**: Find your perfect guitar with advanced search and filtering
- **Responsive Design**: Optimized for all devices from desktop to mobile
- **Bilingual Support**: Toggle between English and [Macedonian/Albanian] with ease
- **Infinite Scrolling**: Seamlessly load more guitar models as you browse
- **Detailed Product Views**: Comprehensive specifications and artist endorsements

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd guitar-shop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛠 Tech Stack

- **Frontend**: React 18
- **State Management**: Apollo Client
- **API**: GraphQL
- **Styling**: CSS Modules
- **Internationalization**: i18next
- **Routing**: React Router v6

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
│   ├── BrandsPage/     # Brand listing page
│   ├── ModelsPage/     # Guitar models page
│   └── GuitarDetails/  # Detailed guitar view
├── context/        # React contexts
├── hooks/          # Custom React hooks
├── styles/         # Global styles and themes
├── utils/          # Utility functions
└── i18n/           # Internationalization files
```

## 🌐 API Integration

This project uses the following GraphQL endpoint:
```
https://graphql-api-brown.vercel.app/api/graphql
```



## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 🚀 Deployment

Build the app for production:
```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

