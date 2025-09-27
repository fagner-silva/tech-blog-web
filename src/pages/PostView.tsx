import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { http } from '../api/http';
import PostForm from '../components/PostForm';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await http.get(`/posts/${id}`);
        setPost(data);
      } catch (e: any) {
        setError(e?.message ?? 'Erro ao carregar post');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="text-center text-gray-400 py-10">Carregando…</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto bg-graybg shadow-lg p-8 rounded-xl mt-8">
      <Link to="/" className="text-pinkbrand hover:underline text-sm">← Voltar</Link>
      <h2 className="text-2xl font-bold text-white mb-6 mt-6">Título: {post.titulo}</h2>
      <div className="mt-6">
        <PostForm post={post} readOnly hideTituloInput />
      </div>
    </div>
  );
}
