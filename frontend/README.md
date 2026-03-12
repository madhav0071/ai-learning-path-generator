# AI Learning Path Generator

An AI-powered web application that generates a personalized, week-by-week learning roadmap based on a user's goal and timeframe.

> **Example prompt:** `Teach me Python in 2 months`  
> The app instantly generates a structured study plan with curated resources — ready to download as a PDF.

---

## Features

- **AI-Generated Roadmaps** — Enter any learning goal and timeframe; the system builds a structured weekly plan automatically
- **NLP Goal Parser** — Understands natural language inputs like `"Learn React in 8 weeks"` and extracts topic + duration
- **Curated Resources Per Week** — Each week includes handpicked tutorials, videos, guides, and documentation links
- **PDF Export** — Download your roadmap as a clean, styled PDF for offline use or progress tracking
- **Swagger API Docs** — Interactive API documentation available for developers
- **Modern UI** — Dark theme, animated cards, shimmer skeleton loader, and smooth transitions

---

## Live Demo

Deployment coming soon.

---

## Example Output

**Input:** `Learn JavaScript in 6 weeks`

| Week   | Topic                      |
| ------ | -------------------------- |
| Week 1 | Introduction to JavaScript |
| Week 2 | Variables and Data Types   |
| Week 3 | Functions and Scope        |
| Week 4 | DOM Manipulation           |
| Week 5 | Asynchronous JavaScript    |
| Week 6 | Building Small Projects    |

Each week includes 2–3 curated learning resources.

---

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Frontend   | React, JavaScript, Axios, HTML/CSS |
| Backend    | Node.js, Express.js                |
| PDF Export | jsPDF                              |
| API Docs   | Swagger                            |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/madhav0071/ai-learning-path-generator.git

# Navigate to the project folder
cd ai-learning-path-generator

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the App

```bash
# Start the backend
cd backend
npm start

# Start the frontend (in a new terminal)
cd frontend
npm start
```

The app will be available at `http://localhost:3000`.  
API docs available at `http://localhost:5000/api-docs`.

---

## Project Structure

```
ai-learning-path-generator/
│
├── frontend/
│   └── src/
│       ├── App.jsx
│       └── api/
│           └── api.js
│
├── backend/
│   ├── server.js
│   └── youtubeService.js
│
└── README.md
```

---

## How It Works

1. User enters a learning goal and timeframe in the input field
2. The frontend sends the request to the Express backend via Axios
3. The backend NLP parser extracts the topic and duration from the prompt
4. A structured week-by-week roadmap is generated with matched resources
5. The frontend renders the roadmap with animated cards
6. The user can download the full roadmap as a PDF

---

## Screenshots

![Home Page](screenshots/home.png)
![Generated Roadmap](screenshots/roadmap.png)
![PDF Export](screenshots/pdf.png)

---

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

Made by **Madhav** — [GitHub](https://github.com/madhav0071)
