
import React, { useState, useCallback } from 'react';
import { Upload, FileAudio, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  const validateFile = (file: File) => {
    // Check file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'audio/flac'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (MP3, WAV, OGG, FLAC)",
        variant: "destructive"
      });
      return false;
    }
    
    // Check file size (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 100MB",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been selected`
        });
      }
    }
  }, [onFileSelected, toast]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been selected`
        });
      }
    }
  }, [onFileSelected, toast]);
  
  const removeFile = useCallback(() => {
    setSelectedFile(null);
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {!selectedFile ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-12 transition-colors",
            "flex flex-col items-center justify-center text-center",
            dragActive ? "border-primary bg-primary/10" : "border-muted",
            "glass-card"
          )}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Upload size={48} className="text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">Drop your audio file here</h3>
          <p className="text-muted-foreground mb-4">
            Supports MP3, WAV, OGG, FLAC (max 100MB)
          </p>
          <Button 
            variant="secondary" 
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Select file
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="audio/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <FileAudio className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium truncate">{selectedFile.name}</h3>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={removeFile} 
              className="text-muted-foreground hover:text-primary"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
