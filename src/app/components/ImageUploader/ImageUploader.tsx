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
      <Paper
        elevation={3}
        sx={{
          py: !file ? "2rem" : 0,
          border: !file ? "1px dashed black" : "none",
        }}
      >
        {!file ? (
          <>
            <input
              id="input"
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label htmlFor="input">
              <Box
                sx={{
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography>Sube una imagen</Typography>
                <CloudUploadIcon fontSize="large" color="primary" />
              </Box>
            </label>
          </>
        ) : (
          <Paper elevation={3}>
            <img
              src={URL.createObjectURL(file)}
              alt="user-image"
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            />
            <Divider></Divider>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Typography
                sx={{
                  maxWidth: "180px",
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
      </Paper>
    </>
  );
};

export default ImageUploader;
