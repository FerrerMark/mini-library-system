import Header from '../components/Header';
import AddBtn from '../components/moreBtn';
import MyBooks from '../components/fetch';
import '../css/mybooks.css';
import '../css/components.css';

const Mybooks = () => {
  return (
    <div className="mybooks">
      <Header />
      <h1 className="h1">My Books</h1>
      <MyBooks />
      <AddBtn />

    </div>
  );
};

export default Mybooks;
