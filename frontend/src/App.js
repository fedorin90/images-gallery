import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';

const API_URL = process.env.REAT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSavedImages = async () => {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
        setLoading(false);
        toast.success('Saved images successfully dowloaded');
      } catch (error) {
        toast.error(error.message);
      }
    };
    getSavedImages();
  }, []);

  const handlerSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${searchValue}`);
      console.log(res);
      if (res.data?.errors) {
        toast.error("Image wasn't found. Please try one more time");
      } else {
        setImages([{ ...res.data, title: searchValue }, ...images]);
        toast.info(`Image ${searchValue.toUpperCase()} was found`);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setSearchValue('');
  };

  const handleDeleteImages = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        toast.warn(
          `Image ${images.find((image) => image.id === id).title.toUpperCase()} was deleted`,
        );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved['isSaved'] = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, isSaved: true } : image,
          ),
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImages}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
