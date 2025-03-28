import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
  description?: string;
  tags?: string[];
}

export const VideoModal = ({ isOpen, onClose, videoUrl, title, description, tags }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-black via-gray-950 to-black rounded-xl max-w-4xl w-full h-[75vh] p-6 border border-blue-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
          aria-label="Close video modal"
        >
          <X className="h-6 w-6 text-white" />
        </button>
        
        {videoUrl && (
          <div className="flex-shrink-0">
            <video 
              src={videoUrl} 
              controls 
              className="w-full rounded-lg"
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div 
          className="mt-4 flex flex-col gap-2 flex-grow overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-800 hover:scrollbar-thumb-blue-700 scrollbar-gutter-stable"
          onWheel={(e) => e.stopPropagation()}
        >
          {title && <h3 className="text-2xl font-bold text-blue-600">{title}</h3>}
          {description && <p className="text-gray-300">{description}</p>}
          {tags && tags.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-blue-600 mt-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded-md text-xs border border-blue-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};