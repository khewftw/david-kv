export function HeroShell({
  children,
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={className}>
      <div className={`hero-container ${innerClassName}`}>{children}</div>
    </div>
  );
}
