# Library

This project has not yet been built for production.

Technologies Used
- Frontend: React, Next.js
- Backend: Node.js, Express.js
- Database: MongoDB Community Server

Setup:
- Frontend:
  - cd frontend
  - cd library
  - npm install
- Backend:
  - cd backend
  - npm install
- Database:
  - cd backend
  - mkdir data
  - cd data
  - mkdir db
  - cd ..

Run:
- Frontend:
  - cd frontend
  - cd library
  - npm run build
  - npm run start
- Backend:
  - cd backend
  - npm run start
- Database:
  - cd backend
  - either:
      - mongod --dbpath=.\data\db
      - or your OS equivalent of
      - "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath=.\data\db
