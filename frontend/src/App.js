import { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';

const API_URL = process.env.REAT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);

  const handlerSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${searchValue}`);
      setImages([{ ...res.data, title: searchValue }, ...images]);
    } catch (error) {
      console.log(error);
    }
    setSearchValue('');
  };

  const handleDeleteImages = (id) => {
    return setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSubmit={handlerSearchSubmit}
      />
      <Container className="mt-4">
        {images.length > 0 ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image) => (
              <Col className="pb-3" key={image.id}>
                <ImageCard image={image} deleteImage={handleDeleteImages} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
