
export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen animated-background p-4">
      {children}
    </div>
  );
}
