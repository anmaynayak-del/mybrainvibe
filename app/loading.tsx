export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)]">
      <div className="relative flex flex-col items-center justify-center mb-6">
        <img 
          src="/logo.png" 
          alt="Loading BrainVibe" 
          className="h-16 sm:h-20 w-auto object-contain animate-pulse"
        />
      </div>
      <h3 className="text-sm font-semibold tracking-widest text-slate-500 uppercase animate-pulse mt-4">
        Initializing...
      </h3>
    </div>
  );
}
