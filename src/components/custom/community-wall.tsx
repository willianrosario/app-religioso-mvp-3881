'use client';

import { useState, useEffect } from 'react';
import { Send, Heart, Trash2, Users } from 'lucide-react';

interface CommunityPost {
  id: string;
  author: string;
  text: string;
  timestamp: number;
  likes: number;
}

export default function CommunityWall() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    loadPosts();
    const savedName = localStorage.getItem('userName') || '';
    setAuthorName(savedName);
  }, []);

  const loadPosts = () => {
    const stored = localStorage.getItem('communityPosts');
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim() || !authorName.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      author: authorName,
      text: newPost,
      timestamp: Date.now(),
      likes: 0
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
    localStorage.setItem('userName', authorName);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const handleDelete = (postId: string) => {
    const updatedPosts = posts.filter(p => p.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-teal-900/30 rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-teal-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Mural da Comunidade
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Compartilhe como o Trompete impactou sua vida
          </p>
        </div>
      </div>

      {/* Formulário de nova publicação */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Seu nome"
          className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          required
        />
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Compartilhe seu testemunho ou reflexão..."
          rows={3}
          className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
          required
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
        >
          <Send className="w-5 h-5" />
          Publicar no Mural
        </button>
      </form>

      {/* Lista de publicações */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
            <Users className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Seja o primeiro a compartilhar! 🌟
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Conte como o Trompete tem ajudado em sua jornada espiritual
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {post.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(post.timestamp)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Deletar publicação"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {post.text}
              </p>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
