import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../api/http';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.post('/auth/login', { email, senha });
      if (data && typeof data.token === 'string' && data.token.length > 0) {
        login(data.token);
        navigate('/');
      } else {
        setError('E-mail ou senha inválidos');
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || 'E-mail ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-darkbg to-gray-700 px-4">
      <form onSubmit={handleSubmit} className="bg-graybg p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Login</h2>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 px-3 py-2 text-white focus:outline-none"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 px-3 py-2 text-white focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-pinkbrand text-white py-2 font-semibold hover:bg-pink-700 transition"
          disabled={loading}
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
