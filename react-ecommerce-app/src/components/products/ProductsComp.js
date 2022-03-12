import { SimpleGrid, Box } from "@chakra-ui/react";
import ProductCard from "../card/ProductCard";
import { useQuery } from "react-query";
import { get } from "../../plugins/api";

function ProductComp() {
  const { isLoading, error, data } = useQuery("products", ()=>get('product'));
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log(data, "data");

  return (
    <>
      <h1 className="page-title">Product List</h1>
      <SimpleGrid columns={[2, null, 3]} spacing="40px">
        {data.map((element) => (
          <Box key={element._id}>
            <ProductCard product={element} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
export default ProductComp;
