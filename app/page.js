import PDFFlipbook from "./components/PDFFlipbook";

export default function Home() {
  return (
    <div className="flex justify-center p-3 bg-white">
      <PDFFlipbook pdfurl="/HajrEmagazine2.pdf" />
    </div>
  );
}
