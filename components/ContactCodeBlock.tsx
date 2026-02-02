"use client";

import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";
import { CheckIcon, CopyIcon, Linkedin } from "lucide-react";
import { type BundledLanguage, codeToHtml, type ShikiTransformer } from "shiki";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: BundledLanguage;
  showLineNumbers?: boolean;
};

interface CodeBlockContextType {
  code: string;
}

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

const lineNumberTransformer: ShikiTransformer = {
  name: "line-numbers",
  line(node, line) {
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: {
        className: [
          "inline-block",
          "min-w-10",
          "mr-4",
          "text-right",
          "select-none",
          "text-muted-foreground",
        ],
      },
      children: [{ type: "text", value: String(line) }],
    });
  },
};

export async function highlightCode(
  code: string,
  language: BundledLanguage,
  showLineNumbers = false,
) {
  const transformers: ShikiTransformer[] = showLineNumbers
    ? [lineNumberTransformer]
    : [];

  return await Promise.all([
    codeToHtml(code, {
      lang: language,
      theme: "one-light",
      transformers,
    }),
    codeToHtml(code, {
      lang: language,
      theme: "one-dark-pro",
      transformers,
    }),
  ]);
}

export const CodeBlock = ({
  code,
  language,
  showLineNumbers = false,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const [html, setHtml] = useState<string>("");
  const [darkHtml, setDarkHtml] = useState<string>("");
  const mounted = useRef(false);

  useEffect(() => {
    highlightCode(code, language, showLineNumbers).then(([light, dark]) => {
      if (!mounted.current) {
        setHtml(light);
        setDarkHtml(dark);
        mounted.current = true;
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [code, language, showLineNumbers]);

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-md border bg-background text-foreground",
          className,
        )}
        {...props}
      >
        <div className="relative">
          <div
            className="overflow-auto dark:hidden [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div
            className="hidden overflow-auto dark:block [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm"
            dangerouslySetInnerHTML={{ __html: darkHtml }}
          />
          {children && (
            <div className="absolute top-2 right-2 flex items-center gap-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useContext(CodeBlockContext);

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={cn("shrink-0", className)}
      onClick={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
};

export default function ContactCodeBlock() {
  const code = `function ContactMe(props={name: Ajay Pathak}) {
  return (
    <div>
      <h1>Hi visitor, greetings from {props.name}!</h1>
      <p>LinkedIn is the best way to contact me.</p>
      <p>Don't hesitate to drop me a DM there.</p>
    </div>
  );
}`;

  return (
    <>
      <hr />
      <div className="w-full max-w-2xl p-6 m-auto">
        <CodeBlock code={code} language="jsx">
          <CodeBlockCopyButton
            onCopy={() => console.log("Copied code to clipboard")}
            onError={() => console.error("Failed to copy code to clipboard")}
          />
        </CodeBlock>
      </div>
      <LinkedInCTA />
    </>
  );
}

function LinkedInCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center mt-12"
    >
      <Button
        variant="outline"
        className="flex items-center gap-2 rounded-2xl px-6 py-5 text-base"
        asChild
      >
        <a
          href="https://www.linkedin.com/in/ajay-pathak-developer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="h-5 w-5" />
          Connect on LinkedIn
        </a>
      </Button>
    </motion.div>
  );
}
