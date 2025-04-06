import React, { useState } from 'react';
import { processUrl } from '../utils/processFiles';

const UrlInput = () => {
  const [url, setUrl] = useState('');
  const [processedContent, setProcessedContent] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = await processUrl(url);
    setProcessedContent(content);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-lg">Process URL</button>
      {processedContent && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Processed Content:</h2>
          <pre className="whitespace-pre-wrap">{processedContent}</pre>
        </div>
      )}
    </form>
  );
};

export default UrlInput;
