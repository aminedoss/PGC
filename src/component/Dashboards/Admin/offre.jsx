import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import SidebarComponent from "./Sidebar";
import axios from "axios"; // Import Axios

const Offre = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/v1/job/create-job", // URL de l'API
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajoutez votre token JWT si nécessaire
          },
        }
      );
      alert("Offre créée avec succès !");
      console.log("Réponse de l'API :", response.data);
    } catch (error) {
      console.error("Erreur lors de la création de l'offre :", error.response?.data || error.message);
      alert("Échec de la création de l'offre. Vérifiez vos informations.");
    }
  };

  return (
    <Box display="flex" sx={{ minHeight: "100vh" }}>
      {/* Barre latérale */}
      <SidebarComponent />

      {/* Contenu principal */}
      <Box flex="1" p="20px">
        <Header title="CRÉER UNE OFFRE" subtitle="Créer une nouvelle offre d'emploi" />

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
                  label="Entreprise"
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
                  label="Poste"
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
                  label="Type de Travail"
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
                  label="Lieu de Travail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.workLocation}
                  name="workLocation"
                  error={!!touched.workLocation && !!errors.workLocation}
                  helperText={touched.workLocation && errors.workLocation}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Créé par (User ID)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.createdBy}
                  name="createdBy"
                  error={!!touched.createdBy && !!errors.createdBy}
                  helperText={touched.createdBy && errors.createdBy}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Adresse"
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
                  Créer une offre
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

// Schéma de validation avec Yup
const checkoutSchema = yup.object().shape({
  company: yup.string().required("Le nom de l'entreprise est obligatoire"),
  position: yup.string().required("Le poste est obligatoire"),
  workType: yup
    .string()
    .oneOf(["full-time", "part-time", "contract"], "Type de travail invalide")
    .required("Le type de travail est obligatoire"),
  workLocation: yup.string().required("Le lieu de travail est obligatoire"),
  createdBy: yup.string().required("Le créateur est obligatoire"),
  address: yup.string().required("L'adresse est obligatoire"),
});

// Valeurs initiales du formulaire
const initialValues = {
  company: "",
  position: "",
  workType: "",
  workLocation: "",
  createdBy: "",
  address: "",
};

export default Offre;
