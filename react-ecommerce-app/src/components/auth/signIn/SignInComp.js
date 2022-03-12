import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Alert,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { useState } from "react";
import validationSchema from "./validations";
import { post } from "../../../plugins/api";

import { useAuth } from "../../../contexts/AuthContext";
function SignInComp() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { login } = useAuth();
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values, bag) => {
        console.log(validationSchema);
        console.log(values);
        try {
          const responseData = await post("auth/login", {
            email: values.email,
            password: values.password,
          });
          console.log(responseData);
          login(responseData);
          responseData.accessToken
            ? setRegisterSuccess(true)
            : setRegisterSuccess(false);
        } catch (error) {
          bag.setErrors({
            general: error.response.data.message,
          });
        }
      },
    });

  return (
    <div>
      <Flex
        align="center"
        width="full"
        justifyContent="center"
        flexDir="column"
      >
        <Box pt={10} textAlign="center ">
          <Heading>Sign In</Heading>
        </Box>
        {registerSuccess && (
          <Box my={5}>
            <Alert status="success">Sign In Success</Alert>
          </Box>
        )}
        {errors.general && (
          <Box my={5}>
            <Alert status="error">{errors.general}</Alert>
          </Box>
        )}
        <Box my={5} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isInvalid={touched.email && errors.email}
              />
              {touched.email && errors.email && (
                <div className="form-error">{errors.email}</div>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isInvalid={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <div className="form-error">{errors.password}</div>
              )}
            </FormControl>

            <Button colorScheme="blue" mt={4} width="full" type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Flex>
    </div>
  );
}
export default SignInComp;
