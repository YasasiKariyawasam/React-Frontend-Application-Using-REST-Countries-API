import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CountryList from './pages/CountriesList';
import CountryPage from './pages/CountryPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-bold text-green-600">Countries App</h1>
              <UserProfile />
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/landingpage" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <CountryList />
                </ProtectedRoute>
              } />
              
              <Route path="/country/:code" element={
                <ProtectedRoute>
                  <CountryPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;