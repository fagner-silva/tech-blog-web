import { http } from './http';
export type Post = { _id:string; titulo:string; conteudo:string; autor?:string; status:string; criadoEm:string };

export const listPosts   = async () => (await http.get<Post[]>('/posts/all')).data;
export const getPost     = async (id:string) => (await http.get<Post>(`/posts/${id}`)).data;
export const createPost  = async (p:Omit<Post,'id'>) => (await http.post<Post>('/posts', p)).data;
export const updatePost  = async (id:string, p:Partial<Post>) => (await http.put<Post>(`/posts/${id}`, p)).data;
export const deletePost  = async (id:string) => { await http.delete(`/posts/${id}`); };
export const searchPosts = async (query:string) => (await http.get<Post[]>('/posts/search', { params: { query } })).data;
