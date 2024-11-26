import { Container, Navbar } from 'react-bootstrap'

const Header = (propps) => {
  const { title } = propps
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
