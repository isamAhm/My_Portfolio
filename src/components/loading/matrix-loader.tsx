import { cn } from '@/lib/utils';

interface MatrixLoaderProps {
  className?: string;
  color?: string;
}

export function MatrixLoader({ className, color = 'primary' }: MatrixLoaderProps) {
  return (
    <div
      className={cn(
        'w-1 aspect-square rounded-full',
        '[box-shadow:19px_-19px_0_0,38px_-19px_0_0,57px_-19px_0_0,19px_0_0_5px,38px_0_0_5px,57px_0_0_5px,19px_19px_0_0,38px_19px_0_0,57px_19px_0_0]',
        '-translate-x-[38px]',
        'animate-matrix-loader',
        color && `text-${color}`, // Ensure proper interpolation
        className
      )}
    />
  );
}
