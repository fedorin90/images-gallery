import { Button, Card } from 'react-bootstrap';

const ImageCard = (propps) => {
  const { image, deleteImage, saveImage } = propps;
  const authorPortfolioUrl = image.user?.portfolio_url;
  const authorName = image.user?.name || 'No author name';
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
        <Card.Footer className="text-center text-muted mt-2">
          {authorPortfolioUrl && (
            <Card.Link
              target="_blank"
              style={{ textDecoration: 'none' }}
              href={image.user.portfolio_url}
            >
              {authorName}
            </Card.Link>
          )}
          {!authorPortfolioUrl && authorName}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
