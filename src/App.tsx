import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Layout } from './components/Layout'
import Spinner from './components/Spinner'
import { useAuthStore } from './store'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const Content = React.lazy(() => import('./pages/Content'))
const Pokemons = React.lazy(() => import('./pages/Pokemon'))

function App() {
  const { user } = useAuthStore()

  if (!user) return <Navigate to="/auth" replace />

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <Content />
              </Suspense>
            }
          />
          <Route
            path="/pokemons"
            element={
              <Suspense fallback={<Spinner />}>
                <Pokemons />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  )
}

export default App
