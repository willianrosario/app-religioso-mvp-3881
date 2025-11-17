'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { searchVerses, Verse } from '@/lib/religious-content';
import VerseCard from './verse-card';

interface SearchVersesProps {
  religion: string;
}

export default function SearchVerses({ religion }: SearchVersesProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Verse[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simular busca com IA (delay para efeito)
    setTimeout(() => {
      const searchResults = searchVerses(query, religion);
      setResults(searchResults);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-cyan-900/30 rounded-2xl p-6 shadow-lg border border-cyan-200 dark:border-cyan-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <Search className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        Buscar Versículos
      </h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite uma palavra-chave, tema ou referência..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-cyan-300 dark:border-cyan-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="mt-3 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Buscando com IA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Buscar com IA</span>
            </>
          )}
        </button>
      </form>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Encontrados {results.length} resultado(s) para "{query}"
          </p>
          {results.map((verse) => (
            <VerseCard key={verse.id} verse={verse} />
          ))}
        </div>
      )}

      {results.length === 0 && query && !isSearching && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum resultado encontrado para "{query}". Tente outras palavras-chave.
          </p>
        </div>
      )}
    </div>
  );
}
