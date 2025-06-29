'use client';
import dynamic from 'next/dynamic';

const PDFFlipbook = dynamic(() => import('./PDFFlipbookClient'), {
  ssr: false,
  loading: () => <p className="text-center">Loading PDF viewer...</p>,
});

export default PDFFlipbook;
