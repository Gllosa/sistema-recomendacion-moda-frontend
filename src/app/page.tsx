"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.css";
import { getRecomendations } from "./services";
import {
  Container,
  Alert,
  Snackbar,
  Button,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";


const Home = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      handleClick();
      return;
    }
    getRecomendations(file);
  };
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        mt: "200px",
        flexDirection: "column",
      }}
    >
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          No has añadido ninguna imagen
        </Alert>
      </Snackbar>

      <Typography variant="h3" gutterBottom>
        Obtener Recomendación
      </Typography>
      <Box display="flex">
        <form onSubmit={handleFormSubmit}>
          <input
            id="input"
            className={styles.inputField}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="input">
            <Box
              sx={{
                width: "200px",
                height: "150px",
                bgcolor: "white",
                border: "1px dashed black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <CloudUploadIcon fontSize="large" />
            </Box>
          </label>

          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            size="small"
            sx={{ mt: "1rem" }}
          >
            <Typography>Procesar</Typography>
          </Button>
        </form>

        {file && (
          <Box sx={{ ml: "1rem" }}>
            <img
              src={URL.createObjectURL(file)}
              alt="user-image"
              height="200px"
              style={{ objectFit: "contain" }}
            />
            <Box width="100%" display="flex">
              <Typography align="center">{file.name}</Typography>
              <IconButton onClick={() => setFile(null)}>
                <DeleteIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
