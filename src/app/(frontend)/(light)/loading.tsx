export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-text/20 border-t-text rounded-full animate-spin" />
        <span className="text-text-tertiary text-sm uppercase tracking-widest">
          Loading
        </span>
      </div>
    </div>
  );
}
