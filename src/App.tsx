import { HelmetProvider } from 'react-helmet-async'
import { AppRouter } from '@/router'

export default function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  )
}
