"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import NavBar from "@/components/NavBar";
import { Loader, SendHorizontal } from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const mdxComponents = {
  h1: (props) => <h1 {...props} className="text-3xl font-bold my-4 text-primary" />,
  h2: (props) => <h2 {...props} className="text-2xl font-semibold my-3 text-primary" />,
  h3: (props) => <h3 {...props} className="text-xl font-medium my-2 text-primary" />,
  p: (props) => <p {...props} className="my-2 text-foreground" />,
  ul: (props) => <ul {...props} className="list-disc ml-6 my-2" />,
  ol: (props) => <ol {...props} className="list-decimal ml-6 my-2" />,
  li: (props) => <li {...props} className="my-1" />,
  a: (props) => (
    <a
      {...props}
      className="text-accent underline hover:text-accent-hover transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-border pl-4 italic my-2 text-muted-foreground"
    />
  ),
  hr: () => <hr className="border-border my-6" />,
  table: (props) => (
    <div className="overflow-x-auto my-4">
      <table {...props} className="min-w-full border-collapse border border-border" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-surface-alt" />,
  th: (props) => (
    <th {...props} className="border border-border px-4 py-2 text-left font-semibold" />
  ),
  td: (props) => <td {...props} className="border border-border px-4 py-2" />,
};

const LoadingIndicator = () => (
  <div className="p-6 flex justify-center items-center min-h-[200px]">
    <Loader className="animate-spin text-accent h-8 w-8" />
  </div>
);

const MDXContent = ({ content }) => {
  const [parsedResponse, setParsedResponse] = useState(null);
  const [parseError, setParseError] = useState(null);

  useEffect(() => {
    const parseMdx = async () => {
      if (!content) return;
      
      try {
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            development: false,
          },
          parseFrontmatter: false,
        });
        
        setParsedResponse(mdxSource);
        setParseError(null);
      } catch (error) {
        console.error("Error parsing MDX:", error);
        setParseError("Failed to parse markdown response");
      }
    };

    parseMdx();
  }, [content]);

  if (parseError) {
    return <div className="p-6 text-error">{parseError}</div>;
  }

  if (!parsedResponse) {
    return <LoadingIndicator />;
  }

  return (
    <div className="p-6 mdx-content">
      <MDXRemote {...parsedResponse} components={mdxComponents} />
    </div>
  );
};

function EchoContents() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const p = searchParams.get("prompt");
    if (p) {
      const decoded = decodeURIComponent(p);
      setPrompt(decoded);
      simulateSubmission(decoded);
    }
  }, [searchParams]);

  const simulateSubmission = (p) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setSubmittedPrompt(p);
    fetchAnswer(p);
    
    const url = new URL(window.location.href);
    url.searchParams.delete("prompt");
    window.history.replaceState({}, "", url);
  };

  const fetchAnswer = async (prompt) => {
    try {
      setResponse("");
      
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.reply);
      } else {
        setResponse(`Failed to fetch response: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setResponse(`Error fetching the answer: ${error.message}`);
    } finally {
      setPrompt("");
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;
    
    setSubmittedPrompt(prompt);
    fetchAnswer(prompt);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <NavBar />
      
      <div className="mt-20 max-w-2xl w-full px-4">
        <h1 className="text-6xl font-proxima text-center font-semibold mb-4">How can I help?</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <div className="flex h-full items-center border border-border mt-2">
            <input
              type="text"
              placeholder="Ask echo!"
              className="bg-transparent p-2 flex-grow h-16 text-2xl px-8 focus:outline-none text-muted-foreground"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              type="submit"
              disabled={isProcessing || !prompt.trim()}
              className={`h-16 w-24 flex items-center justify-center border-border border-l transition ${
                isProcessing || !prompt.trim() 
                  ? "bg-surface-alt cursor-not-allowed text-text-disabled" 
                  : "bg-transparent text-foreground hover:bg-surface-alt"
              }`}
            >
              {isProcessing ? <Loader className="animate-spin" /> : <SendHorizontal />}
            </button>
          </div>
        </form>
        
        {submittedPrompt && (
          <div className="bg-background border-border border rounded-md overflow-hidden">
            {isProcessing ? (
              <LoadingIndicator />
            ) : (
                <MDXContent content={response} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function Echo() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <EchoContents />
    </Suspense>
  );
}