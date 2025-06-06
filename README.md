# CodeDevForge - Real-Time Collaborative Code Review Platform

codeDevForge is a real-time collaborative code review platform designed to enhance the code review experience by enabling real-time collaboration. Developers can upload code snippets, and reviewers can provide feedback on specific lines in real time.

## Features

### Core Features Implemented

1. **User Authentication**
   - JWT-based login and registration.
   - Roles:
     - **Developer**: Can upload code snippets and invite reviewers.
     - **Reviewer**: Can comment on code snippets but cannot edit them.

2. **Code Snippet Management**
   - Developers can upload code snippets as plain text.
   - Metadata support for Title, Description, and Language (e.g., JavaScript, Python).

3. **Collaborative Code Review**
   - Real-time collaboration using **Socket.io**.
   - Reviewers can leave comments on specific lines.
   - Lines with comments are highlighted for easy identification.

4. **Dashboard**
   - **Developer Dashboard**:
     - List all uploaded code snippets with their review status.
     - View comments for each snippet.
   - **Reviewer Dashboard**:
     - List assigned snippets for review.
     - Provide feedback directly from the dashboard.

5. **Change History**
   - Track and display the history of comments and changes for each snippet.

6. **Syntax Highlighting**
   - Implemented using **Monaco Editor** for a rich editing experience.

7. **Notifications**
   - Developers receive notifications when reviewers comment on their snippets.

8. **Export**
   - Developers can export reviewed snippets as a downloadable file with embedded comments.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Monaco Editor, Socket.io-client, mui/material.
- **Backend**: Node.js, Express.js, Socket.io, JWT, mongoose, bcryptjs.
- **Deployment**: Firebase (Frontend), Render (Backend).

## Live URLs
- **Frontend**: [Frontend Live URL](https://codedevforge-649ab.web.app)
- **Backend**: [Backend Live URL](https://codedevforge.onrender.com)

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB Atlas account or local MongoDB setup.