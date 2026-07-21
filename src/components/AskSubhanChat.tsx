import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { MessageCircle, X, Send } from "lucide-react";
import { askAssistant } from "@/lib/ai-actions.server";

type Message = { role: "user" | "assistant"; text: string };

export function AskSubhanChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      try {
        const response = await askAssistant({
          data: {
            message,
            history: messages.slice(-6),
          },
        });
        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(errorMsg);
        throw err;
      }
    },
    onSuccess: (response) => {
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
      setError(null);
    },
    onError: () => {
      setError("Failed to get response. Please check your API key.");
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || messages.length >= 16) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    mutation.mutate(text);
  };

  const handleSuggestedPrompt = (prompt: string, isJD: boolean) => {
    if (isJD) {
      textareaRef.current?.focus();
      setInput("Paste the job description here and I'll check if you're a fit...\n\n");
      return;
    }
    handleSendMessage(prompt);
  };

  const showSuggestions = messages.length === 0;
  const isLoading = mutation.isPending;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rounded-xl border border-border/80 bg-card/70 hover:bg-card/80 p-3 shadow-lg transition-all hover:scale-110 z-40"
        aria-label="Open chat"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-96 rounded-lg border border-border bg-card shadow-2xl flex flex-col z-40 overflow-hidden">
          {/* Header */}
          <div className="border-b border-border bg-gradient-to-r from-primary/10 to-transparent px-4 py-3">
            <h2 className="font-semibold text-sm">Ask Subhan</h2>
            <p className="text-xs text-muted-foreground">
              Ask questions about my experience or paste a JD to check fit
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {showSuggestions ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-3">Get started:</p>
                <button
                  onClick={() =>
                    handleSuggestedPrompt("What's his experience with RAG systems?", false)
                  }
                  className="w-full text-left text-xs p-2 rounded border border-border/50 bg-secondary/50 hover:bg-secondary transition"
                >
                  What's his experience with RAG systems?
                </button>
                <button
                  onClick={() => handleSuggestedPrompt("What did he build at Gogentic.ai?", false)}
                  className="w-full text-left text-xs p-2 rounded border border-border/50 bg-secondary/50 hover:bg-secondary transition"
                >
                  What did he build at Gogentic.ai?
                </button>
                <button
                  onClick={() => handleSuggestedPrompt("", true)}
                  className="w-full text-left text-xs p-2 rounded border border-border/50 bg-secondary/50 hover:bg-secondary transition"
                >
                  Paste a job description to check fit
                </button>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "ml-8 p-2 rounded bg-primary/10 text-primary-foreground/90"
                      : "mr-8 p-2 rounded bg-secondary/50 text-secondary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
            {isLoading && (
              <div className="mr-8 p-2 rounded bg-secondary/50 text-secondary-foreground text-xs">
                <span className="animate-pulse">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 space-y-2">
            {(mutation.isError || error) && (
              <p className="text-xs text-destructive">
                {error || "Something went wrong — email me at subhan.shaikh.me@gmail.com"}
              </p>
            )}
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(input);
                  }
                }}
                disabled={isLoading || messages.length >= 16}
                placeholder="Ask a question..."
                className="flex-1 resize-none rounded border border-border bg-background px-2 py-1 text-xs placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                rows={2}
              />
              <button
                onClick={() => handleSendMessage(input)}
                disabled={isLoading || !input.trim() || messages.length >= 16}
                className="px-2 py-1 rounded bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            {messages.length >= 16 && (
              <p className="text-xs text-muted-foreground">Chat limit reached</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
