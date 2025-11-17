'use client';

import { useState } from 'react';
import { Prayer } from '@/lib/religious-content';
import { Sunrise, Moon, Shield, Heart, Sparkles, Copy, Share2 } from 'lucide-react';

interface PrayerSectionProps {
  prayers: Prayer[];
}

export default function PrayerSection({ prayers }: PrayerSectionProps) {
  const [selectedType, setSelectedType] = useState<string>('manha');
  const [copied, setCopied] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'manha': return <Sunrise className="w-5 h-5" />;
      case 'noite': return <Moon className="w-5 h-5" />;
      case 'protecao': return <Shield className="w-5 h-5" />;
      case 'gratidao': return <Heart className="w-5 h-5" />;
      case 'paz': return <Sparkles className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'manha': return 'Manhã';
      case 'noite': return 'Noite';
      case 'protecao': return 'Proteção';
      case 'gratidao': return 'Gratidão';
      case 'paz': return 'Paz';
      default: return type;
    }
  };

  const types = [...new Set(prayers.map(p => p.type))];
  const currentPrayer = prayers.find(p => p.type === selectedType) || prayers[0];

  const handleCopy = async () => {
    const text = `${currentPrayer.title}\n\n${currentPrayer.text}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `${currentPrayer.title}\n\n${currentPrayer.text}\n\nCompartilhado via Trompete 🎺`;
    const encodedText = encodeURIComponent(text);
    
    if (navigator.share) {
      navigator.share({
        title: currentPrayer.title,
        text: text,
      }).catch(() => {
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
      });
    } else {
      window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-indigo-900/30 rounded-2xl p-6 shadow-lg border border-indigo-200 dark:border-indigo-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        Orações do Dia
      </h2>

      {/* Seletor de tipo de oração */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedType === type
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {getIcon(type)}
            <span className="text-sm font-medium">{getTypeLabel(type)}</span>
          </button>
        ))}
      </div>

      {/* Oração atual */}
      {currentPrayer && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {currentPrayer.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentPrayer.time}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getIcon(currentPrayer.type)}
            </div>
          </div>

          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-serif">
            {currentPrayer.text}
          </p>

          <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm font-medium">
                {copied ? 'Copiado!' : 'Copiar'}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Compartilhar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
