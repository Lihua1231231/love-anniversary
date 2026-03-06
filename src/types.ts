export interface Message {
  timestamp: string;
  sender: 'me' | 'her';
  type: 'text' | 'emoji' | 'image' | 'voice' | 'video';
  content: string;
}

export interface SweetQuote {
  context?: string;
  messages: {
    sender: 'me' | 'her';
    content: string;
  }[];
}

export interface ChatData {
  messages: Message[];
  sweetQuotes: SweetQuote[];
}
