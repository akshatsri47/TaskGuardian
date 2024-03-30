# TaskGuardian

TaskGuardian is a project for managing tasks with role-based access control.

## Setup Instructions

### Backend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/akshatsri47/TaskGuardian.git
    ```

2. Navigate to the server directory:
    ```sh
    cd TaskGuardian/server
    ```

3. Set up MongoDB:
    - Obtain your MongoDB URI.
    - Create a `.env` file in the `server` directory.
    - Inside the `.env` file, add the MongoDB URI in the following format:
      ```
      MONGO_URI=<your-mongodb-uri>
      ```

4. Install dependencies:
    ```sh
    npm install
    ```

5. Start the server:
    ```sh
    npm run dev
    ```

### Frontend Setup
1. Navigate to the client directory:
    ```sh
    cd TaskGuardian/client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Additional Information
- Replace `<your-mongodb-uri>` with your actual MongoDB URI.
- Backend server will run on port 5000 by default.
- Frontend development server will run on port 3000 by default.
- Make sure MongoDB is running locally or accessible via the provided URI.

