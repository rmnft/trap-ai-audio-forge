import { Music } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="w-full px-4 py-4 flex justify-between items-center z-10 glass-effect">
      <div className="flex items-center">
        <div className="relative h-10 w-10 mr-3">
          <div className="absolute inset-0 rounded-full red-glow animate-pulse-glow"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Trap</span>
            <span className="text-white">AI</span>
          </h1>
          <p className="text-xs text-muted-foreground">Audio separation tool</p>
        </div>
      </div>
      <div className="wave-bars">
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "wave-bar animate-wave", 
              i === 0 && "h-[40%] animation-delay-0",
              i === 1 && "h-[70%] animation-delay-100",
              i === 2 && "h-[100%] animation-delay-200",
              i === 3 && "h-[60%] animation-delay-300"
            )}
            style={{ 
              animationDelay: `${i * 0.2}s`,
              height: `${Math.max(30, Math.random() * 100)}%`
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
