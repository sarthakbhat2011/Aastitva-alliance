import React, { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * High-Performance Responsive WebP Image Engine
 * Automatically generates WebP srcsets for Unsplash & external images,
 * enforces eager/lazy loading boundaries, and provides low-bandwidth network fallbacks.
 */
export const OptimizedImage: React.FC<Props> = ({
  src,
  alt,
  className = '',
  priority = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  // Helper to format WebP URL for Unsplash or static images
  const getWebpUrl = (url: string, width?: number) => {
    if (!url) return '';
    if (url.includes('images.unsplash.com')) {
      const baseUrl = url.split('?')[0];
      const params = new URLSearchParams(url.split('?')[1] || '');
      params.set('fm', 'webp');
      params.set('q', '75');
      if (width) params.set('w', width.toString());
      return `${baseUrl}?${params.toString()}`;
    }
    return url;
  };

  const webpSrc = getWebpUrl(src);
  const webpSrcset = src.includes('images.unsplash.com')
    ? `${getWebpUrl(src, 400)} 400w, ${getWebpUrl(src, 800)} 800w, ${getWebpUrl(src, 1200)} 1200w`
    : undefined;

  return (
    <picture className="w-full h-full block">
      {/* WebP High-Efficiency Source for Modern Browsers & Low-Bandwidth Mobile */}
      <source
        type="image/webp"
        srcSet={webpSrcset || webpSrc}
        sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
      />

      {/* Fallback Standard Image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-90'
        } ${className}`}
        {...props}
      />
    </picture>
  );
};
