import React from 'react';
import FileUploader from './components/FileUploader';
import UrlInput from './components/UrlInput';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Story Content Extractor</h1>
      <FileUploader />
      <UrlInput />
      {/* TO DO: Add output section for processed content */}
    </div>
  );
}

export default App;
