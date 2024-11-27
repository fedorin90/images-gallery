import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'

function App() {
  const [searchValue, setSearchValue] = useState('')

  const heandlerSearchSubmit = (e) => {
    e.preventDefault()
  }
  console.log(searchValue)

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
