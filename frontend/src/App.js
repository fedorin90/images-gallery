import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);

  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random/?query=${searchValue}&client_id=${UNSPLASH_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages([{ ...data, title: searchValue }, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });
    setSearchValue('');
  };

  const handleDeleteImages = (id) => {
    return setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="App">
      <Header />
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSubmit={handlerSearchSubmit}
      />
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image) => (
            <Col className="pb-3" key={image.id}>
              <ImageCard image={image} deleteImage={handleDeleteImages} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
