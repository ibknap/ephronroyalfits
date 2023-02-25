import { useMediaQuery } from "@chakra-ui/react";
import CollapsedNavbar from "./collapsed_navbar";
import UnCollapsedNavbar from "./uncollapsed_navbar";

export default function Navbar() {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return isMobile ? <CollapsedNavbar /> : <UnCollapsedNavbar />;
}
