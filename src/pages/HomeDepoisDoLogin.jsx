import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; 
import DashboardLayout from "../components/DashboardLayout";

const HomeDepoisDoLogin = () => {
  const dynamicStyles = {
    searchBox: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f3eaf7",
      borderRadius: "8px", 
      padding: "5px 15px",
      marginBottom: "20px", 
      width: "100%", 
      maxWidth: "800px", 
      margin: "0 auto", 
    },
    searchTextField: {
      fontSize: "14px",
      width: "100%", 
    },
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Box sx={dynamicStyles.searchBox}>
          <TextField
            fullWidth
            placeholder="Buscar livros, clubes e usuários"
            variant="standard"
            InputProps={{
              disableUnderline: true, 
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#7d29d9" }} /> 
                </InputAdornment>
              ),
              sx: { padding: "8px 0" }, 
            }}
            sx={dynamicStyles.searchTextField}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default HomeDepoisDoLogin;
