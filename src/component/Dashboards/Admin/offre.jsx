import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import SidebarComponent from "./Sidebar";

const Offre = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      console.log("Auth Token:", token); // Log the token

      // Check if the token exists
      if (!token) {
        throw new Error("NO Auth"); // Throw error if no token is found
      }

      const response = await fetch("http://localhost:3300/api/v1/job/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          company: values.company,
          position: values.position,
          workType: values.workType,
          company_phone: values.company_phone,
          company_email: values.company_email,
          workLocation: values.address,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job offer");
      }

      const data = await response.json();
      console.log("Job created:", data.job); // Log the created job
    } catch (error) {
      console.error("Error:", error.message); // Log the error message
      alert(error.message); // Optional: Display error to the user
    }
  };

  return (
    <Box display="flex" sx={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <Box flex="1" p="20px">
        <Header title="CREATE OFFER" subtitle="Create a New User JOB OFFER" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company}
                  name="company"
                  error={!!touched.company && !!errors.company}
                  helperText={touched.company && errors.company}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Position"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.position}
                  name="position"
                  error={!!touched.position && !!errors.position}
                  helperText={touched.position && errors.position}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Work Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.workType}
                  name="workType"
                  error={!!touched.workType && !!errors.workType}
                  helperText={touched.workType && errors.workType}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company_phone}
                  name="company_phone"
                  error={!!touched.company_phone && !!errors.company_phone}
                  helperText={touched.company_phone && errors.company_phone}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company_email}
                  name="company_email"
                  error={!!touched.company_email && !!errors.company_email}
                  helperText={touched.company_email && errors.company_email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New Offer
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{,3}\)[ -]?)|([0-9]{,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  company: yup.string().required("required"),
  position: yup.string().required("required"),
  workType: yup
    .string()
    .oneOf(["full-time", "part-time", "internship", "contract"], "Invalid work type")
    .required("required"),
  company_phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  company_email: yup.string().email("Invalid email").required("required"),
  address: yup.string().required("required"),
});

const initialValues = {
  company: "",
  position: "",
  workType: "",
  company_phone: "",
  company_email: "",
  address: "",
};

export default Offre;
