import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
 children
}: {
 children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} `}>
    {children}
  </div>
  
  );
};
