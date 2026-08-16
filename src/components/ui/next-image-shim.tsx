import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Image({
  src,
  alt = '',
  width,
  height,
  priority,
  fill,
  className,
  style,
  ...props
}: ImageProps) {
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(fill
      ? {
          position: 'absolute',
          height: '100%',
          width: '100%',
          inset: 0,
        }
      : {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={combinedStyle}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
}
