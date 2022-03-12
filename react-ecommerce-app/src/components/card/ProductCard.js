import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
function ProductCard({ product }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find((item) => item._id === product._id);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="3"
      borderColor="#000"
      borderStyle="solid"
    >
      <Link to={`/product/${product._id}`}>
        <Image src={product.photos[0]} loading="lazy" />
        <Box p="3">
          <Box d="flex" alignItems="baseline">
            {product.createdAt}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {product.title}
          </Box>
          <Box>${product.price}</Box>
        </Box>
      </Link>
      <Button
        colorScheme={findBasketItem ? 'red' :'green'}
        onClick={() => addToBasket(product, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
    </Box>
  );
}
export default ProductCard;
