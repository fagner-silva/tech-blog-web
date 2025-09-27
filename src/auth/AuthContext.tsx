import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {jwtDecode }from 'jwt-decode';

type Decoded = { perfil?: string; exp?: number };
type User = { perfil?: string } | null;
type Ctx = { user:User; token:string|null; login:(t:string)=>void; logout:()=>void; hasRole:(...r:string[])=>boolean; };

const C = createContext<Ctx>({} as any);

export function AuthProvider({ children }:{children:React.ReactNode}){
  const [token,setToken] = useState<string|null>(()=>localStorage.getItem('token'));
  const [user,setUser] = useState<User>(null);

  useEffect(()=>{
    if(!token){ setUser(null); return; }
    try{
      const d = jwtDecode<Decoded>(token);
      const now = Math.floor(Date.now()/1000);
      if(d.exp && d.exp < now){ localStorage.removeItem('token'); setToken(null); setUser(null); return; }
      setUser({ perfil: d.perfil });
      localStorage.setItem('token', token);
    }catch(e){
      setUser(null);
    }
  },[token]);

  const hasRole = (...roles:string[]) => user?.perfil ? roles.includes(user.perfil) : false;
  const value = useMemo(()=>({ user, token, login:setToken, logout:()=>{localStorage.removeItem('token'); setToken(null); setUser(null);} , hasRole }),[user, token]);

  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useAuth = () => useContext(C);
