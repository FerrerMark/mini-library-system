import Header from '../components/Header';
import '../css/about.css';
import AddBtn from '../components/moreBtn';

const About = () => {
    return (
        <div className="about">
            <Header />
            <h1 className="h1">Mini Library Manager</h1>
            <div className="about-body">
                <h2>About This System</h2>
                <p>
                    Mini Library Manager is a personal library system for organizing and tracking books in one place.
                    It is designed for simple daily use, whether you are browsing your collection, checking authors,
                    or managing books you have added.
                </p>
                <p>
                    The system uses a clean and mobile-friendly interface so it is easy to use on desktop and phone.
                    Navigation is straightforward, and each page focuses on one task to keep the workflow simple.
                </p>

                <h2>Core Features</h2>
                <ul>
                    <li>Browse the library collection from the home page.</li>
                    <li>Search authors and view author profiles.</li>
                    <li>View detailed information for each book.</li>
                    <li>Add books to the library using the Add Book form.</li>
                </ul>

                <h2>Features When Logged In</h2>
                <ul>
                    <li>Secure account login using your credentials.</li>
                    <li>Access to the protected <strong>My Books</strong> page.</li>
                    <li>Automatic session check with token expiration handling.</li>
                    <li>Account registration for new users.</li>
                </ul>

                <h2>Purpose</h2>
                <p>
                    This project focuses on providing a practical book management system experience with clear pages,
                    fast navigation, and a user-friendly flow for both guests and authenticated users.
                </p>
            </div>
            <AddBtn />
        </div>
    );
};

export default About;
