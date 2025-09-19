🎬 The Spot

The Spot is a sleek and minimalist React Native movie rental application that allows users to browse, filter, and rent movies by genre.
The app includes a Hero section, filtering system, horizontal scrollable movie sections, and a shopping cart with a glassmorphism receipt design.

✨ Features

Hero Section:
Beautiful full-width hero banner with a featured movie, including title and a Rent button.

Filter by Genre:
Minimalist filter section that allows users to filter movies by Action, Comedy, Drama, Horror, Sci-Fi, or view All movies separated into sections.

Movie Cards:
Each movie card displays:

Poster image

Title

Daily rental rate

Buttons for Details and Rent

Featured Movies Section:
Highlights 4 featured movies at the top of the home page.

Shopping Cart:

Add movies to the cart from Hero or Movie Cards

Remove movies from the cart

Glassmorphism receipt-style cart with columns for title, price, and remove button

Displays total price (2 decimal places)

Rent All button to confirm rentals

Modern UI Design:

Purple & black gradient backgrounds

Minimalist dividers between sections

Consistent fixed-size movie cards

Sleek, futuristic look

🛠️ Tech Stack

React Native (frontend)

Expo (optional if running with Expo)

JavaScript (ES6+)

API: Custom/Mock API returning movie objects

📂 Project Structure
TheSpot/
│
├── assets/              # Images (hero background, posters, etc.)
├── components/          # Reusable components
│   ├── MovieCard.jsx
│   ├── Hero.jsx
│   ├── Cart.jsx
│   └── Filter.jsx
│
├── screens/             # Screens
│   └── Home.jsx
│
├── App.js               # Entry point
├── package.json
└── README.md

⚙️ Installation

Clone the repository

git clone https://github.com/yourusername/thespot.git
cd thespot


Install dependencies

npm install


Run the app

With Expo:

npx expo start


Without Expo:

npx react-native run-android
# or
npx react-native run-ios

📦 API Setup

The app expects an API that returns movies as an object.
Example structure:

{
  "movies": [
    {
      "id": 1,
      "title": "Inception",
      "genre": "Sci-Fi",
      "image": "https://link-to-poster.jpg",
      "dailyRate": 12.50,
      "featured": true
    },
    {
      "id": 2,
      "title": "The Hangover",
      "genre": "Comedy",
      "image": "https://link-to-poster.jpg",
      "dailyRate": 9.99,
      "featured": false
    }
  ]
}


Update the fetch URL in Home.jsx to point to your API.

🎨 UI/UX Highlights

Gradient Backgrounds: Purple → Black

Line Dividers: Thin minimalist dividers between sections

Glassmorphism Cart: Transparent receipt-like design for rentals

Horizontal Scroll: Movies are grouped by genre in horizontally scrollable sections

Consistent Layout: Movie cards maintain fixed size
