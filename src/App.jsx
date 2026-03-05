import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import UserData from './pages/Dashboard/UserData'
import AddSkills from './pages/Dashboard/Skills/AddSkills'
import Skills from './pages/Dashboard/Skills/ShowSkills'
import UpdateSkills from './pages/Dashboard/Skills/UpdateSkills'
import ShowProjects from './pages/Dashboard/Projects/ShowProjects'
import AddProject from './pages/Dashboard/Projects/AddProject'
import UpdateProject from './pages/Dashboard/Projects/UpdateProject'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<><Dashboard /> </> } >
          <Route path='users' element={<UserData />} />

          <Route path='skills' element={<Skills />} />
          <Route path='add-skills' element={<AddSkills />} />
          <Route path='update-skills/:id' element={<UpdateSkills />} />

          <Route path='projects' element={<ShowProjects />} />
          <Route path='add-projects' element={<AddProject />} />
          <Route path='update-projects/:id' element={<UpdateProject />} />

        
        </Route>

      </Routes>
    </>
  )
}

export default App