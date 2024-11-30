import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from './layout'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Layout>
        <h1>Hello and welcome to the app!</h1>
      </Layout>
    </ThemeProvider>
  )
}

export default App
