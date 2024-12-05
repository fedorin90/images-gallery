import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#eeee',
};

const Header = () => {
  return (
    <Navbar style={navbarStyle} data-bs-theme="light">
      <Container>
        <Logo style={{ maxWidth: '12rem', maxHeight: '2rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
