import OriginalLink from "next/link";
import { Button } from "../ui/button";

type LinkProps = React.ComponentProps<typeof OriginalLink>;

const Link: React.FC<LinkProps> = (props) => (
  <Button asChild variant="link" size="spaceless">
    <OriginalLink {...props} />
  </Button>
);

export { Link };
