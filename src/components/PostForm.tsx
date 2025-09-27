import React from 'react';

interface PostFormProps {
  post: {
    titulo: string;
    conteudo: string;
    autor: string;
    criadoEm?: string;
  };
  readOnly?: boolean;
  onChange?: (field: 'titulo' | 'conteudo' | 'autor', value: string) => void;
  hideTituloInput?: boolean; 
}


export default function PostForm({ post, readOnly = false, onChange, hideTituloInput = false }: PostFormProps) {
  return (
    <div className="space-y-6">
      
      {!hideTituloInput && (
        <input
          type="text"
          value={post.titulo}
          readOnly={readOnly}
          onChange={e => onChange && onChange('titulo', e.target.value)}
          className={`w-full rounded-md bg-black border border-pink-700 px-4 py-2 text-white outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
          placeholder="Título"
        />
      )}
      {/* Campo de conteúdo */}
           <span className="text-gray-400 text-xl pt-4 block">Conteúdo :</span>
      <textarea
        value={post.conteudo}
        readOnly={readOnly}
        onChange={e => onChange && onChange('conteudo', e.target.value)}
        className={`w-full min-h-[120px] rounded-md bg-black border border-pink-700 px-4 py-2 text-white outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
        placeholder="Conteúdo"
      />
      {/* Autor e Data */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-gray-400 text-xs">Autor: {post.autor}</span>
        <span className="text-gray-400 text-xs">
          Publicado em: {post.criadoEm
            ? new Date(post.criadoEm).toLocaleDateString('pt-BR')
            : new Date().toLocaleDateString('pt-BR')}
        </span>
      </div>
      {/* Input de título (exibido apenas se não for ocultado) */}
    </div>
  );
}