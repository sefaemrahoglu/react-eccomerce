import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { get } from "../../../plugins/api";
import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Alert,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";
import { useState } from "react";
import { put } from "../../../plugins/api";
function AdminProductDetail(params) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(
    ["admin:product", product_id],
    () => get("product/" + product_id)
  );
  const handleSubmit = async (values, bag) => {
    setIsUpdating(true);

    try {
      let myValues = { ...values };
      myValues.photos = JSON.stringify(myValues.photos);
      const updateRes = await put("product/" + product_id, values);
      updateRes ? setIsSuccess(true) : setIsSuccess(false);

      setIsUpdating(false);
    } catch (error) {
      bag.setErrors({
        general: error.response.data.message,
      });
    }
  };
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Text fontSize="2xl">Edit</Text>

      <Box pt={10} textAlign="center ">
        <Heading>Edit</Heading>
      </Box>

      <Box my={5} textAlign="left">
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            photos: data.photos,
            price: data.price,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <>
              {isSuccess && (
                <Box my={5}>
                  <Alert status="success">Update Success</Alert>
                </Box>
              )}
              {errors.general && (
                <Box my={5}>
                  <Alert status="error">{errors.general}</Alert>
                </Box>
              )}
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    isInvalid={touched.title && errors.title}
                    disabled={isUpdating}
                  />
                  {touched.title && errors.title && (
                    <div className="form-error">{errors.title}</div>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    isInvalid={touched.description && errors.description}
                    disabled={isUpdating}
                  />
                  {touched.description && errors.description && (
                    <div className="form-error">{errors.description}</div>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    isInvalid={touched.price && errors.price}
                    disabled={isUpdating}
                  />
                  {touched.price && errors.price && (
                    <div className="form-error">{errors.price}</div>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos &&
                          values.photos.map((element, index) => (
                            <Flex
                              key={index}
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Input
                                mt="4"
                                name={`photos.${index}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={element}
                                width="4xl"
                                disabled={isUpdating}
                                // isInvalid={touched.photos && errors.photos}
                              />
                              <Button
                                colorScheme="red"
                                ml={4}
                                mt={4}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                            </Flex>
                          ))}
                        <Button
                          colorScheme="green"
                          mt={4}
                          width="fill"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  />

                  {touched.photos && errors.photos && (
                    <div className="form-error">{errors.photos}</div>
                  )}
                </FormControl>

                <Button
                  colorScheme="blue"
                  mt={4}
                  width="full"
                  type="submit"
                  isLoading={isUpdating}
                >
                  Update
                </Button>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </>
  );
}
export default AdminProductDetail;
