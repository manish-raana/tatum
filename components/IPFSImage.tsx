// components/IPFSImage.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";

type IPFSImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const IPFSImage: React.FC<IPFSImageProps> = ({ src, alt, width, height }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const replaceUrl = (url: string) => {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setError(true);
        setIsLoading(false);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && !error && <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">Loading...</div>}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">404 Not Found</div>
      ) : (
        <Image
          src={replaceUrl(src)}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
};

export default IPFSImage;
