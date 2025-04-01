
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Particles from '@/components/Particles';
import FileUpload from '@/components/FileUpload';
import ModelSelection from '@/components/ModelSelection';
import ProcessingScreen from '@/components/ProcessingScreen';
import ResultsView from '@/components/ResultsView';

const Index: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [stemsCount, setStemsCount] = useState<2 | 4>(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setIsProcessed(false);
  };
  
  const handleModelSelect = (modelId: string, stems: 2 | 4) => {
    setSelectedModel(modelId);
    setStemsCount(stems);
  };
  
  const handleStartProcessing = () => {
    setIsProcessing(true);
  };
  
  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setIsProcessed(true);
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setSelectedModel(null);
    setIsProcessed(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Particles />
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        {/* Intro Section */}
        {!selectedFile && !isProcessed && (
          <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-primary">Trap</span>AI Audio Forge
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Separate your audio into individual stems using advanced AI
            </p>
            <div className="flex justify-center gap-4 wave-bars mx-auto mb-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  className="wave-bar animate-wave" 
                  style={{ 
                    animationDelay: `${i * 0.05}s`,
                    height: `${20 + Math.random() * 40}px`,
                    opacity: 0.6 + Math.random() * 0.4
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* File Upload Section */}
        {!isProcessed && <FileUpload onFileSelected={handleFileSelected} />}
        
        {/* Model Selection Section */}
        {selectedFile && !isProcessed && (
          <>
            <ModelSelection onModelSelect={handleModelSelect} />
            
            <div className="w-full max-w-2xl mx-auto mt-8 flex justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 red-glow"
                disabled={!selectedModel}
                onClick={handleStartProcessing}
              >
                Start Processing
              </Button>
            </div>
          </>
        )}
        
        {/* Results Section */}
        {isProcessed && (
          <>
            <ResultsView stemsCount={stemsCount} />
            
            <div className="w-full max-w-2xl mx-auto mt-8 flex justify-center">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-primary/50 text-primary hover:bg-primary/20"
              >
                Process Another Track
              </Button>
            </div>
          </>
        )}
      </main>
      
      {/* Processing Modal */}
      <ProcessingScreen 
        isVisible={isProcessing} 
        onComplete={handleProcessingComplete} 
      />
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>TrapAI Audio Forge &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
