import { Loader } from "@/components/loader/loader.component";

const Loading = () => (
  <Loader
    className="absolute left-0 top-0 z-50"
    size="fit"
    spinnerProperties={{
      size: "lg",
    }}
  />
);

export default Loading;
