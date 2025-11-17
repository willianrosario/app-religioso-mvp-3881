// Conteúdo religioso para o app Trompete

export interface Verse {
  id: string;
  religion: string;
  text: string;
  reference: string;
  category: string;
}

export interface Prayer {
  id: string;
  religion: string;
  title: string;
  text: string;
  type: 'manha' | 'noite' | 'protecao' | 'gratidao' | 'paz';
  time: string;
}

export interface Reflection {
  id: string;
  religion: string;
  title: string;
  text: string;
  author?: string;
}

export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
}

// Lista expandida de religiões
export const religions = [
  { id: 'cristianismo', name: 'Cristianismo', icon: '✝️' },
  { id: 'catolicismo', name: 'Catolicismo', icon: '⛪' },
  { id: 'islamismo', name: 'Islamismo', icon: '☪️' },
  { id: 'judaismo', name: 'Judaísmo', icon: '✡️' },
  { id: 'budismo', name: 'Budismo', icon: '☸️' },
  { id: 'hinduismo', name: 'Hinduísmo', icon: '🕉️' },
  { id: 'umbanda', name: 'Umbanda', icon: '🌟' },
  { id: 'candomble', name: 'Candomblé', icon: '🥁' },
  { id: 'espiritismo', name: 'Espiritismo', icon: '📖' },
  { id: 'xintoismo', name: 'Xintoísmo', icon: '⛩️' }
];

// Frases motivacionais diárias
export const motivationalQuotes: MotivationalQuote[] = [
  { id: 'm1', text: 'A fé move montanhas, mas o amor constrói pontes.', author: 'Provérbio' },
  { id: 'm2', text: 'Cada novo dia é uma oportunidade de recomeçar com esperança.', author: 'Anônimo' },
  { id: 'm3', text: 'A paz interior é o maior tesouro que podemos conquistar.', author: 'Sabedoria Oriental' },
  { id: 'm4', text: 'Seja a luz que você deseja ver no mundo.', author: 'Mahatma Gandhi' },
  { id: 'm5', text: 'O amor é a força mais poderosa do universo.', author: 'Provérbio Universal' },
  { id: 'm6', text: 'Acredite em si mesmo e tudo será possível.', author: 'Anônimo' },
  { id: 'm7', text: 'A gratidão transforma o que temos em suficiente.', author: 'Provérbio' }
];

// Versículos expandidos por religião
export const verses: Verse[] = [
  // Cristianismo
  { id: 'v1', religion: 'cristianismo', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', reference: 'João 3:16', category: 'amor' },
  { id: 'v2', religion: 'cristianismo', text: 'O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.', reference: 'Salmos 23:1-2', category: 'conforto' },
  { id: 'v3', religion: 'cristianismo', text: 'Tudo posso naquele que me fortalece.', reference: 'Filipenses 4:13', category: 'força' },
  { id: 'v4', religion: 'cristianismo', text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.', reference: 'Isaías 41:10', category: 'coragem' },
  { id: 'v5', religion: 'cristianismo', text: 'Entrega o teu caminho ao Senhor; confia nele, e ele o fará.', reference: 'Salmos 37:5', category: 'confiança' },
  
  // Catolicismo
  { id: 'v6', religion: 'catolicismo', text: 'Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus.', reference: 'Ave Maria', category: 'oração' },
  { id: 'v7', religion: 'catolicismo', text: 'Pai nosso que estais nos céus, santificado seja o vosso nome. Venha a nós o vosso reino.', reference: 'Pai Nosso', category: 'oração' },
  { id: 'v8', religion: 'catolicismo', text: 'Bem-aventurados os puros de coração, porque verão a Deus.', reference: 'Mateus 5:8', category: 'pureza' },
  
  // Islamismo
  { id: 'v9', religion: 'islamismo', text: 'Em nome de Allah, o Clemente, o Misericordioso. Louvado seja Allah, Senhor do Universo.', reference: 'Al-Fatiha 1:1-2', category: 'louvor' },
  { id: 'v10', religion: 'islamismo', text: 'Allah não impõe a alma alguma carga superior às suas forças.', reference: 'Al-Baqarah 2:286', category: 'misericórdia' },
  { id: 'v11', religion: 'islamismo', text: 'E quem teme a Allah, Ele lhe facilita o assunto.', reference: 'At-Talaq 65:4', category: 'confiança' },
  
  // Judaísmo
  { id: 'v12', religion: 'judaismo', text: 'Shemá Israel, Adonai Eloheinu, Adonai Echad. (Ouve, Israel, o Senhor nosso Deus, o Senhor é Um)', reference: 'Deuteronômio 6:4', category: 'fé' },
  { id: 'v13', religion: 'judaismo', text: 'Amarás o teu próximo como a ti mesmo.', reference: 'Levítico 19:18', category: 'amor' },
  { id: 'v14', religion: 'judaismo', text: 'O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.', reference: 'Números 6:24-25', category: 'bênção' },
  
  // Budismo
  { id: 'v15', religion: 'budismo', text: 'Não habite no passado, não sonhe com o futuro, concentre a mente no momento presente.', reference: 'Dhammapada', category: 'mindfulness' },
  { id: 'v16', religion: 'budismo', text: 'O ódio não cessa com o ódio, mas com o amor. Esta é uma lei eterna.', reference: 'Dhammapada 1:5', category: 'paz' },
  { id: 'v17', religion: 'budismo', text: 'A paz vem de dentro. Não a busque fora.', reference: 'Buda', category: 'paz interior' },
  
  // Hinduísmo
  { id: 'v18', religion: 'hinduismo', text: 'Quando a meditação é dominada, a mente é inabalável como a chama de uma vela em um lugar sem vento.', reference: 'Bhagavad Gita 6:19', category: 'meditação' },
  { id: 'v19', religion: 'hinduismo', text: 'Você tem o direito de trabalhar, mas nunca aos frutos do trabalho.', reference: 'Bhagavad Gita 2:47', category: 'sabedoria' },
  { id: 'v20', religion: 'hinduismo', text: 'A verdade é uma, mas os sábios a chamam por muitos nomes.', reference: 'Rig Veda', category: 'verdade' },
  
  // Umbanda
  { id: 'v21', religion: 'umbanda', text: 'Saravá! Que a luz divina ilumine nossos caminhos e que os Orixás nos protejam.', reference: 'Saudação Umbandista', category: 'proteção' },
  { id: 'v22', religion: 'umbanda', text: 'Oxalá, pai de todos, traga paz e harmonia aos nossos corações.', reference: 'Prece a Oxalá', category: 'paz' },
  { id: 'v23', religion: 'umbanda', text: 'Que Iemanjá, rainha do mar, lave nossas dores e renove nossas esperanças.', reference: 'Prece a Iemanjá', category: 'renovação' },
  
  // Candomblé
  { id: 'v24', religion: 'candomble', text: 'Axé! Que a força vital dos Orixás nos fortaleça e guie nossos passos.', reference: 'Saudação do Candomblé', category: 'força' },
  { id: 'v25', religion: 'candomble', text: 'Ogum, guerreiro divino, abra nossos caminhos e nos proteja das adversidades.', reference: 'Prece a Ogum', category: 'proteção' },
  { id: 'v26', religion: 'candomble', text: 'Oxum, mãe do amor e da prosperidade, abençoe nossas vidas com abundância.', reference: 'Prece a Oxum', category: 'prosperidade' },
  
  // Espiritismo
  { id: 'v27', religion: 'espiritismo', text: 'Fora da caridade não há salvação.', reference: 'Allan Kardec', category: 'caridade' },
  { id: 'v28', religion: 'espiritismo', text: 'Nascer, morrer, renascer ainda e progredir sempre, tal é a lei.', reference: 'Allan Kardec', category: 'evolução' },
  { id: 'v29', religion: 'espiritismo', text: 'Amai-vos uns aos outros e fazei aos outros o que quereis que vos façam.', reference: 'O Evangelho Segundo o Espiritismo', category: 'amor' },
  
  // Xintoísmo
  { id: 'v30', religion: 'xintoismo', text: 'Viva em harmonia com a natureza e honre os espíritos ancestrais.', reference: 'Ensinamento Xintoísta', category: 'harmonia' },
  { id: 'v31', religion: 'xintoismo', text: 'A pureza do coração é o caminho para a paz interior.', reference: 'Sabedoria Xintoísta', category: 'pureza' }
];

// Reflexões expandidas
export const reflections: Reflection[] = [
  { id: 'r1', religion: 'cristianismo', title: 'A Força da Fé', text: 'A fé nos move além das circunstâncias. Quando confiamos em Deus, encontramos paz mesmo nas tempestades da vida. Hoje, reflita sobre como sua fé tem sido seu alicerce e permita que ela guie seus passos.', author: 'Reflexão Diária' },
  { id: 'r2', religion: 'catolicismo', title: 'A Intercessão de Maria', text: 'Maria, mãe de Jesus, é nossa intercessora junto ao Pai. Sua humildade e obediência nos ensinam a confiar plenamente na vontade divina. Hoje, peça a intercessão de Nossa Senhora em suas necessidades.', author: 'Reflexão Diária' },
  { id: 'r3', religion: 'islamismo', title: 'A Misericórdia de Allah', text: 'Allah é o mais Misericordioso. Sua compaixão nos envolve a cada momento. Lembre-se de que não importa quão longe você tenha ido, a porta do arrependimento está sempre aberta.', author: 'Reflexão Diária' },
  { id: 'r4', religion: 'judaismo', title: 'Tikkun Olam - Reparar o Mundo', text: 'Cada ato de bondade contribui para reparar o mundo. Hoje, pense em como suas ações podem trazer luz e justiça para aqueles ao seu redor.', author: 'Reflexão Diária' },
  { id: 'r5', religion: 'budismo', title: 'O Caminho do Meio', text: 'A verdadeira paz está no equilíbrio. Não nos extremos, mas no caminho do meio encontramos a serenidade. Pratique a moderação em todas as coisas hoje.', author: 'Reflexão Diária' },
  { id: 'r6', religion: 'hinduismo', title: 'Dharma - O Caminho Correto', text: 'Viver de acordo com o dharma é viver em harmonia com o universo. Suas ações de hoje criam o karma de amanhã. Escolha sabiamente.', author: 'Reflexão Diária' },
  { id: 'r7', religion: 'umbanda', title: 'A Força dos Orixás', text: 'Os Orixás são manifestações da força divina que nos guiam e protegem. Conecte-se com a energia dos Orixás e permita que eles iluminem seu caminho.', author: 'Reflexão Diária' },
  { id: 'r8', religion: 'candomble', title: 'O Axé da Vida', text: 'Axé é a energia vital que move o universo. Cultive seu axé através de boas ações, respeito à natureza e conexão com os Orixás.', author: 'Reflexão Diária' },
  { id: 'r9', religion: 'espiritismo', title: 'A Lei do Progresso', text: 'Estamos em constante evolução espiritual. Cada experiência, cada desafio, é uma oportunidade de crescimento. Aprenda com suas vivências e siga em frente.', author: 'Reflexão Diária' },
  { id: 'r10', religion: 'xintoismo', title: 'Harmonia com a Natureza', text: 'A natureza é sagrada e merece nosso respeito. Viva em harmonia com o mundo natural e honre os espíritos que habitam todas as coisas.', author: 'Reflexão Diária' }
];

// Orações expandidas
export const prayers: Prayer[] = [
  // Cristianismo
  { id: 'p1', religion: 'cristianismo', title: 'Oração da Manhã', text: 'Senhor, obrigado por este novo dia. Que eu possa honrá-Lo em tudo que fizer. Guie meus passos e ilumine meu caminho. Que minha vida seja um reflexo do Seu amor. Amém.', type: 'manha', time: 'manhã' },
  { id: 'p2', religion: 'cristianismo', title: 'Oração da Noite', text: 'Pai Celestial, agradeço por este dia. Perdoe minhas falhas e renove minhas forças. Proteja minha família durante a noite e conceda-nos um sono tranquilo. Em nome de Jesus, amém.', type: 'noite', time: 'noite' },
  { id: 'p3', religion: 'cristianismo', title: 'Oração de Proteção', text: 'Senhor, coloque ao meu redor a armadura da Sua proteção. Guarde-me de todo mal e perigo. Que Seus anjos acampem ao meu redor e me guardem em todos os meus caminhos. Amém.', type: 'protecao', time: 'qualquer hora' },
  
  // Catolicismo
  { id: 'p4', religion: 'catolicismo', title: 'Ave Maria', text: 'Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.', type: 'manha', time: 'manhã' },
  { id: 'p5', religion: 'catolicismo', title: 'Anjo da Guarda', text: 'Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa e me ilumina. Amém.', type: 'protecao', time: 'qualquer hora' },
  
  // Islamismo
  { id: 'p6', religion: 'islamismo', title: 'Dua da Manhã', text: 'Bismillah. Alhamdulillah que me deu vida após a morte (sono) e para Ele é a ressurreição. Ó Allah, conceda-me força para este dia e proteja-me de todo mal.', type: 'manha', time: 'manhã' },
  { id: 'p7', religion: 'islamismo', title: 'Dua da Noite', text: 'Bismillah. Em Teu nome, ó Allah, eu vivo e morro. Proteja-me durante esta noite e conceda-me paz. Que eu acorde com fé renovada.', type: 'noite', time: 'noite' },
  
  // Judaísmo
  { id: 'p8', religion: 'judaismo', title: 'Modeh Ani', text: 'Modeh ani lefanecha, melech chai vekayam, shehechezarta bi nishmati bechemla, raba emunatecha. Agradeço a Ti, Rei vivo e eterno, por teres devolvido minha alma com compaixão.', type: 'manha', time: 'manhã' },
  { id: 'p9', religion: 'judaismo', title: 'Shema', text: 'Shemá Israel, Adonai Eloheinu, Adonai Echad. Baruch shem kevod malchuto leolam vaed. Ouve, Israel, o Senhor é nosso Deus, o Senhor é Um.', type: 'noite', time: 'noite' },
  
  // Budismo
  { id: 'p10', religion: 'budismo', title: 'Meditação da Manhã', text: 'Que eu desperte com compaixão. Que todos os seres sejam felizes. Que todos os seres sejam livres do sofrimento. Que eu pratique a bondade amorosa hoje.', type: 'manha', time: 'manhã' },
  { id: 'p11', religion: 'budismo', title: 'Meditação da Noite', text: 'Que eu descanse em paz. Que todos os seres encontrem tranquilidade. Que o mérito de minhas ações positivas beneficie todos os seres sencientes.', type: 'noite', time: 'noite' },
  
  // Hinduísmo
  { id: 'p12', religion: 'hinduismo', title: 'Gayatri Mantra', text: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat. Meditamos na glória do Criador que ilumina nosso intelecto.', type: 'manha', time: 'manhã' },
  { id: 'p13', religion: 'hinduismo', title: 'Oração da Paz', text: 'Om Shanti Shanti Shanti. Que haja paz em meu corpo, mente e espírito. Que haja paz em minha família e no mundo. Om.', type: 'paz', time: 'qualquer hora' },
  
  // Umbanda
  { id: 'p14', religion: 'umbanda', title: 'Prece a Oxalá', text: 'Salve Oxalá! Pai de todos, traga paz aos nossos corações. Ilumine nossos caminhos com sua luz divina. Que possamos viver em harmonia e amor. Saravá!', type: 'manha', time: 'manhã' },
  { id: 'p15', religion: 'umbanda', title: 'Prece de Proteção', text: 'Ogum, guerreiro de fé, abra nossos caminhos. Iansã, senhora dos ventos, leve embora as energias negativas. Que os Orixás nos protejam sempre. Axé!', type: 'protecao', time: 'qualquer hora' },
  
  // Candomblé
  { id: 'p16', religion: 'candomble', title: 'Saudação aos Orixás', text: 'Axé! Que Oxalá nos abençoe, que Iemanjá nos purifique, que Ogum nos proteja, que Oxum nos prospere. Que o axé dos Orixás esteja sempre conosco.', type: 'manha', time: 'manhã' },
  { id: 'p17', religion: 'candomble', title: 'Prece de Gratidão', text: 'Obrigado, Orixás, por mais um dia. Obrigado pela força, pela saúde, pela vida. Que possamos honrar vocês com nossas ações. Axé!', type: 'gratidao', time: 'qualquer hora' },
  
  // Espiritismo
  { id: 'p18', religion: 'espiritismo', title: 'Prece Matinal', text: 'Deus, nosso Pai, agradeço por este novo dia. Que eu possa praticar a caridade e o amor ao próximo. Que os bons espíritos me guiem em meus pensamentos e ações.', type: 'manha', time: 'manhã' },
  { id: 'p19', religion: 'espiritismo', title: 'Prece de Proteção', text: 'Senhor, afasta de mim os espíritos imperfeitos. Que os espíritos de luz me protejam e me guiem no caminho do bem. Que eu possa evoluir espiritualmente a cada dia.', type: 'protecao', time: 'qualquer hora' },
  
  // Xintoísmo
  { id: 'p20', religion: 'xintoismo', title: 'Oração aos Kami', text: 'Honro os Kami, espíritos da natureza e ancestrais. Que eu possa viver em harmonia com todas as coisas. Que a pureza guie meu coração.', type: 'manha', time: 'manhã' },
  { id: 'p21', religion: 'xintoismo', title: 'Oração de Purificação', text: 'Que a água purifique meu corpo, que o ar purifique minha mente, que a terra me fortaleça, que o fogo ilumine meu espírito.', type: 'paz', time: 'qualquer hora' }
];

// Função para obter conteúdo diário
export function getDailyContent(religion: string, date: Date = new Date()) {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  
  const religionVerses = verses.filter(v => v.religion === religion);
  const religionReflections = reflections.filter(r => r.religion === religion);
  
  const verseIndex = dayOfYear % religionVerses.length;
  const reflectionIndex = dayOfYear % religionReflections.length;
  const quoteIndex = dayOfYear % motivationalQuotes.length;
  
  return {
    verse: religionVerses[verseIndex] || verses[0],
    reflection: religionReflections[reflectionIndex] || reflections[0],
    motivationalQuote: motivationalQuotes[quoteIndex]
  };
}

// Função para obter orações do dia
export function getDailyPrayers(religion: string) {
  return prayers.filter(p => p.religion === religion);
}

// Função para buscar versículos
export function searchVerses(query: string, religion?: string) {
  let results = verses;
  
  if (religion) {
    results = results.filter(v => v.religion === religion);
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(v => 
      v.text.toLowerCase().includes(lowerQuery) ||
      v.reference.toLowerCase().includes(lowerQuery) ||
      v.category.toLowerCase().includes(lowerQuery)
    );
  }
  
  return results;
}
