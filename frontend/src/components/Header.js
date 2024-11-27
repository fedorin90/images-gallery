import { Container, Navbar } from 'react-bootstrap'

const navbarStyle = {
  backgroundColor: 'lightblue',
}

const Header = (propps) => {
  const { title } = propps
  return (
    <Navbar style={navbarStyle} data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
