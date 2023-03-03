import { useMediaQuery } from "@chakra-ui/react";
import CollapsedNavbar from "@/components/nav/navbar/collapsed_navbar";
import UnCollapsedNavbar from "@/components/nav/navbar/uncollapsed_navbar";
import { useCart } from '@/pages/cart/cart_context';

export default function Navbar() {
    const { items } = useCart();
    const totalCart = items?.length || 0;

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return isMobile ? <CollapsedNavbar totalCart={totalCart} /> : <UnCollapsedNavbar totalCart={totalCart} />;
}
