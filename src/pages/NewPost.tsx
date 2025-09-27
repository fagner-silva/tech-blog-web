import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { http } from "../api/http";
import PostForm from "../components/PostForm";
import { useAuth } from "../auth/AuthContext";

export default function NewPost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({ titulo: "", conteudo: "", autor: user?.perfil || "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await http.post("/posts", post);
      setToast("Post criado com sucesso!");
      setTimeout(() => {
        setToast(null);
        navigate("/");
      }, 2000);
    } catch (e: any) {
      setError("Erro ao criar post.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-graybg p-8 rounded-xl shadow-lg">
      <Link to={`/`} className="text-pinkbrand hover:underline text-sm">← Voltar</Link>
      <h2 className="text-2xl font-bold text-white mb-6 mt-6">Novo Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PostForm
          post={post}
          readOnly={false}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full rounded-md bg-pinkbrand text-white py-2 font-semibold hover:bg-pink-700 transition"
          disabled={loading}
        >
          {loading ? "Salvando…" : "Salvar"}
        </button>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </form>
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}