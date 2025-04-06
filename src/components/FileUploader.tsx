import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { processPdf, processDocx, processTxt } from '../utils/processFiles';

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processedContent, setProcessedContent] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
      const content = await Promise.all(selectedFiles.map(processFile));
      setProcessedContent(content.join('\n\n'));
    }
  };

  const processFile = async (file: File) => {
    switch (file.type) {
      case 'application/pdf':
        return processPdf(file);
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return processDocx(file);
      case 'text/plain':
        return processTxt(file);
      default:
        return `Unsupported file type: ${file.name}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload size={48} />
          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, DOCX, TXT files</p>
        </div>
        <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
      </label>
      {files.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Selected Files:</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <h2 className="text-lg font-bold mt-4">Processed Content:</h2>
          <pre className="whitespace-pre-wrap">{processedContent}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
