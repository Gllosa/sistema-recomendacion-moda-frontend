import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ bgcolor: "#004379", width: "100%", py: "2rem" }}>
      <header>
        <Typography color="white" variant="h4" component="h1" textAlign="center">
          Sistema de Recomendacion de Moda
        </Typography>
      </header>
    </Box>
  );
};

export default Header;
