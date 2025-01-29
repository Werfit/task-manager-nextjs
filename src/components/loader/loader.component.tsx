import { cva, VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner.component";

const variants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-slate-50",
    },
    size: {
      fit: "w-full h-full",
      screen: "w-screen h-screen",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "fit",
  },
});

type LoaderProps = VariantProps<typeof variants> & {
  className?: string;
  spinnerProperties?: React.ComponentProps<typeof Spinner>;
};

const Loader: React.FC<LoaderProps> = ({
  variant,
  size,
  className,
  spinnerProperties,
}) => {
  return (
    <div className={variants({ variant, className, size })}>
      <Spinner {...spinnerProperties} />
    </div>
  );
};

export { Loader };
