import { Box, Button, Typography, Paper } from "@mui/material";

export default function NotFound() {
  return (
      <Paper
        elevation={0}
        sx={{ p: '2rem', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="h1" component="h1" gutterBottom color="primary.dark">
          404
        </Typography>
        <Typography variant="h4" gutterBottom color="primary.dark">
          Pagina Não Encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Esta pagina pode ter sido movida ou não existe.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            component='button'
            href="/"
            sx={{p:1}}
          >
            Voltar para inicio
          </Button>
        </Box>
      </Paper>
  );
}