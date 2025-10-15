import './App.css'
import HelloWorld from './components/HelloWorld'
import UseEffectBasics from './components/UseEffectBasics/UseEffectBasics'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PublicRoute from './components/Layout/PublicRoute'
import Login from './components/Login/Login'
import PrivateRoute from './components/Layout/PrivateRoute'
import UseStateExample from './components/useStateExample/useStateExample'
import InputExample from './components/UserCard/InputExample'
import OutputExample from './components/TitleButtonContainer/OutputExampleContainer'
import HttpExample from './components/UserDisplay/HttpExample'
import NoteList from './components/NoteList/NoteList'
import FormExample from './components/Forms/forms-example'
import MaterialExample from './components/MaterialExample/material-example'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* Only for guests */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Private */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/input-example" element={<InputExample/>} />
          <Route path="/use-state" element={<UseStateExample/>} />
          <Route path="/output-example" element={<OutputExample/>} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/use-effect" element={<UseEffectBasics />} />
          <Route path="/http-example" element={<HttpExample />} />
          <Route path="/user-display" element={<HelloWorld />} />
          <Route path="/form-example" element={<FormExample />} />
          <Route path="/material-example" element={<MaterialExample />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  )
}

export default App
