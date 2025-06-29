'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PDFFlipbook = dynamic(
  () =>
    import('react').then(async () => {
      const { default: HTMLFlipBook } = await import('react-pageflip');
      const { BounceLoader } = await import('react-spinners');

      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

      return function PDFViewer({ pdfurl }) {
        const [loading, setLoading] = React.useState(true);
        const [pages, setPages] = React.useState([]);
        const [dimensions, setDimensions] = React.useState({ width: 500, height: 700 });

        React.useEffect(() => {
          const updateSize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
              setDimensions({ width: 300, height: 420 });
            } else if (screenWidth < 768) {
              setDimensions({ width: 400, height: 560 });
            } else {
              setDimensions({ width: 450, height: 630 });
            }
          };

          updateSize();
          window.addEventListener('resize', updateSize);
          return () => window.removeEventListener('resize', updateSize);
        }, []);

        React.useEffect(() => {
          const loadPDF = async () => {
            try {
              const loadingTask = pdfjsLib.getDocument(pdfurl);
              const pdf = await loadingTask.promise;

              const pagesImages = [];
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;
                pagesImages.push(canvas.toDataURL());
              }

              setPages(pagesImages);
            } catch (error) {
              console.error('Error loading PDF:', error);
            } finally {
              setLoading(false);
            }
          };

          loadPDF();
        }, [pdfurl]);

        return (
          <div className="flex justify-center items-center min-h-screen bg-white p-4">
            {loading ? (
              <div className="flex flex-col justify-center items-center space-y-4">
                <h1 className="text-xl text-gray-600 font-thin">Loading...</h1>
                <BounceLoader size={40} color="#2563EB" />
              </div>
            ) : (
              <div className="p-2 sm:p-0 bg-white rounded-md shadow-lg touch-pan-x">
                <HTMLFlipBook
                  width={dimensions.width}
                  height={dimensions.height}
                  showCover={true}
                  mobileScrollSupport={true}
                  className="rounded-md"
                >
                  {pages.map((img, index) => (
                    <div
                      key={index}
                      className="bg-white flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`Page ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              </div>
            )}
          </div>
        );
      };
    }),
  {
    ssr: false,
    loading: () => <p>Loading flipbook viewer...</p>,
  }
);

export default PDFFlipbook;
