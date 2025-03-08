
# Google Sheets Dashboard 
This project allows users to fetch data from Google Sheets,  and display it in a Next.js dashboard. Users can also add dynamic columns, which persist locally on the dashboard but do not get stored in Google Sheets.


## Features

- ✅  Fetches data from Google Sheets and displays it in a Next.js dashboard

- ✅ Users can add dynamic columns (not stored in Google Sheets)

- ✅ Columns persist in localStorage after page reload

- ✅ Automatically updates by fetching live Sheets data every 30 seconds


## Tech Stack

**Frontend:** NextJs, TailwindCSS, ShadcnUI

**Backend:** Node, Express

**Database:** MongoDB

**Authentication**: JWT

**Google Sheets API**: Read-only access

**Deployment:** Vercel


## Installation & Setup

### 🔹 Prerequisites
- Node.js (v18+)
- MongoDB Atlas or a local MongoDB instance


### 🔹 Clone the Repository

```bash
  git clone https://github.com/animesh156/assignment-dashboard.git
  cd assignment-dashboard
```
### 🔹 Backend Setup

```bash
   cd server
  npm install
  ```
#### 🔹 Environment Variables (.env)
Create a .env file in the backend directory:

```bash
PORT=your_choice
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY = your_api_key
GOOGLE_SHEET_ID = your_sheet_id
```

#### 🔹 Start the Backend Server
```bash
 node index.js(your backend index file)
 ```

### 🔹 Frontend Setup
```bash
 cd client
 npm install
 ```



#### 🔹 Start the Frontend Server
```bash
npm start
```










## API Reference

#### Fetch Data from Sheet

```http
  GET /api/sheets/data
```
✅ Retrieves data from sheet.


#### Register

```http
  POST /api/register
```

✅ Register the new user



#### Login

```http
  POST /api/login
```

✅ Login the existing user
