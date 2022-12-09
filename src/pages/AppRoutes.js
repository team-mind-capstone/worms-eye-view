import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import AllPlantsView from './allPlants/AllPlantsView'
import SinglePlantView from './SinglePlantView'
import Journal from './Journal'
import Favorites from './Favorites'
import User from './User'
import Auth from '../components/Auth'



export default function AppRoutes() {
  // existing code here

  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route path="/allplants" element={<AllPlantsView userId={user.uid} />} />
            <Route path="/allplants/:plantId" element={<SinglePlantView userId={user.uid} />} />
            <Route path="/" element={<App userId={user.uid} user={user} />} />
            <Route path="/journal" element={<Journal userId={user.uid} />} />
            <Route path="/favorites" element={<Favorites userId={user.uid} />} />
            <Route path="/user" element={<User />} />
          </>
        ) : (
          <>
            <Route path="/" element={<App />} />
            <Route path="/allplants" element={<AllPlantsView />} />
            <Route path="/allplants/:plantId" element={<SinglePlantView />} />
            <Route path="/signUp" element={<Auth />} />
          </>
        )
      }
      </Routes>
    </>
  )
}