import { useRef } from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { useBoxAnimation } from './hooks/useBoxAnimation';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  githubHref?: string;
  onPlayClick?: () => void;
}

export const ProjectCard = ({
  title,
  description,
  image,
  tags,
  href,
  githubHref,
  onPlayClick
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useBoxAnimation(cardRef, { intensity: 7 });

  return (
    <div
      ref={cardRef}
      className="group relative aspect-video overflow-hidden rounded-lg bg-gray-800 transform-gpu hover:shadow-blue-950 hover:shadow-lg border-2 border-blue-950"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Project Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        style={{ transform: 'translateZ(1px)' }}
      />

      {/* Hover Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:backdrop-blur-sm hover:bg-black/20 max-md:hover:bg-black/50"
        style={{ transform: 'translateZ(2px)' }}
      >
        <div className="flex h-full flex-col justify-end p-6">
          {/* Title and Actions */}
          <div className="flex justify-between items-center">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xl font-semibold text-white transform-gpu hover:text-blue-400 transition-colors duration-200"
              style={{ transform: 'translateZ(3px)' }}
            >
              <ExternalLink className="w-5 h-5" />
              {title}
            </a>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {githubHref && (
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200 bg-black/80 rounded p-2 backdrop-blur-lg"
                  style={{ transform: 'translateZ(3px)' }}
                  aria-label="View source code"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {onPlayClick && (
                <button
                  onClick={onPlayClick}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200 bg-black/80 rounded p-2 backdrop-blur-lg"
                  style={{ transform: 'translateZ(3px)' }}
                  aria-label="Play project demo"
                >
                  <Play className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Description and Tags */}
          <p className="mt-2 text-gray-300 transform-gpu" style={{ transform: 'translateZ(3px)' }}>
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 transform-gpu" style={{ transform: 'translateZ(3px)' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/85 backdrop-blur-lg px-3 py-1 text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};