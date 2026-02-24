# Lab02 — CRUD Applications

Three separate CRUD applications built with Node.js + Express + HTML, each using a different database.

## Overview

| Project | Database | Port | Driver |
|---------|----------|------|--------|
| project1-mongodb | MongoDB | 3000 | mongoose |
| project2-mysql | MySQL | 3001 | mysql2 |
| project3-sqlite | SQLite | 3002 | better-sqlite3 |

## Folder Structure

```
Lab02/
├── README.md
├── project1-mongodb/
│   ├── package.json
│   ├── server.js
│   └── public/index.html
├── project2-mysql/
│   ├── package.json
│   ├── server.js
│   └── public/index.html
└── project3-sqlite/
    ├── package.json
    ├── server.js
    └── public/index.html
```

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas) — for project1
- MySQL (with `lab02_db` database created) — for project2
- No extra setup for SQLite — project3 creates `students.db` automatically

## API Endpoints (same for all 3 projects)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student by id |
| DELETE | `/api/students/:id` | Delete a student by id |

## Setup & Run

### Project 1 — MongoDB (port 3000)

```bash
cd Lab02/project1-mongodb
npm install
npm start
# open http://localhost:3000
```

### Project 2 — MySQL (port 3001)

```bash
cd Lab02/project2-mysql
npm install
# ensure MySQL is running and lab02_db database exists:
# mysql -u root -e "CREATE DATABASE IF NOT EXISTS lab02_db;"
npm start
# open http://localhost:3001
```

### Project 3 — SQLite (port 3002)

```bash
cd Lab02/project3-sqlite
npm install
npm start
# open http://localhost:3002
```

## Quick Start (3 terminals)

```bash
# Terminal 1
cd Lab02/project1-mongodb && npm install && npm start

# Terminal 2
cd Lab02/project2-mysql && npm install && npm start

# Terminal 3
cd Lab02/project3-sqlite && npm install && npm start
```
