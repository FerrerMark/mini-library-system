import Header from "../components/Header";
import '../css/components.css';
import '../css/contacts.css';
import AddBtn from "../components/moreBtn";
const Contacts = () => {
    return (
        <div className="contacts">
            <Header />
            <h1 className="h1">Contacts</h1>
            <div className="contact body">
                <h2>Links</h2>
                <p><a href="https://github.com/FerrerMark/Mini-Library-Manager-Back" target="_blank" rel="noopener noreferrer">GitHub</a></p>

                <p><a href="https://portfolio-ferrerjohnmark26-gmailcoms-projects.vercel.app/" target="_blank" rel="noopener noreferrer">Personal Portfolio</a></p>
            </div>
            <AddBtn />
        </div>
    )
};

export default Contacts