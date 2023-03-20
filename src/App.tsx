
import { Container } from 'react-bootstrap'
import {Route, Routes} from 'react-router-dom'
import { Home } from './Pages/Home'
import { Store } from './Pages/Store'
import { About } from './Pages/About'
import { Navber } from './Components/Navber'
import { ShoppingCartProvider } from './Context/ShoppingCartContext'

function App() {

  return (
    <ShoppingCartProvider>
      <Navber/>
      <Container>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
