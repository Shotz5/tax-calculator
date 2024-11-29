import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from './layout'
import CalculatorCard from './components/calculatorcard'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Layout>
        <CalculatorCard />
      </Layout>
    </ThemeProvider>
  )
}

export default App
