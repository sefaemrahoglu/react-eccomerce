import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { get } from "../../plugins/api";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";

import { useBasket } from "../../contexts/BasketContext";
function ProductDetail() {
  const { items, addToBasket } = useBasket();
  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(["product", product_id], () =>
    get("product/" + product_id)
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((url) => ({ original: url, thumbnail: url }));
  const findBasketItem = items.find((item) => item._id === data._id);

  return (
    <>
      <Button
        colorScheme={findBasketItem ? 'red' :'green'}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{data.createdAt}</Text>
      <p>{data.description}</p>
      <p>${data.price}</p>
      <Box margin="10">
        <ImageGallery items={images} />
      </Box>
    </>
  );
}
export default ProductDetail;
