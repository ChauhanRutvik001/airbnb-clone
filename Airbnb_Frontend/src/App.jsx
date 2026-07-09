import { Navigate, Route, Routes } from 'react-router-dom'
import PropertyListing from './components/PropertyListing'
import PhotoTourPage from './pages/PhotoTourPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PropertyListing />} />
      <Route path="/photo-tour" element={<PhotoTourPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
