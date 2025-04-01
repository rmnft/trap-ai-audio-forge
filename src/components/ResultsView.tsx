
import React from 'react';
import { Download } from 'lucide-react';
import StemPlayer from './StemPlayer';
import { Button } from '@/components/ui/button';

interface ResultsViewProps {
  stemsCount: 2 | 4;
}

const ResultsView: React.FC<ResultsViewProps> = ({ stemsCount }) => {
  // Define stem types based on the model used
  const stems = stemsCount === 2 
    ? [
        { name: 'Vocals', color: '#ff3333' },
        { name: 'Instrumental', color: '#3366ff' }
      ]
    : [
        { name: 'Vocals', color: '#ff3333' },
        { name: 'Drums', color: '#33cc33' },
        { name: 'Bass', color: '#ff9900' },
        { name: 'Other', color: '#9966ff' }
      ];
  
  const handleDownloadAll = () => {
    // In a real implementation, this would trigger the download of all stems
    console.log('Downloading all stems');
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Separated Stems</h2>
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary/20"
          onClick={handleDownloadAll}
        >
          <Download className="mr-2 h-4 w-4" />
          Download All
        </Button>
      </div>
      
      <div className="space-y-4">
        {stems.map((stem) => (
          <StemPlayer 
            key={stem.name}
            stemName={stem.name}
            stemColor={stem.color}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsView;
