"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, Mail, Lock, Crown, Book } from "lucide-react"
import { useRouter } from "next/navigation"
import { religions } from "@/lib/religious-content"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [showReligionSelector, setShowReligionSelector] = useState(false)
  const [selectedReligion, setSelectedReligion] = useState("")

  useEffect(() => {
    // Verificar se já está autenticado
    const auth = localStorage.getItem('isAuthenticated')
    if (auth) {
      router.push('/')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      // Após login, mostrar seletor de religião
      setIsLoading(false)
      setShowReligionSelector(true)
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    
    // Simular login com Google
    setTimeout(() => {
      setIsLoading(false)
      setShowReligionSelector(true)
    }, 1500)
  }

  const handleReligionSelect = (religionId: string) => {
    setSelectedReligion(religionId)
    
    // Configurar período de teste gratuito
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 3) // 3 dias grátis
    
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", email || "usuario@gmail.com")
    localStorage.setItem("userReligion", religionId)
    localStorage.setItem("trialEndDate", trialEndDate.toISOString())
    localStorage.setItem("subscriptionStatus", "trial")
    localStorage.setItem("religionLocked", "true") // Marcar que a religião está bloqueada
    
    router.push("/")
  }

  // Seletor de religião após login
  if (showReligionSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Book className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Bem-vindo ao Trompete 🎺
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Escolha sua religião para receber conteúdo personalizado
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
              ⚠️ Atenção: Uma vez escolhida, a religião não poderá ser alterada
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {religions.map((rel) => (
              <button
                key={rel.id}
                onClick={() => handleReligionSelect(rel.id)}
                className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 group"
              >
                <div className="text-4xl mb-3">{rel.icon}</div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {rel.name}
                </h3>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
            <p className="text-xs text-center text-amber-800 dark:text-amber-200">
              Para alterar sua religião no futuro, será necessário excluir sua conta e criar uma nova.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-4xl">🎺</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Trompete
          </CardTitle>
          <CardDescription className="text-base">
            {isCreatingAccount ? 'Crie sua conta e comece sua jornada espiritual' : 'Entre para continuar sua jornada espiritual'}
          </CardDescription>
          
          {/* Banner de teste grátis */}
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 rounded-lg p-3 mt-4">
            <div className="flex items-center gap-2 justify-center">
              <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                3 dias grátis, depois R$ 19,90/mês
              </p>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              Desconto especial no plano anual: R$ 179,90/ano
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {/* Botão de login com Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mb-4 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Conectando...' : 'Continuar com Google'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                ou continue com email
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isCreatingAccount ? 'Criando conta...' : 'Entrando...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  {isCreatingAccount ? 'Criar Conta' : 'Entrar'}
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isCreatingAccount ? 'Já tem uma conta?' : 'Não tem uma conta?'}{" "}
              <button 
                onClick={() => setIsCreatingAccount(!isCreatingAccount)}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
              >
                {isCreatingAccount ? 'Fazer login' : 'Criar conta'}
              </button>
            </p>
          </div>

          {/* Informações sobre assinatura */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade.
              Após o período de teste de 3 dias, sua assinatura será renovada automaticamente por R$ 19,90/mês.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
