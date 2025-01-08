import { cn } from '@/lib/utils';

interface AlienTextLoaderProps {
  className?: string;
}

export function AlienTextLoader({ className }: AlienTextLoaderProps) {
  return (
    <div
      className={cn(
        "w-fit font-mono text-3xl font-bold leading-[1.2em] h-[1.2em] overflow-hidden text-emerald-700",
        "before:content-['Loading...\\A⌰oading...\\A⌰⍜ading...\\A⌰⍜⏃ding...\\A⌰⍜⏃⎅ing...\\A⌰⍜⏃⎅⟟ng...\\A⌰⍜⏃⎅⟟⋏g...\\A⌰⍜⏃⎅⟟⋏☌...\\A⌰⍜⏃⎅⟟⋏☌⟒..\\A⌰⍜⏃⎅⟟⋏☌⟒⏁.\\A⌰⍜⏃⎅⟟⋏☌⟒⏁⋔']",
        "before:inline-block before:whitespace-pre",
        "before:animate-alien-text",
        className
      )}
    />
  );
}
