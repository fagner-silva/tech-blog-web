import { useEffect, useState } from 'react';
import { listPosts, deletePost, Post } from '../api/posts';
import { Link } from 'react-router-dom';

export default function Admin(){
  const [posts, setPosts] = useState<Post[]>([]);
  const load = async ()=> setPosts(await listPosts());
  useEffect(()=>{ load(); },[]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Admin</h1>
      <ul className="mt-4 space-y-3">
        {posts.map(p=>(
          <li key={p.id} className="rounded border p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.author || '—'}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Link to={`/posts/${p.id}/edit`} className="underline-offset-4 hover:underline">Editar</Link>
                <button onClick={async()=>{ if(confirm('Excluir?')){ await deletePost(p.id); await load(); }}} className="text-red-600 underline-offset-4 hover:underline">Excluir</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
