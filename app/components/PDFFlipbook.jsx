'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicPDFComponent = dynamic(() => import('./PDFFlipbookClient'), {
  ssr: false,
  loading: () => <p className="text-center">Loading PDF viewer...</p>,
});

const PDFFlipbook = ({ pdfurl }) => {
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    // Ensure it runs only in the browser
    setShowViewer(true);
  }, []);

  return showViewer ? <DynamicPDFComponent pdfurl={pdfurl} /> : null;
};

export default PDFFlipbook;
