import { Backdrop, CircularProgress, Box } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={true}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CircularProgress color="inherit" />
        <Box sx={{ mt: 2 }}>Загрузка...</Box>
      </Box>
    </Backdrop>
  );
};

export default Loader;
