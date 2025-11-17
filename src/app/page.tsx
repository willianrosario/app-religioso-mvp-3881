'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Book, Heart, Search, Sparkles, Settings, LogOut, Users, Crown, Sun, Moon, Trash2 } from 'lucide-react';
import { getDailyContent, getDailyPrayers, religions } from '@/lib/religious-content';
import VerseCard from '@/components/custom/verse-card';
import PrayerSection from '@/components/custom/prayer-section';
import SearchVerses from '@/components/custom/search-verses';
import CommentsSection from '@/components/custom/comments-section';
import CommunityWall from '@/components/custom/community-wall';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [religion, setReligion] = useState<string>('cristianismo');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'favorites' | 'community'>('home');
  const [showComments, setShowComments] = useState(false);
  const [dailyContent, setDailyContent] = useState<any>(null);
  const [dailyPrayers, setDailyPrayers] = useState<any[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'trial' | 'active' | 'expired'>('trial');
  const [daysRemaining, setDaysRemaining] = useState(3);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    // Verificar status da assinatura
    const trialEndDate = localStorage.getItem('trialEndDate');
    const subStatus = localStorage.getItem('subscriptionStatus') as 'trial' | 'active' | 'expired';
    
    if (trialEndDate && subStatus === 'trial') {
      const endDate = new Date(trialEndDate);
      const now = new Date();
      const diffTime = endDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setDaysRemaining(diffDays > 0 ? diffDays : 0);
      setSubscriptionStatus(diffDays > 0 ? 'trial' : 'expired');
    } else {
      setSubscriptionStatus(subStatus || 'trial');
    }

    // Carregar religião salva
    const savedReligion = localStorage.getItem('userReligion');
    if (savedReligion) {
      setReligion(savedReligion);
    }
  }, [router]);

  useEffect(() => {
    if (religion) {
      const content = getDailyContent(religion);
      const prayers = getDailyPrayers(religion);
      setDailyContent(content);
      setDailyPrayers(prayers);
    }
  }, [religion]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleDeleteAccount = () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e você perderá todos os seus dados, incluindo favoritos e comentários.')) {
      localStorage.clear();
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Trompete 🎺
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {religions.find(r => r.id === religion)?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {subscriptionStatus === 'trial' && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-semibold text-amber-800 dark:text-amber-200">
                    {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'} grátis
                  </span>
                </div>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Configurações"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Configurações
            </h2>
            
            <div className="space-y-4">
              {/* Tema */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                    Tema do Aplicativo
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Escolha entre tema claro ou escuro
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4" />
                      Escuro
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" />
                      Claro
                    </>
                  )}
                </button>
              </div>

              {/* Religião */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      Religião Selecionada
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {religions.find(r => r.id === religion)?.name}
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      ⚠️ Para alterar sua religião, é necessário excluir sua conta
                    </p>
                  </div>
                </div>
              </div>

              {/* Excluir Conta */}
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-300">
                      Excluir Conta
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Esta ação é permanente e não pode ser desfeita
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === 'home'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Book className="w-5 h-5" />
              <span className="hidden sm:inline">Início</span>
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === 'search'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === 'community'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">Comunidade</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === 'favorites'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Favoritos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && dailyContent && (
          <div className="space-y-8">
            {/* Frase Motivacional */}
            <section>
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl p-6 shadow-lg border border-pink-200 dark:border-pink-700">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Mensagem Motivacional do Dia
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-gray-800 dark:text-gray-100 font-medium italic mb-2">
                  "{dailyContent.motivationalQuote.text}"
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  — {dailyContent.motivationalQuote.author}
                </p>
              </div>
            </section>

            {/* Versículo do Dia */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Versículo do Dia
                </h2>
              </div>
              <VerseCard 
                verse={dailyContent.verse} 
                showComments 
                onToggleComments={() => setShowComments(!showComments)}
              />
              {showComments && (
                <CommentsSection 
                  contentId={dailyContent.verse.id} 
                  contentType="verse" 
                />
              )}
            </section>

            {/* Reflexão Matinal */}
            <section>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-amber-900/30 rounded-2xl p-6 shadow-lg border border-amber-200 dark:border-amber-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  Reflexão Matinal
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  {dailyContent.reflection.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {dailyContent.reflection.text}
                </p>
                {dailyContent.reflection.author && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    — {dailyContent.reflection.author}
                  </p>
                )}
              </div>
            </section>

            {/* Orações do Dia */}
            <section>
              <PrayerSection prayers={dailyPrayers} />
            </section>
          </div>
        )}

        {activeTab === 'search' && (
          <SearchVerses religion={religion} />
        )}

        {activeTab === 'community' && (
          <CommunityWall />
        )}

        {activeTab === 'favorites' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              Meus Favoritos
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Seus versículos favoritos aparecerão aqui! ❤️
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Trompete 🎺 - Conectando você com sua fé diariamente
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            Conteúdo atualizado a cada 24 horas
          </p>
        </div>
      </footer>
    </div>
  );
}
