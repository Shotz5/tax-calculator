import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/layout'
import { Routes, Route } from 'react-router'
import Home from '@/pages/Home'
import BCTaxPage from '@/pages/BCTaxPage'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/bc' element={<BCTaxPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
