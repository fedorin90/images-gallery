import { Button, Card } from 'react-bootstrap';

const ImageCard = (propps) => {
  const { image, deleteImage, saveImage } = propps;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>
          {image.title?.toUpperCase() || image.tags[0].title.toUpperCase()}
        </Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button onClick={() => deleteImage(image.id)} variant="primary">
          Delete
        </Button>{' '}
        {!image.isSaved && (
          <Button onClick={() => saveImage(image.id)} variant="secondary">
            Save
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
