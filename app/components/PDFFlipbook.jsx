'use client';
import dynamic from 'next/dynamic';

// Load only on client, never on server
const PDFFlipbook = dynamic(() => import('./PDFFlipbookClient'), {
  ssr: false,
  loading: () => <p>Loading PDF viewer...</p>,
});

export default PDFFlipbook;
