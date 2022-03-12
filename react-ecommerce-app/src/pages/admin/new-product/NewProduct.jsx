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
import validationSchema from "../product-detail/validations";
import { useState } from "react";
import { post } from "../../../plugins/api";
function NewProduct(params) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleSubmit = async (values, bag) => {
    setIsUpdating(true);

    try {
      let myValues = { ...values };
      myValues.photos = JSON.stringify(myValues.photos);
      const updateRes = await post("product", myValues);
      updateRes ? setIsSuccess(true) : setIsSuccess(false);

      setIsUpdating(false);
    } catch (error) {
      bag.setErrors({
        general: error.response.data.message,
      });
    }
  };

  return (
    <>
      <Text fontSize="2xl">Edit</Text>

      <Box pt={10} textAlign="center ">
        <Heading>Add New Product</Heading>
      </Box>

      <Box my={5} textAlign="left">
        <Formik
          initialValues={{
            title: "",
            description: "",
            photos: [],
            price: "",
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
                  Add New Product
                </Button>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </>
  );
}
export default NewProduct;
