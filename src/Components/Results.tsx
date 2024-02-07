import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";

const Results: React.FC = () => {
  const location = useLocation();

  const { totalCorrect, totalIncorrect } = location?.state as {
    totalCorrect: number;
    totalIncorrect: number;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "#cc",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: 2, textAlign: "center", color: "#1E88E5" }}
        >
          Quiz Results
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: "#212121" }}>
          Total Questions Served: {totalCorrect + totalIncorrect}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: "#4CAF50" }}>
          Total Correct Questions: {totalCorrect}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: "#FF5252" }}>
          Total Incorrect Questions: {totalIncorrect}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Results;
