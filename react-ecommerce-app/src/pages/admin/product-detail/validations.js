import * as yup from "yup";

const validations = yup.object().shape({
  title: yup.string().required("Zorunlu alan."),
  description: yup.string().required("Zorunlu alan."),
//   photos: yup.string().required("Zorunlu alan."),
  price: yup.string().required("Zorunlu alan."),
});

export default validations;
