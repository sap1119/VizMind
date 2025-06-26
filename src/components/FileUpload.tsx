import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading, error }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      onFileUpload(csvFile);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-gray-50'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
      >
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 font-medium">Processing your data...</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Upload Your Data
                </h3>
                <p className="text-gray-600">
                  Drag and drop your CSV file here, or click to browse
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <FileText className="w-4 h-4" />
                <span>Supports CSV files up to 10MB</span>
              </div>
            </div>

            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};