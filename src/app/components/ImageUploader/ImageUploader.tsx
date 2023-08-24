/* eslint-disable @next/next/no-img-element */
import { Box, IconButton, Typography, Paper, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImageUploaderProps } from "./imageUploader.interfaces";
import { ChangeEvent } from "react";

const ImageUploader = ({ file, setFile }: ImageUploaderProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  return (
    <>
      {!file ? (
        <Box sx={{ margin: "0 auto", maxWidth: "500px" }}>
          <input
            id="input"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <label htmlFor="input">
            <Paper
              sx={{
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                py: "2rem",
                border: "1px dashed black",
                width: "100%",
              }}
            >
              <Typography>Sube una imagen</Typography>
              <CloudUploadIcon fontSize="large" color="primary" />
            </Paper>
          </label>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ maxWidth: "200px", margin: "0 auto" }}>
          <img
            src={URL.createObjectURL(file)}
            alt="user-image"
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          />
          <Divider />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Typography
              sx={{
                maxWidth: "100%",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {file.name}
            </Typography>
            <IconButton onClick={() => setFile(null)} sx={{ padding: 0 }}>
              <DeleteIcon color="primary" sx={{ alignItems: "flex-end" }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ImageUploader;
