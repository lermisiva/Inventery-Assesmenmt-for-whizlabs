# Inventory Management System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## Quick Start

# Backend
cd server && npm install
echo "MONGODB_URI=mongodb://localhost:27017/inventory" > .env
node app.js

# Frontend (new terminal)
cd ../client && npm install
npm start

##Key Features
Full CRUD Operations for inventory items

Real-time updates with React state management

Data validation for quantity/price inputs

Responsive UI built with Tailwind CSS

##API Reference
Endpoint	Method	Description
/api/items	POST	Create new item
/api/items	GET	Retrieve all items
/api/items/:id	PUT	Update item by ID
/api/items/:id	DELETE	Remove item by ID

##sample Request 
fetch('/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Monitor",
    quantity: 15,
    price: 199.99
  })
})

##Project Structure
text
inventory-system/
├── client/           # React application
│   ├── public/       # Static assets
│   └── src/          # Component source files
└── server/
    ├── models/       # Mongoose schemas
    ├── routes/       # API endpoints
    └── app.js        # Express server
##Troubleshooting
Database not connecting?
Verify MongoDB is running: mongod --version

CORS errors?
Ensure app.use(cors()) is enabled in server/app.js

Missing form data?
Check network tab in DevTools for request payloads

##License
This project is licensed under the MIT License - see the LICENSE file for details.

text

### Why This Works:
1. **Avoids Duplication** - References rather than repeats documentation
2. **Quick Start Focus** - Gets users running in <1 minute
3. **Visual Cues** - Badges and clean formatting
4. **Essential-Only** - Removes tutorial-level details
5. **Problem-Solving** - Directs to docs for complex issues


