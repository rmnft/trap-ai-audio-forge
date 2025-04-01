
import { useState, useRef } from 'react';
import { Play, Pause, Download, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface StemPlayerProps {
  stemName: string;
  stemColor: string;
  audioUrl?: string; // Will be used when connected to backend
}

const StemPlayer: React.FC<StemPlayerProps> = ({ 
  stemName, 
  stemColor,
  audioUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100); // Default value until audio is loaded
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Generate a fake waveform pattern for visualization
  const generateWaveform = (length: number) => {
    return Array.from({ length }, () => Math.random() * 0.8 + 0.2);
  };
  
  const waveformData = generateWaveform(50);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would play/pause the audio here
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const handleDownload = () => {
    // In a real implementation, you would trigger the download here
    console.log(`Downloading ${stemName}`);
  };
  
  return (
    <div className={cn(
      "glass-card p-4 rounded-lg border-l-4", 
      `border-[${stemColor}]`
    )}>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-black/50 border-primary/50 hover:bg-primary/20"
          onClick={togglePlayPause}
        >
          {isPlaying 
            ? <Pause className="h-5 w-5 text-primary" /> 
            : <Play className="h-5 w-5 text-primary" />}
        </Button>
        
        <div className="flex-1">
          <h3 className="font-medium">{stemName}</h3>
          
          <div className="relative h-10 mt-1">
            {/* Waveform visualization */}
            <div className="absolute inset-0 flex items-center">
              {waveformData.map((height, i) => (
                <div
                  key={i}
                  className="flex-1 mx-[1px]"
                  style={{ 
                    height: `${height * 100}%`, 
                    backgroundColor: i / waveformData.length < currentTime / duration 
                      ? stemColor 
                      : 'rgba(255, 255, 255, 0.2)',
                    transition: 'height 0.3s ease'
                  }}
                />
              ))}
            </div>
            
            {/* Progress indicator */}
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              className="absolute inset-0 z-10 opacity-0"
              onValueChange={(value) => setCurrentTime(value[0])}
            />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                className="w-24"
                onValueChange={handleVolumeChange}
              />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 text-muted-foreground hover:text-primary"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time in MM:SS
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default StemPlayer;
