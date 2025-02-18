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
        "grid grid-cols-1 lg:grid-cols-8 ",
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
