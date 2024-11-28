# User Management System #

This project demonstrates a User Management System with role-based access control and additional functionalities such as pagination, search, and file management, using the MERN Stack (MySQL, Express.js, React.js, Node.js).



Features:

* Access Control Management


Roles:

Super Admin:   Full access to add, edit, and delete users.

Admin:   Add and delete users.

User:   Update profile details (requires registration and Admin approval).






* Backend Implementation:

User details such as name, role, mobile, email, address, gender, date of birth, and profile picture are stored in a MySQL database.


* Frontend:

Super Admin or Admin can view all users via dynamically rendered JSON data using React.js and Axios for API calls.




* Search & Pagination 

Users Data Display with Search and Pagination

Includes a search feature for filtering employees.


* File Management System-

Allows users to upload identity files (e.g., Aadhar card, PAN card).

Uploaded files are stored locally or in a server directory and are accessible anytime.



# Technologies Used

Frontend:
* React.js
* Axios
 * Material-UI (or your chosen design framework)


Backend:

* Node.js
* Express.js


Database:

* MySQL
* Sequelize ORM


File Storage:

Local file system (using Multer for file uploads)


Other:

* JWT for authentication
* bcrypt for password hashing





Installation Prerequisites

Node.js >= 14.x

* MySQL installed locally or on a server
* npm or yarn installed


# Steps to Clone

1. Clone the repository:
* git clone https://github.com/<your-repository>.git


2. Navigate to the project directory:
* cd project-directory

3. Install dependencies for both backend and frontend:
* cd backend
* npm install
* cd ../frontend
* npm install

4. Set up environment variables:
5. Start the application:

Backend:

* cd backend
* npm start

Frontend:

* cd frontend
* npm start

6. Access the application at http://localhost:3000.




Usage

User Management System
1. Log in as Super Admin or Admin.
2. Manage users:
Add, edit, delete users.
Approve user registrations.


Users Data

1. Access the Users list via the User Management section.
2. Use pagination to navigate records.
3. Use the search box to filter employees.



File Management

1. Navigate to the File Upload section.
2. Upload identity files with a preview.
3. Access uploaded files anytime.



-Screenshots-

1. Login Page
   ![LoginPage](https://github.com/user-attachments/assets/3bf35e20-c2a9-41c5-80b6-5a6d8eae1476)


2. Super Admin Dashboard
   ![SuperAdminDashboard](https://github.com/user-attachments/assets/c8a7804b-a3d3-4a28-99d7-d51641e5b153)

3. Admin Dashboard
   ![AdminDashboard](https://github.com/user-attachments/assets/a68fa32b-5f07-44a9-ba88-ea9167cf996b)


5. Search Functionality
   ![Search (1)](https://github.com/user-attachments/assets/34e012ec-e45c-4e5d-81d9-bef566fe4822)
   ![Search (2)](https://github.com/user-attachments/assets/2164aefe-37a1-4cce-b6f1-54f5a8b3ae69)


7. Registration Page
   ![Registration](https://github.com/user-attachments/assets/8e1ff8b6-c692-4503-a304-ed98f7f93f38)


9. User Dashboard
    ![UserDetails](https://github.com/user-attachments/assets/d28df808-e6e0-41d3-b6ce-9afa88916405)





Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Feel free to customize the structure and content further based on your specific project implementation.
