import { useState } from 'react';
import { http } from '../api/http';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState(''); const [password,setPassword] = useState('');
  const { login } = useAuth(); const nav = useNavigate();

  const onSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();
    const { data } = await http.post<{token:string}>('/auth/login', { email, password });
    login(data.token); nav('/');
  };

  return (
    <div className="mx-auto max-w-xs p-6">
      <h1 className="text-xl font-semibold">Entrar</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button className="w-full rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black">Entrar</button>
      </form>
    </div>
  );
}
