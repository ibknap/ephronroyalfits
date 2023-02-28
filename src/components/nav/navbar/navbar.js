import { useMediaQuery } from "@chakra-ui/react";
import CollapsedNavbar from "@/components/nav/navbar/collapsed_navbar";
import UnCollapsedNavbar from "@/components/nav/navbar/uncollapsed_navbar";

export default function Navbar() {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return isMobile ? <CollapsedNavbar /> : <UnCollapsedNavbar />;
}
