import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../src/pages/Home';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Login from './pages/Login';
import PostView from './pages/PostView';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost';

export default function App() {
  function HeaderNav() {
    const { user, logout } = useAuth();
    return (
      <nav className="text-sm flex items-center gap-4">
        {!user && (
          <Link to="/login" className="text-white underline-offset-4 hover:underline">Login</Link>
        )}
        {user && (
          <button
            onClick={logout}
            title="Sair"
            className="text-white hover:text-pinkbrand transition p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3" />
            </svg>
          </button>
        )}
      </nav>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="w-full bg-black flex items-center justify-between px-4 sm:px-8 py-4 shadow-md fixed top-0 left-0 z-50">
          <Link to="/" className="text-xl font-semibold text-white">TechBlog</Link>
          <HeaderNav />
        </header>
        <div className="mx-auto max-w-3xl p-4 sm:p-6 pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostView />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={<NewPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
