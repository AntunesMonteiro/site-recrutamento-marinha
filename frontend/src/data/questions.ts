export interface MultipleChoiceQuestion {
  type: "multiple_choice";
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ListaSimplesQuestion {
  type: "memory";
  variant: "lista_simples";
  items: string[];
}

export interface ParesAssociativosQuestion {
  type: "memory";
  variant: "pares_associativos";
  pairs: [string, string][];
}

export type Question = MultipleChoiceQuestion | ListaSimplesQuestion | ParesAssociativosQuestion;

const questions: Question[] = [
  // Aptidão Verbal
  {
    type: "multiple_choice",
    question: "A1: Qual das seguintes palavras é sinónima de ÁGIL?",
    options: ["Lento", "Desajeitado", "Rápido", "Pesado"],
    correctIndex: 2
  },
  {
    type: "multiple_choice",
    question: "A2: Qual o antónimo de TRISTE?",
    options: ["Sério", "Contente", "Aborrecido", "Reservado"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "A3: Que palavra completa corretamente o provérbio: \"Mais vale prevenir do que ___\"?",
    options: ["curar", "adoecer", "errar", "doer"],
    correctIndex: 0
  },
  {
    type: "multiple_choice",
    question: "A4: O que significa a palavra \"benévolo\"?",
    options: ["Mau", "Bondoso", "Violento", "Triste"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "A5: Que palavra completa a expressão: \"Quem não arrisca, não ___\"?",
    options: ["acerta", "vence", "ganha", "perde"],
    correctIndex: 2
  },
  {
    type: "multiple_choice",
    question: "A6: Sinónimo de DESTEMIDO:",
    options: ["Medroso", "Corajoso", "Inseguro", "Fraco"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "A7: Antónimo de CLARO:",
    options: ["Limpido", "Escuro", "Vivo", "Branco"],
    correctIndex: 1
  },

  // Aptidão Numérica
  {
    type: "multiple_choice",
    question: "B1: 8 + 5 = ?",
    options: ["10", "13", "14", "12"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "B2: 15 - 7 = ?",
    options: ["8", "9", "7", "6"],
    correctIndex: 0
  },
  {
    type: "multiple_choice",
    question: "B3: 3 x 4 = ?",
    options: ["7", "12", "9", "11"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "B4: 16 / 4 = ?",
    options: ["2", "3", "4", "5"],
    correctIndex: 2
  },
  {
    type: "multiple_choice",
    question: "B5: 10 + 12 = ?",
    options: ["20", "22", "21", "23"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "B6: 7 x 2 = ?",
    options: ["14", "12", "13", "15"],
    correctIndex: 0
  },
  {
    type: "multiple_choice",
    question: "B7: 20 - 9 = ?",
    options: ["10", "11", "12", "9"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "B8: 9 + 6 = ?",
    options: ["14", "15", "13", "16"],
    correctIndex: 1
  },
  {
    type: "multiple_choice",
    question: "B9: 5 x 3 = ?",
    options: ["15", "10", "12", "13"],
    correctIndex: 0
  },

  // Aptidão Mecânica
  {
    type: "multiple_choice",
    question: "C1: Um parafuso entra com mais facilidade com uma chave de fendas de...",
    options: ["Ponta gasta", "Cabo mole", "Ponta dura", "Ponta grossa"],
    correctIndex: 2
  },
  {
    type: "multiple_choice",
    question: "C2: Qual destas peças é usada para apertar porcas?",
    options: ["Martelo", "Alicate", "Chave inglesa", "Serrote"],
    correctIndex: 2
  },
  {
    type: "multiple_choice",
    question: "C3: A eletricidade circula melhor em...",
    options: ["Madeira", "Borracha", "Cobre", "Papel"],
    correctIndex: 2
  },
  {
    type: "multiple_choice",
    question: "C4: Qual destes objetos usa uma alavanca?",
    options: ["Tesoura", "Régua", "Fio", "Bolsa"],
    correctIndex: 0
  },
  {
    type: "multiple_choice",
    question: "C5: Um carro anda mais depressa em...",
    options: ["Areia", "Relva", "Alcatrão", "Lama"],
    correctIndex: 2
  },

  // Memória: Lista Simples
  {
    type: "memory",
    variant: "lista_simples",
    items: [
      "Navio", "Espada", "Farol", "Bússola", "Radar",
      "Porto", "Mastro", "Marinheiro", "Almirante", "Mapa",
      "Proa", "Âncora", "Bote", "Náutica", "Timoneiro",
      "Vela", "Barco", "Lanterna", "Mergulho", "Corrente"
    ]
  },

  // Memória: Pares Associativos
  {
    type: "memory",
    variant: "pares_associativos",
    pairs: [
      ["Dia", "Noite"], ["Chave", "Fechadura"], ["Faca", "Cortar"],
      ["Orelha", "Ouvir"], ["Olho", "Ver"], ["Boca", "Falar"],
      ["Luz", "Clareza"], ["Ferro", "Metal"], ["Janela", "Vidro"],
      ["Livro", "Leitura"], ["Água", "Beber"], ["Fogo", "Queimar"],
      ["Casa", "Morada"], ["Flor", "Perfume"], ["Céu", "Azul"],
      ["Cadeira", "Sentar"], ["Mesa", "Refeição"], ["Relógio", "Tempo"],
      ["Caneta", "Escrever"], ["Bolsa", "Dinheiro"]
    ]
  }
];

export default questions;
