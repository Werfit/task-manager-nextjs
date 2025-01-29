import { permanentRedirect } from "next/navigation";

const Page = () => {
  throw permanentRedirect("/dashboard");
};

export default Page;
