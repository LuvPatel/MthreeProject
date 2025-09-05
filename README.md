# Todo List App

A **full-stack Todo List application** with a **React + Vite frontend** and a **FastAPI backend**, allowing users to create, read, update, and delete tasks. The frontend is deployed on GitHub Pages, and the backend is deployed on Render.  

---

## Deployment

- **Frontend:** [GitHub Pages](https://luvpatel.github.io/MthreeProject/)
- **Backend:** [Render](https://mthreeproject-1.onrender.com)

## Features
- Add new tasks
- Edit existing tasks
- Delete tasks
- Persistent storage using a JSON file
- Fully responsive frontend UI
- API served via FastAPI
- CORS enabled for frontend-backend communication

---

## Tech Stack

**Frontend:**
- React.js (with Vite)
- Axios for HTTP requests
- HTML/CSS for UI styling

**Backend:**
- Python
- FastAPI
- Pydantic (data validation)
- JSON for lightweight storage
- CORS middleware for cross-origin requests

**Deployment:**
- Frontend: GitHub Pages
- Backend: Render.com

---

## Setup Instructions To run Locally

### Backend
1. Navigate to backend folder:
   ```
   cd backend
    ```
2. Create a virtual environment:
    ```
    Python -m venv venv
    ```


3. Activate the virtual environment:

macOS/Linux:
```
source venv/bin/activate
```


Windows:
```
venv\Scripts\activate
```


4. Install dependencies:
    ```
    pip install -r requirements.txt
    ```


5. Start the backend server:
    ```
    uvicorn main:app --reload
    ```


6. The backend will run on localhost by default.

7. Note: When running locally, update API_URL in frontend/App.jsx to point to your local backend, e.g.,
    ```
    const API_URL = "http://localhost:8000/tasks";
    ```

### Frontend
1. Navigate to frontend folder:
    ```
    cd frontend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Start the development server:
    ```
    npm run dev
    ```

4. The frontend will run on http://localhost:5173 by default.


### Application Usage

1. Open the frontend in your browser (GitHub Pages or local dev).

2. Add tasks in the input field and click Add.

3. Edit tasks by clicking Edit, modify the description, and click Save.

4. Delete tasks by clicking the Delete button.

5. All changes are persisted in the backend JSON file.


### Future Improvements

1. Replace JSON storage with a database (PostgreSQL / MongoDB)

2. Utilize Docker Containerization for deployment for Cross Platform compatibility and version maintainance using docker images.

3. Create a CI/CD pipline to automate the task for test, build, deplyment

4. Add user authentication

5. Deploy full-stack on a single domain with SSL

6. Add task categories and filtering