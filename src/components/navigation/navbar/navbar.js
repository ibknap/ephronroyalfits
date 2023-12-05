import { useMediaQuery } from "@chakra-ui/react";
import CollapsedNavbar from "@/components/navigation/navbar/collapsed_navbar";
import UnCollapsedNavbar from "@/components/navigation/navbar/uncollapsed_navbar";
import { useCart } from "@/components/cart/cart_context";

export default function Navbar({ emitShowSearch }) {
  const { items } = useCart();
  const totalCart = items?.length || 0;
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleShowSearch = (state) => emitShowSearch(state);

  return isMobile ? (
    <CollapsedNavbar totalCart={totalCart} emitShowSearch={handleShowSearch} />
  ) : (
    <UnCollapsedNavbar
      totalCart={totalCart}
      emitShowSearch={handleShowSearch}
    />
  );
}
