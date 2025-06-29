'use client';
import dynamic from 'next/dynamic';

// Point to component outside app directory
const PDFFlipbook = dynamic(() => import('../../components-client-only/PDFFlipbookClient'), {
  ssr: false,
  loading: () => <p className="text-center">Loading PDF viewer...</p>,
});

export default PDFFlipbook;
