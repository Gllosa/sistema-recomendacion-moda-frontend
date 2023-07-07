import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useState } from "react";
import { Alert, LinearProgress, Paper, Slider, Snackbar } from "@mui/material";
import { getRecomendations } from "@/app/services/services";
import { getImageUrl } from "@/app/utils";
import ImageGallery from "react-image-gallery";
import AttributesSelector from "../AttributesSelector/AttributesSelector";
import { SelectedAttributtes } from "@/app/services/services.interfaces";

const steps = [
  "Sube una imagen",
  "Elige el número de recomendaciones",
  "Elige los atributos indispensables",
];

const defaultSelectedAttributes: SelectedAttributtes = {
  135: false,
  136: false,
  146: false,
  115: false,
  317: false,
};

export default function MyStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recomendations, setRecomendations] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [noImageError, setNoImageError] = useState(false);
  const [recomendationsNumber, setRecomendationsNumber] = useState<number>(4);
  const [loading, setLoading] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState(
    defaultSelectedAttributes
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      processInput();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setRecomendations([]);
    setFile(null);
    setRecomendationsNumber(4);
    setSelectedAttributes(defaultSelectedAttributes);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNoImageError(false);
  };

  const processInput = async () => {
    if (!file) {
      setNoImageError(true);
      return;
    }
    setLoading(true);
    const res = await getRecomendations(
      file,
      recomendationsNumber,
      selectedAttributes
    );
    setLoading(false);
    setRecomendations(res);
  };

  const stepsMapper = (stepNumber: number) => {
    if (stepNumber == 0) {
      return <ImageUploader file={file} setFile={setFile} />;
    }
    if (stepNumber == 1) {
      return (
        <Paper sx={{ width: 500, margin: "0 auto", padding: "2rem 2rem" }}>
          <Typography color="primary">
            Numero de recomendaciones: {recomendationsNumber}
          </Typography>
          <Slider
            aria-label="Temperature"
            defaultValue={4}
            getAriaValueText={(value) => "" + value}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={20}
            onChange={(event: Event, newValue: number | number[]) =>
              setRecomendationsNumber(newValue as number)
            }
          />
        </Paper>
      );
    }
    return (
      <AttributesSelector
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
      />
    );
  };

  return (
    <Box sx={{ width: "100%", height: "100%", my: "4rem" }}>
      <Snackbar
        open={noImageError}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          No has añadido ninguna imagen
        </Alert>
      </Snackbar>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box mt="2rem">
        {activeStep === steps.length ? (
          <Box>
            {!loading ? (
              <ImageGallery
              showBullets
                items={recomendations.map((id) => {
                  return {
                    original: getImageUrl(id),
                    thumbnail: getImageUrl(id)
                  };
                })}
              />
            ) : (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Resetear</Button>
            </Box>
          </Box>
        ) : (
          <>
            {stepsMapper(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Procesar" : "Siguiente"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
