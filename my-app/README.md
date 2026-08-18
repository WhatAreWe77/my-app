# 🍋 Little Lemon Restaurant

A modern, responsive restaurant booking web application built with React. This project allows users to explore the Little Lemon Restaurant, and make table reservations.

## 📋 Project Overview

Little Lemon is a Mediterranean restaurant booking platform that provides:

- **Navigation**: Easy access to Home and Book Now pages
- **Restaurant Information**: Learn about Little Lemon's mission and values
- **Booking System**: Reserve a table with an intuitive booking form
- **Confirmation Page**: View booking confirmation with reservation details
- **Responsive Footer**: Contact information and social media links
- **Professional Styling**: Green and yellow themed design with gradient backgrounds

## 🎨 Features

### Pages

- **Home Page** - Welcome message, About section, and booking form
- **Booking Page** - Full booking form with date, time, and guest selection
- **Confirmation Page** - Booking confirmation with reservation summary
- **Footer** - Restaurant information, contact details, and social media

### Technical Features

- Form validation using Formik and Yup
- React Router for page navigation
- Responsive design for mobile and desktop
- Image backgrounds with opacity effects
- Professional color scheme (Green #10b981 and Yellow #fbbf24)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Navigate to the project directory:**

   ```bash
   cd my-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application

**⚠️ IMPORTANT:** Always navigate to the `my-app` folder first before running npm start!

```bash
cd my-app
npm start
```

The application will automatically open at [http://localhost:3000](http://localhost:3000) in your default browser.

## 📁 Project Structure

`
my-app/
├── public/
│   ├── download.jpg          # Restaurant image
│   └── ...
├── src/
│   ├── App.js                # Main app component
│   ├── Header.js             # Header with logo
│   ├── Nav.js                # Navigation bar
│   ├── Main.js               # Home page
│   ├── BookingForm.js        # Booking form component
│   ├── BookingPage.js        # Booking page
│   ├── ConfirmedBooking.js   # Confirmation page
│   ├── Footer.js             # Footer with contact info
│   ├── api.js                # API functions
│   ├── App.css               # App styles
│   ├── index.css             # Global styles
│   ├── BookingForm.css       # Form styles
│   ├── ConfirmedBooking.css  # Confirmation page styles
│   └── index.js              # React entry point
└── package.json              # Project dependencies
`

## 🛠️ Available Scripts

In the `my-app` directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production in the `build` folder, optimized for best performance.

## 🎨 Color Scheme

- **Primary Green**: #065f46 (Dark green for headings)
- **Accent Green**: #10b981 (Bright green for accents)
- **Gold/Yellow**: #fbbf24 (Yellow for highlights and buttons)
- **Light Green**: #f0fdf4 (Light background)
- **Cream**: #fffbeb (Warm background)

## 📝 Booking Form Features

The booking form includes:

- Full name validation
- Email address validation
- Phone number validation
- Date selection (Today to 30 days in advance)
- Time selection (10:00 AM to 11:30 PM)
- Guest count (1-20 guests)
- Occasion selection (Regular, Birthday, Anniversary, Business, Other)
- Special requests field
- Real-time form validation
- Disabled submit button until form is valid

## 📱 Responsive Design

The application is fully responsive and works great on:

- Desktop browsers
- Tablets
- Mobile devices

## 🔄 Form Submission Flow

1. User fills out booking form
2. Form validation checks all fields
3. User clicks "Reserve Table"
4. Confirmation page displays with booking summary
5. User can return to home page

## 📞 Contact Information

- **Phone**: 021-180-0000
- **Email**: <Littlelemon@yahoo.com>
- **Address**: 123 Corner Motaung Rd, Sandton, Johannesburg, 1800
- **Social Media**: Facebook & Instagram @LittleLemon

## 🤝 Technologies Used

- **React** - UI library
- **React Router** - Client-side routing
- **Formik** - Form state management
- **Yup** - Schema validation
- **CSS3** - Styling with gradients and flexbox

## 📄 License

This project is part of the Coursera Capstone program.

## 🎓 Author

Created as a Coursera Capstone project - Tshepo.

---

Happy Booking! Enjoy your Mediterranean dining experience at Little Lemon Restaurant! 🍋
