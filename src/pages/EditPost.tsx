import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { http } from '../api/http';
import PostForm from '../components/PostForm';
import { Post } from '../api/posts';

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await http.get<Post>(`/posts/${id}`);
        setPost(data);
      } catch (e: any) {
        setError(e?.message ?? 'Erro ao carregar post');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (field: keyof Post, value: string) => {
    if (!post) return;
    // Não permitir edição do autor
    if (field === 'autor') return;
    setPost({ ...post, [field]: value });
  };

  const [showToast, setShowToast] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    setSaving(true);
    setError(null);
    try {
      await http.put(`/posts/${id}`, {
        titulo: post.titulo,
        conteudo: post.conteudo,
        autor: post.autor,
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e: any) {
      setError(e?.message ?? 'Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center text-gray-400 py-10">Carregando…</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto bg-graybg shadow-lg p-8 rounded-xl mt-8">
      <Link to={`/`} className="text-pinkbrand hover:underline text-sm">← Voltar</Link>
      <h2 className="text-2xl font-bold text-white mb-6 mt-6">Editar Post</h2>
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PostForm
            post={{ ...post, autor: post.autor || '' }}
            readOnly={false}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-pinkbrand text-white py-2 font-semibold hover:bg-pink-700 transition"
            disabled={saving}
          >
            {saving ? 'Salvando…' : 'Salvar alterações'}
          </button>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </form>
      </div>
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
          Post atualizado com sucesso!
        </div>
      )}
    </div>
  );
}
