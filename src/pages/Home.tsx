
import { useEffect, useState, useRef } from 'react';
import { listPosts, searchPosts, Post, deletePost } from '../api/posts';
import { http } from '../api/http';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Home() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [posts, setPosts] = useState<Post[]>([]);
	const [q, setQ] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [confirmDelete, setConfirmDelete] = useState<{ id: string; titulo: string } | null>(null);
	const [toast, setToast] = useState<string | null>(null);
	const deleteTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				setError(null);
				let data: Post[] = [];
				if (user) {
					const resp = await http.get<Post[]>('/posts');
					data = resp.data;
				} else {
					const resp = await http.get<Post[]>('/posts/all');
					data = resp.data;
				}
				setPosts(data);
			} catch (e: any) {
				setError(e?.message ?? 'Erro ao carregar posts');
			} finally {
				setLoading(false);
			}
		})();
	}, [user]);

	const onSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			setError(null);
			let data: Post[] = [];
			if (q.trim()) {
				data = await searchPosts(q.trim());
			} else if (user) {
				const resp = await http.get<Post[]>('/posts');
				data = resp.data;
			} else {
				const resp = await http.get<Post[]>('/posts/all');
				data = resp.data;
			}
			setPosts(data);
		} catch (e: any) {
			setError(e?.message ?? 'Erro ao buscar posts');
		} finally {
			setLoading(false);
		}
	};

	const onClear = async () => {
		setQ('');
		setLoading(true);
		setError(null);
		try {
			let data: Post[] = [];
			if (user) {
				const resp = await http.get<Post[]>('/posts');
				data = resp.data;
			} else {
				const resp = await http.get<Post[]>('/posts/all');
				data = resp.data;
			}
			setPosts(data);
		} catch (e: any) {
			setError(e?.message ?? 'Erro ao recarregar posts');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await deletePost(id);
			setPosts((posts) => posts.filter((p) => p._id !== id));
			setToast('Post deletado com sucesso!');
			if (deleteTimeout.current) clearTimeout(deleteTimeout.current);
			deleteTimeout.current = setTimeout(() => setToast(null), 3000);
		} catch (e) {
			setToast('Erro ao deletar post.');
			if (deleteTimeout.current) clearTimeout(deleteTimeout.current);
			deleteTimeout.current = setTimeout(() => setToast(null), 3000);
		}
		setConfirmDelete(null);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-20 to-gray-200 py-10 px-2">
			<div className="max-w-4xl mx-auto bg-darkbg p-8 rounded-xl">
				{/* Form de busca */}
				<form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Buscar por palavra-chave…"
						className="w-full rounded-md bg-black border border-pink-700 px-4 py-2 text-white outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition"
					/>
					<div className="flex gap-2">
						<button className="rounded-md bg-pinkbrand text-white px-4 py-2 text-base font-medium hover:bg-pink-700 transition" type="submit">
							Buscar
						</button>
						<button
							type="button"
							onClick={onClear}
							className="rounded-md border-gray-300 px-4 py-2 text-white text-gray-700 bg-pinkbrand hover:bg-pink-700 transition"
						>
							Limpar
						</button>
					</div>
				</form>

				{/* Estados de carregamento/erro */}
				{loading && <p className="mt-4 text-base text-gray-500 text-center animate-pulse">Carregando…</p>}
				{error && !loading && <p className="mt-4 text-base text-red-600 text-center">{error}</p>}

				{/* Tabela para desktop e cards para mobile */}
				{!loading && !error && (
					<>
						{/* Tabela para telas médias e grandes */}
						<div className="overflow-x-auto mt-6 hidden sm:block">
							<table className="min-w-full divide-y divide-gray-200 bg-darkbg-900 rounded-xl">
								<thead>
									<tr>
										<th className="px-6 py-3 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Título</th>
										<th className="px-6 py-3 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">Data de Publicação</th>
										<th className="px-6 py-3 text-left text-xs font-bold text-gray-200 uppercase tracking-wider w-32"></th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-800">
									{posts.length === 0 && (
										<tr>
											<td colSpan={3} className="px-6 py-4 text-center text-gray-400">Nenhum post encontrado.</td>
										</tr>
									)}
									{posts.map((p) => (
										<tr key={p._id} className="hover:bg-gray-800 transition">
											<td className="px-6 py-4 font-medium text-white">{p.titulo}</td>
											<td className="px-6 py-4 text-gray-300">{new Date(p.criadoEm).toLocaleDateString('pt-BR')}</td>
											<td className="px-6 py-4">
												<div className="flex gap-3 items-center">
													<Link to={`/post/${p._id}`} title="Visualizar postagem" aria-label="Visualizar postagem" className="text-white hover:text-pinkbrand">
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
															<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C2.25 12 5.25 5.25 12 5.25s9.75 6.75 9.75 6.75-3 6.75-9.75 6.75S2.25 12 2.25 12z" />
															<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
														</svg>
													</Link>
													{user && (
														<>
															<Link to={`/edit/${p._id}`} title="Editar postagem" aria-label="Editar postagem" className="text-white hover:text-pinkbrand">
																<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
																	<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L8.466 18.823a4.2 4.2 0 0 1-1.768 1.06l-3.18.954.954-3.18a4.2 4.2 0 0 1 1.06-1.768L16.862 4.487ZM19.5 8.25l-3-3" />
																</svg>
															</Link>
															<button title="Excluir postagem" aria-label="Excluir postagem" className="text-white hover:text-pinkbrand" onClick={() => setConfirmDelete({ id: p._id, titulo: p.titulo })}>
																<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
																	<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
																</svg>
															</button>
														</>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Cards para mobile */}
						<div className="flex flex-col gap-4 sm:hidden mt-6">
							{posts.length === 0 && (
								<div className="bg-darkbg rounded-xl p-4 text-center text-gray-400">Nenhum post encontrado.</div>
							)}
							{posts.map((p) => (
								<div key={p._id} className="bg-darkbg rounded-xl p-4 shadow flex flex-col gap-2">
									<div className="font-bold text-white text-lg">{p.titulo}</div>
									<div className="text-gray-400 text-xs">Publicado em: {new Date(p.criadoEm).toLocaleDateString('pt-BR')}</div>
									<div className="flex gap-4 mt-2">
										<Link to={`/post/${p._id}`} title="Visualizar postagem" aria-label="Visualizar postagem" className="text-white hover:text-pinkbrand">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C2.25 12 5.25 5.25 12 5.25s9.75 6.75 9.75 6.75-3 6.75-9.75 6.75S2.25 12 2.25 12z" />
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										</Link>
										{user && (
											<>
												<Link to={`/edit/${p._id}`} title="Editar postagem" aria-label="Editar postagem" className="text-white hover:text-pinkbrand">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
														<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L8.466 18.823a4.2 4.2 0 0 1-1.768 1.06l-3.18.954.954-3.18a4.2 4.2 0 0 1 1.06-1.768L16.862 4.487ZM19.5 8.25l-3-3" />
													</svg>
												</Link>
												<button title="Excluir postagem" aria-label="Excluir postagem" className="text-white hover:text-pinkbrand" onClick={() => setConfirmDelete({ id: p._id, titulo: p.titulo })}>
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
														<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											</>
										)}
									</div>
								</div>
							))}
						</div>
					</>
				)}

				{/* Toast de confirmação de exclusão */}
				{confirmDelete && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
						<div className="bg-darkbg p-6 rounded-xl shadow-xl max-w-xs w-full flex flex-col items-center">
							<div className="text-white text-lg font-semibold mb-2 text-center">Tem certeza que deseja excluir?</div>
							<div className="text-gray-300 text-sm mb-4 text-center">A ação é <span className="text-red-400 font-bold">irreversível</span>.<br />Post: <span className="font-bold">{confirmDelete.titulo}</span></div>
							<div className="flex gap-3 w-full justify-center">
								<button
									className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
									onClick={() => handleDelete(confirmDelete.id)}
								>Excluir</button>
								<button
									className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold"
									onClick={() => setConfirmDelete(null)}
								>Cancelar</button>
							</div>
						</div>
					</div>
				)}
				{/* Toast de feedback */}
				{toast && (
					<div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
						{toast}
					</div>
				)}

				{/* Botão flutuante de novo post */}
				{user && (
					<button
						onClick={() => navigate('/new')}
						className="fixed bottom-8 right-8 z-50 bg-pinkbrand hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-md shadow-lg text-lg flex items-center gap-2 transition"
						title="Adicionar novo post"
						aria-label="Adicionar novo post"
					>
						<span className="text-2xl">+</span> Novo post
					</button>
				)}
			</div>
		</div>
	);
}

