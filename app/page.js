import MemeGallery from './components/MemeGallery';
import Header from './components/Header';

const Home = ({ initialMemes }) => {
  return (
    <div>
      <Header />
      <MemeGallery />
    </div>
  );
};

export default Home;
