declare module 'next/image' {
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

  const Image: React.FC<ImageProps>;
  export default Image;
}
