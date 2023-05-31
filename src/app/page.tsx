"use client";

import { Container, Typography } from "@mui/material";
import MyStepper from "./components/Stepper/Stepper";
import Header from "./components/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: "2rem" }}>
        <Typography variant="h5" gutterBottom color="primary">
          Obtener Recomendación
        </Typography>
        <Typography variant="body1">
          Sube una imagen e indica cuantas recomendaciones quieres y cuales son los atributos más importantes.
        </Typography>
        <MyStepper />
      </Container>
    </>
  );
};

export default Home;
