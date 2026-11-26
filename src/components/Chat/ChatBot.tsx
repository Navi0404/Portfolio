import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, ExternalLink } from 'lucide-react';
import { answer, BotReply, WELCOME } from './botEngine';

interface Message extends BotReply {
  id: number;
  from: 'bot' | 'user';
}

const linkClass = 'text-primary-600 dark:text-primary-400 underline underline-offset-2 break-all';

// Makes URLs and email addresses clickable.
const linkify = (text: string, keyBase: string) =>
  text.split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,]+$/, '');
      return (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {href}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      const email = part.replace(/\.+$/, '');
      return (
        <a key={key} href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      );
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });

// Renders **bold**, links and emails inside a line of text.
const renderInline = (line: string) =>
  line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-gray-900 dark:text-white">
        {linkify(part.slice(2, -2), `b${i}`)}
      </strong>
    ) : (
      <React.Fragment key={i}>{linkify(part, `t${i}`)}</React.Fragment>
    )
  );

const BULLET = /^\s*(•|-|\*|\d+\.)\s+/;

const MessageText: React.FC<{ text: string }> = ({ text }) => (
  <div className="space-y-1">
    {text.split('\n').map((line, i) =>
      line.trim() === '' ? (
        <div key={i} className="h-1.5" />
      ) : BULLET.test(line) ? (
        <div key={i} className="flex gap-2">
          <span className="text-primary-500 shrink-0">•</span>
          <span className="min-w-0">{renderInline(line.replace(BULLET, ''))}</span>
        </div>
      ) : (
        <p key={i}>{renderInline(line)}</p>
      )
    )}
  </div>
);

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', ...WELCOME }]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || typing) return;
    const history = [...messages.slice(1), { id: -1, from: 'user' as const, text: q }]
      .slice(-10)
      .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    setMessages((m) => [...m, { id: nextId.current++, from: 'user', text: q }]);
    setInput('');
    setTyping(true);

    // The local engine supplies link buttons/suggestions, and is the fallback if the LLM is unavailable.
    const local = answer(q);
    let reply: BotReply = local;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.timeout(22000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { reply?: string };
      if (!data.reply) throw new Error('Empty reply');
      reply = { text: data.reply, links: local.links, suggestions: local.suggestions ?? WELCOME.suggestions };
    } catch {
      await new Promise((r) => setTimeout(r, 400)); // keep the typing indicator visible briefly
    }

    setMessages((m) => [...m, { id: nextId.current++, from: 'bot', ...reply }]);
    setTyping(false);
  };

  const lastBot = [...messages].reverse().find((m) => m.from === 'bot');

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask me about Navinash"
            className="fixed z-50 bottom-24 right-4 left-4 sm:left-auto sm:right-8 sm:w-[380px] h-[min(560px,calc(100vh-8rem))] flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-primary-500 text-white">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Ask me</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Answers only from this portfolio</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed rounded-2xl px-3.5 py-2.5 ${
                      m.from === 'user'
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-bl-md'
                    }`}
                  >
                    {m.from === 'user' ? m.text : <MessageText text={m.text} />}
                    {m.links && m.links.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {m.links.map((l) => {
                          const external = /^https?:/.test(l.href);
                          return (
                            <a
                              key={l.label + l.href}
                              href={l.href}
                              target={external ? '_blank' : undefined}
                              rel={external ? 'noopener noreferrer' : undefined}
                              onClick={() => !external && l.href.startsWith('#') && setOpen(false)}
                              className="inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-primary-600 dark:text-primary-400 hover:border-primary-400"
                            >
                              {l.label}
                              {external && <ExternalLink className="w-3 h-3" />}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md bg-gray-100 dark:bg-gray-800 px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {!typing && lastBot?.suggestions && (
              <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto">
                {lastBot.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="shrink-0 text-xs font-medium rounded-full px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-800"
            >
              <label htmlFor="chatbot-input" className="sr-only">Ask a question</label>
              <input
                id="chatbot-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, resume…"
                autoComplete="off"
                maxLength={300}
                className="flex-1 min-w-0 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="p-2.5 rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed z-50 bottom-8 right-4 sm:right-8 inline-flex items-center gap-2 rounded-full bg-primary-500 hover:bg-primary-600 text-white pl-4 pr-5 py-3 shadow-lg hover:shadow-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Ask me'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {open ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        <span className="text-sm font-semibold">{open ? 'Close' : 'Ask me'}</span>
      </motion.button>
    </>
  );
};

export default ChatBot;
