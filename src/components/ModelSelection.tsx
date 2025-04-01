
import { useState } from 'react';
import { Music, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelOption {
  id: string;
  title: string;
  description: string;
  stemsCount: 2 | 4;
  icon: React.ReactNode;
}

interface ModelSelectionProps {
  onModelSelect: (model: string, stemsCount: 2 | 4) => void;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({ onModelSelect }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  const models: ModelOption[] = [
    {
      id: "model-2stems",
      title: "Vocals + Instrumental",
      description: "Separate vocals from instrumentals",
      stemsCount: 2,
      icon: <Music className="h-8 w-8 text-primary" />
    },
    {
      id: "model-4stems",
      title: "Full Stem Separation",
      description: "Vocals, drums, bass & other instruments",
      stemsCount: 4,
      icon: <Layers className="h-8 w-8 text-primary" />
    }
  ];
  
  const handleModelSelect = (model: ModelOption) => {
    setSelectedModel(model.id);
    onModelSelect(model.id, model.stemsCount);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Select Separation Model</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map(model => (
          <div
            key={model.id}
            className={cn(
              "glass-card p-6 rounded-lg cursor-pointer transition-all duration-300",
              "border-2 hover:bg-black/40",
              selectedModel === model.id 
                ? "border-primary red-glow" 
                : "border-transparent hover:border-primary/50"
            )}
            onClick={() => handleModelSelect(model)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 rounded-full bg-black/30 red-glow">
                {model.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{model.title}</h3>
              <p className="text-sm text-muted-foreground">{model.description}</p>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: model.stemsCount }).map((_, i) => (
                  <span 
                    key={i} 
                    className="w-3 h-3 rounded-full bg-primary opacity-80"
                  ></span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelection;
