import BookList from '../components/BookList';
import Header from '../components/Header';
import Authors from '../components/Authors';
import AddBtn from '../components/moreBtn';
import '../css/home.css';
import '../css/components.css';

function Home() {
  return (
    <div className="home">
      <Header />  
      <h1 className="h1">Library</h1>
      <BookList />
      <AddBtn />
    </div>
  );
}

export default Home;
