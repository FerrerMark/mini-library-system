import Header from "../components/Header";
import '../css/about.css';
import AddBtn from "../components/moreBtn";

const About = () => {
    return (
        <div className="about">
            <Header />
            <h1 className="h1">Mini Library Manager</h1>
            <div className="about-body">
                <h2>About This Project</h2>
                <p>
                    Mini Library Manager is a full-stack web application that helps users manage their personal book collections.
                    You can add, update, delete, issue, and return books, as well as search by title, author, or genre. This app is built
                    using the <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js) and follows the MVC architecture for a clean
                    and scalable codebase. Authentication is implemented to ensure users can securely manage their collections.
                </p>
                <p>
                    The backend is hosted on <a href="https://render.com" target="_blank" rel="noopener noreferrer">Render.com</a> using
                    the free tier, which may limit features like image uploads due to resource constraints. The database is hosted on{' '}
                    <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a> for cloud-based storage.
                    The frontend is built with React and providing a responsive user interface.
                </p>
                <p>
                    This project was developed by{' '}
                    <a href="https://github.com/FerrerMark" target="_blank" rel="noopener noreferrer">FerrerMark</a> as a self-practice
                    project to learn full-stack web development.
                </p>

                <h2>Repositories</h2>
                <ul>
                    <li>
                        Backend:{' '}
                        <a href="https://github.com/FerrerMark/Mini-Library-Manager-Back" target="_blank" rel="noopener noreferrer">
                            github.com/FerrerMark/Mini-Library-Manager-Back
                        </a>
                    </li>
                    <li>
                        Frontend:{' '}
                        <a href="https://github.com/FerrerMark/Mini-Library-Manager-Front" target="_blank" rel="noopener noreferrer">
                            github.com/FerrerMark/Mini-Library-Manager-Front
                        </a>
                    </li>
                </ul>

                <h2>Backend Documentation</h2>
                <h3>Overview</h3>
                <p>
                    The backend is a RESTful API built with Node.js, Express, and MongoDB, hosted on Render.com with MongoDB Atlas for
                    cloud-based database storage. It manages book-related operations, including CRUD (create, read, update, delete), issuance,
                    and returns.
                </p>

                <h3>Features</h3>
                <ul>
                    <li><strong>Book Management</strong>: CRUD operations for book records.</li>
                    <li><strong>Book Issuance</strong>: Issue books to users and track them.</li>
                    <li><strong>Book Return</strong>: Handle book returns.</li>
                    <li><strong>RESTful API</strong>: Endpoints for frontend integration.</li>
                    <li><strong>MongoDB Atlas Integration</strong>: Cloud database storage.</li>
                    <li><strong>Error Handling</strong>: Robust handling for invalid requests.</li>
                </ul>

                <h3>Prerequisites</h3>
                <div className="prerequisites">
                    <p><strong>Before setting up the backend, ensure you have:</strong></p>
                    <ul>
                        <li>Node.js (v14 or higher recommended) for local development.</li>
                        <li>
                            A <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a> account.
                        </li>
                        <li>
                            A <a href="https://render.com" target="_blank" rel="noopener noreferrer">Render.com</a> account for hosting.
                        </li>
                        <li>Git for cloning the repository.</li>
                        <li>A GitHub account for Render deployment.</li>
                    </ul>
                </div>

                <h3>Installation (Local Setup)</h3>
                <ol>
                    <li>
                        <strong>Clone the Repository</strong>:
                        <pre>
                            <code>git clone https://github.com/FerrerMark/Mini-Library-Manager-Back.git</code>
                        </pre>
                    </li>
                    <li>
                        <strong>Navigate to the Project Directory</strong>:
                        <pre>
                            <code>cd Mini-Library-Manager-Back</code>
                        </pre>
                    </li>
                    <li>
                        <strong>Install Dependencies</strong>:
                        <pre>
                            <code>npm install</code>
                        </pre>
                        <p>
                            This installs required packages, including <code>express</code>, <code>mongoose</code>, <code>cors</code>, and{' '}
                            <code>dotenv</code>.
                        </p>
                    </li>
                    <li>
                        <strong>Set Up MongoDB Atlas</strong>:
                        <p>
                            Create an account at{' '}
                            <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a>:
                        </p>
                        <ul>
                            <li>Create a cluster (e.g., AWS, region close to your Render app).</li>
                            <li>Create a database user with username and password.</li>
                            <li>
                                Configure network access: Add your local IP or allow all (0.0.0.0/0) for testing (not recommended for
                                production).
                            </li>
                            <li>
                                Obtain the connection string (e.g.,{' '}
                                <code>mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/your-database</code>).
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Set Up Environment Variables</strong>:
                        <p>Create a <code>.env</code> file in the project root:</p>
                        <pre>
                            <code>
                                MONGO_URI=your_mongodb_atlas_connection_string
                                <br />
                                PORT=3000
                            </code>
                        </pre>
                        <p className="note">Replace <code>your_mongodb_atlas_connection_string</code> with the Atlas connection URI.</p>
                    </li>
                    <li>
                        <strong>Start the Server</strong>:
                        <pre>
                            <code>npm start</code>
                        </pre>
                        <p>
                            The server runs on <code>http://localhost:3000</code> (or the port in <code>.env</code>).
                        </p>
                    </li>
                </ol>

                <h3>Deployment on Render</h3>
                <div className="note-box">
                    <p>
                        <strong>Note</strong>: The backend is hosted on{' '}
                        <a href="https://render.com" target="_blank" rel="noopener noreferrer">
                            Render.com
                        </a>
                        ’s free tier (750 hours/month, may spin down after 15 minutes of inactivity). Image uploads may be limited due to
                        free tier constraints. Consider a paid plan for production.
                    </p>
                </div>
                <ol>
                    <li>
                        <strong>Create a Render Account</strong>:
                        <p>
                            Sign up at{' '}
                            <a href="https://render.com" target="_blank" rel="noopener noreferrer">
                                Render.com
                            </a>{' '}
                            and link your GitHub account.
                        </p>
                    </li>
                    <li>
                        <strong>Push Code to GitHub</strong>:
                        <pre>
                            <code>
                                git add .
                                <br />
                                git commit -m "Prepare for Render deployment"
                                <br />
                                git push origin main
                            </code>
                        </pre>
                    </li>
                    <li>
                        <strong>Create a Web Service</strong>:
                        <ul>
                            <li>Go to the Render Dashboard and click <strong>New &gt; Web Service</strong>.</li>
                            <li>Select <code>FerrerMark/Mini-Library-Manager-Back</code>.</li>
                            <li>
                                Configure:
                                <ul>
                                    <li>
                                        <strong>Name</strong>: e.g., Mini-Library-Manager-Back
                                    </li>
                                    <li>
                                        <strong>Environment</strong>: Node.js
                                    </li>
                                    <li>
                                        <strong>Region</strong>: Match your MongoDB Atlas cluster.
                                    </li>
                                    <li>
                                        <strong>Branch</strong>: main
                                    </li>
                                    <li>
                                        <strong>Build Command</strong>: <code>npm install</code>
                                    </li>
                                    <li>
                                        <strong>Start Command</strong>: <code>npm start</code>
                                    </li>
                                    <li>
                                        <strong>Instance Type</strong>: Free or paid plan.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Add Environment Variables</strong>:
                        <p>In the Render Dashboard, add:</p>
                        <pre>
                            <code>
                                MONGO_URI=your_mongodb_atlas_connection_string
                                <br />
                                PORT=process.env.PORT
                            </code>
                        </pre>
                        <p className="note">
                            Use the Atlas connection string. Set <code>PORT=process.env.PORT</code> for Render’s dynamic port.
                        </p>
                    </li>
                    <li>
                        <strong>Configure MongoDB Atlas Network Access</strong>:
                        <p>
                            In MongoDB Atlas, add Render’s static outbound IP addresses (check Render’s dashboard/docs) or allow all
                            (0.0.0.0/0) for testing.
                        </p>
                    </li>
                    <li>
                        <strong>Deploy</strong>:
                        <p>
                            Click <strong>Create Web Service</strong>. Render provides a URL (e.g.,{' '}
                            <code>https://your-app-name.onrender.com</code>).
                        </p>
                    </li>
                    <li>
                        <strong>Verify</strong>:
                        <p>Test API endpoints using the Render URL.</p>
                    </li>
                </ol>

                <h3>API Endpoints</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Description</th>
                            <th>Request Body</th>
                            <th>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>GET</td>
                            <td><code>/api/books</code></td>
                            <td>Retrieve all books</td>
                            <td>-</td>
                            <td>JSON array of book objects</td>
                        </tr>
                        <tr>
                            <td>POST</td>
                            <td><code>/api/books</code></td>
                            <td>Create a new book</td>
                            <td>
                                <code>{`{ "title": "string", "author": "string", "isbn": "string" }`}</code>
                            </td>
                            <td>JSON object of created book</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td><code>/api/books/:id</code></td>
                            <td>Retrieve a book by ID</td>
                            <td>-</td>
                            <td>JSON object of book or error</td>
                        </tr>
                        <tr>
                            <td>PUT</td>
                            <td><code>/api/books/:id</code></td>
                            <td>Update a book by ID</td>
                            <td>
                                <code>{`{ "title": "string", "author": "string", "isbn": "string" }`}</code>
                            </td>
                            <td>JSON object of updated book</td>
                        </tr>
                        <tr>
                            <td>DELETE</td>
                            <td><code>/api/books/:id</code></td>
                            <td>Delete a book by ID</td>
                            <td>-</td>
                            <td>Success message or error</td>
                        </tr>
                        <tr>
                            <td>POST</td>
                            <td><code>/api/books/issue/:id</code></td>
                            <td>Issue a book to a user</td>
                            <td>
                                <code>{`{ "userId": "string" }`}</code>
                            </td>
                            <td>Success message or error</td>
                        </tr>
                        <tr>
                            <td>POST</td>
                            <td><code>/api/books/return/:id</code></td>
                            <td>Return an issued book</td>
                            <td>-</td>
                            <td>Success message or error</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Example Request (Using cURL)</h3>
                <p>To create a new book:</p>
                <pre>
                    <code>{`curl -X POST https://your-app-name.onrender.com/api/books \\
-H "Content-Type: application/json" \\
-d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","isbn":"9780743273565"}'`}</code>
                </pre>
                <p>Example Response:</p>
                <pre>
                    <code>{`{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "status": "available",
  "__v": 0
}`}</code>
                </pre>
                <p className="note">Replace <code>https://your-app-name.onrender.com</code> with your Render app’s URL.</p>

                <h2>Frontend Documentation</h2>
                <h3>Overview</h3>
                <p>
                    The frontend is a React-based web application styled with Tailwind CSS, providing a responsive interface to interact with
                    the backend API. It supports viewing, adding, editing, deleting, issuing, and returning books, with user authentication for
                    secure access.
                </p>

                <h3>Features</h3>
                <ul>
                    <li><strong>Book Listing</strong>: Displays books fetched from the backend API.</li>
                    <li><strong>Add/Edit Books</strong>: Forms for creating or updating book details.</li>
                    <li><strong>Issue/Return Books</strong>: Interface for issuing and returning books.</li>
                    <li><strong>Authentication</strong>: User login to manage personal collections.</li>
                    <li><strong>Responsive Design</strong>: Optimized for all devices using Tailwind CSS.</li>
                    <li><strong>API Integration</strong>: Communicates with the backend via RESTful API.</li>
                </ul>

                <h3>Prerequisites</h3>
                <div className="prerequisites">
                    <p><strong>Before setting up the frontend, ensure you have:</strong></p>
                    <ul>
                        <li>Node.js (v14 or higher recommended).</li>
                        <li>Git for cloning the repository.</li>
                        <li>A running backend instance (local or on Render.com).</li>
                        <li>
                            A hosting platform (e.g.,{' '}
                            <a href="https://render.com" target="_blank" rel="noopener noreferrer">
                                Render.com
                            </a>
                            ,{' '}
                            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                                Vercel
                            </a>
                            , or{' '}
                            <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">
                                Netlify
                            </a>
                            ).
                        </li>
                    </ul>
                </div>

                <h3>Installation (Local Setup)</h3>
                <ol>
                    <li>
                        <strong>Clone the Repository</strong>:
                        <pre>
                            <code>git clone https://github.com/FerrerMark/Mini-Library-Manager-Front.git</code>
                        </pre>
                    </li>
                    <li>
                        <strong>Navigate to the Project Directory</strong>:
                        <pre>
                            <code>cd Mini-Library-Manager-Front</code>
                        </pre>
                    </li>
                    <li>
                        <strong>Install Dependencies</strong>:
                        <pre>
                            <code>npm install</code>
                        </pre>
                        <p>
                            This installs required packages, including <code>react</code>, <code>axios</code>, and <code>tailwindcss</code>.
                        </p>
                    </li>
                    <li>
                        <strong>Set Up Environment Variables</strong>:
                        <p>Create a <code>.env</code> file in the project root:</p>
                        <pre>
                            <code>REACT_APP_API_URL=https://your-app-name.onrender.com/api</code>
                        </pre>
                        <p className="note">
                            Replace <code>https://your-app-name.onrender.com/api</code> with the backend API URL (local:{' '}
                            <code>http://localhost:3000/api</code>).
                        </p>
                    </li>
                    <li>
                        <strong>Start the Development Server</strong>:
                        <pre>
                            <code>npm start</code>
                        </pre>
                        <p>
                            The frontend runs on <code>http://localhost:3000</code>.
                        </p>
                    </li>
                </ol>

                <h3>Deployment on Render</h3>
                <div className="note-box">
                    <p>
                        <strong>Note</strong>: The frontend is hosted on{' '}
                        <a href="https://render.com" target="_blank" rel="noopener noreferrer">
                            Render.com
                        </a>{' '}
                        (free tier). Alternatively, use Vercel or Netlify for React apps.
                    </p>
                </div>
                <ol>
                    <li>
                        <strong>Push Code to GitHub</strong>:
                        <pre>
                            <code>
                                git add .
                                <br />
                                git commit -m "Prepare for Render deployment"
                                <br />
                                git push origin main
                            </code>
                        </pre>
                    </li>
                    <li>
                        <strong>Create a Static Site</strong>:
                        <ul>
                            <li>
                                Go to the Render Dashboard and click <strong>New &gt; Static Site</strong>.
                            </li>
                            <li>Select <code>FerrerMark/Mini-Library-Manager-Front</code>.</li>
                            <li>
                                Configure:
                                <ul>
                                    <li>
                                        <strong>Name</strong>: e.g., Mini-Library-Manager-Front
                                    </li>
                                    <li>
                                        <strong>Branch</strong>: main
                                    </li>
                                    <li>
                                        <strong>Build Command</strong>: <code>npm install && npm run build</code>
                                    </li>
                                    <li>
                                        <strong>Publish Directory</strong>: <code>build</code>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Add Environment Variables</strong>:
                        <p>In the Render Dashboard, add:</p>
                        <pre>
                            <code>REACT_APP_API_URL=https://your-app-name.onrender.com/api</code>
                        </pre>
                        <p className="note">Use the backend’s Render URL.</p>
                    </li>
                    <li>
                        <strong>Deploy</strong>:
                        <p>
                            Click <strong>Create Static Site</strong>. Render provides a URL (e.g.,{' '}
                            <code>https://your-front-app-name.onrender.com</code>).
                        </p>
                    </li>
                    <li>
                        <strong>Verify</strong>:
                        <p>Visit the URL to ensure the frontend connects to the backend.</p>
                    </li>
                </ol>

                <h2>Frontend-Backend Integration</h2>
                <p>The frontend communicates with the backend via RESTful API calls using <code>axios</code>. Key integration points:</p>
                <ul>
                    <li>
                        <strong>CORS Configuration</strong>: The backend uses <code>cors</code> to allow frontend requests:
                        <pre>
                            <code>{`const cors = require('cors');
app.use(cors({ origin: 'https://your-front-app-name.onrender.com' }));`}</code>
                        </pre>
                        <p className="note">
                            Replace with the frontend’s URL or use <code>*</code> for testing (not for production).
                        </p>
                    </li>
                    <li>
                        <strong>API Calls</strong>: Example React code with axios:
                        <pre>
                            <code>{`import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getBooks = async () => {
  const response = await axios.get(\`\${API_URL}/books\`);
  return response.data;
};`}</code>
                        </pre>
                    </li>
                    <li>
                        <strong>Authentication</strong>: The frontend handles user login, sending credentials to the backend’s auth
                        endpoints (if implemented).
                    </li>
                    <li>
                        <strong>Error Handling</strong>: Displays user-friendly messages for API errors.
                    </li>
                </ul>

                <h2>Project Structure</h2>
                <h3>Backend</h3>
                <ul>
                    <li>
                        <code>server.js</code>: Entry point, sets up Express and MongoDB.
                    </li>
                    <li>
                        <code>models/Book.js</code>: Mongoose schema for the Book model.
                    </li>
                    <li>
                        <code>routes/bookRoutes.js</code>: Defines API routes.
                    </li>
                    <li>
                        <code>controllers/bookController.js</code>: Handles request logic.
                    </li>
                    <li>
                        <code>.env</code>: Environment variables (not tracked).
                    </li>
                    <li>
                        <code>package.json</code>: Project metadata and dependencies.
                    </li>
                </ul>
                <h3>Frontend</h3>
                <ul>
                    <li>
                        <code>src/App.js</code>: Main React component.
                    </li>
                    <li>
                        <code>src/components/</code>: Reusable components (e.g., BookList, BookForm).
                    </li>
                    <li>
                        <code>src/styles/</code>: Tailwind CSS or custom styles.
                    </li>
                    <li>
                        <code>.env</code>: Environment variables (e.g., API URL).
                    </li>
                    <li>
                        <code>package.json</code>: Project metadata and dependencies.
                    </li>
                </ul>

                <h2>Contributing</h2>
                <p>
                    Contributions are welcome for both repositories! To contribute to{' '}
                    <a
                        href="https://github.com/FerrerMark/Mini-Library-Manager-Back"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Backend
                    </a>{' '}
                    or{' '}
                    <a
                        href="https://github.com/FerrerMark/Mini-Library-Manager-Front"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Frontend
                    </a>:
                </p>
                <ol>
                    <li>Fork the repository.</li>
                    <li>
                        Create a new branch:
                        <pre>
                            <code>git checkout -b feature/your-feature-name</code>
                        </pre>
                    </li>
                    <li>
                        Make changes and commit:
                        <pre>
                            <code>git commit -m "Add your feature description"</code>
                        </pre>
                    </li>
                    <li>
                        Push to the branch:
                        <pre>
                            <code>git push origin feature/your-feature-name</code>
                        </pre>
                    </li>
                    <li>Open a pull request on GitHub.</li>
                </ol>
                <p>Please follow existing code style and include tests. For major changes, open an issue first.</p>

                <h2>License</h2>
                <p>
                    This project is licensed under the MIT License. See the{' '}
                    <a href="LICENSE" target="_blank" rel="noopener noreferrer">
                        LICENSE
                    </a>{' '}
                    file in each repository.
                </p>

                <h2>Contact</h2>
                <p>
                    For questions or feedback, contact{' '}
                    <a href="https://github.com/FerrerMark" target="_blank" rel="noopener noreferrer">
                        FerrerMark
                    </a>{' '}
                    via GitHub.
                </p>
            </div>
            <AddBtn />
        </div>
    );
};

export default About;