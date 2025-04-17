export default function Card({ title, description, className, style, link }) {
  return (
    <div
      className={`w-64 h-96 bg-background border-2 border-border flex flex-col px-8 hover:scale-110 require-pointer transition-all items-center justify-evenly ${className}`}
      style={{ ...style }}
    >
      <h3 className="text-lg text-foreground font-frontage-regular w-full flex items-center justify-center text-center font-bold">{title}</h3>
      <p className="text-text-secondary text-md w-full flex items-center justify-center text-center font-sf">{description}</p>
    </div>
  );
}
