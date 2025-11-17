'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, Copy, MessageCircle } from 'lucide-react';
import { Verse } from '@/lib/religious-content';

interface VerseCardProps {
  verse: Verse;
  showComments?: boolean;
  onToggleComments?: () => void;
}

export default function VerseCard({ verse, showComments = false, onToggleComments }: VerseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    // Verificar se está favoritado
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.includes(verse.id));

    // Contar comentários
    const comments = JSON.parse(localStorage.getItem(`comments-${verse.id}`) || '[]');
    setCommentsCount(comments.length);
  }, [verse.id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorited) {
      const newFavorites = favorites.filter((id: string) => id !== verse.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorited(false);
    } else {
      favorites.push(verse.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorited(true);
    }
  };

  const handleCopy = async () => {
    const text = `${verse.text}\n\n— ${verse.reference}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `${verse.text}\n\n— ${verse.reference}\n\nCompartilhado via Trompete 🎺`;
    const encodedText = encodeURIComponent(text);
    
    // Abrir menu de compartilhamento nativo se disponível
    if (navigator.share) {
      navigator.share({
        title: 'Versículo do Dia',
        text: text,
      }).catch(() => {
        // Fallback para WhatsApp
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
      });
    } else {
      // Fallback para WhatsApp
      window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full mb-3">
          {verse.category}
        </span>
        <p className="text-lg md:text-xl text-gray-800 dark:text-gray-100 leading-relaxed mb-4 font-serif italic">
          "{verse.text}"
        </p>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-semibold">
          — {verse.reference}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleFavorite}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isFavorited
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium hidden sm:inline">
            {isFavorited ? 'Favoritado' : 'Favoritar'}
          </span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
        >
          <Copy className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">
            {copied ? 'Copiado!' : 'Copiar'}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Compartilhar</span>
        </button>

        {showComments && (
          <button
            onClick={onToggleComments}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 ml-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{commentsCount}</span>
          </button>
        )}
      </div>
    </div>
  );
}
