import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY

function App() {
  const [searchValue, setSearchValue] = useState('')

  const heandlerSearchSubmit = (e) => {
    e.preventDefault()
    fetch(
      `https://api.unsplash.com/photos/random/?query=${searchValue}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
    setSearchValue('')
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSubmit={heandlerSearchSubmit}
      />
    </div>
  )
}

export default App
