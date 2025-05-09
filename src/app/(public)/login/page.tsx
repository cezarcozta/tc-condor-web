import { handleGoogleAuth } from "@/app/actions/handleGoogleAuth";
import { handleMagicLink } from "@/app/actions/handleMagicLinkAuth ";
import LoginLogo from "@/ui/LoginLogo";
import { AccountBox, Email, Google } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Login() {
  return (
    <Stack spacing={3}>
      <LoginLogo />
      <Box
        key="magic-link-form"
        alignSelf="center"
        component="form"
        action={handleMagicLink}
        display='flex'
        flexDirection='column'
        width='100%'
      >
        <TextField
          key="input-email"
          id="email-login"
          name="email"
          placeholder="seuemail@email.com.br"
          type="email"
          size="small"
          slotProps={{
            input:{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              )
            }
          }}
          sx={{m: '.5rem'}}
        />
        <Button
          key="magic-link-btn"
          type="submit"
          variant="outlined"
          color="primary"
          disableElevation
          size="large"
          startIcon={<AccountBox />}
          sx={{m: '.5rem'}}
        >
          Entrar com Email
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography
          variant="body2"
          component="span"
          sx={{
            color: "text.secondary",
            px: 2,
            fontSize: "0.75rem",
          }}
        >
          ou
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      <Box
        key="google-form"
        alignSelf="center"
        component="form"
        action={handleGoogleAuth}
        display='flex'
        width='100%'
      >
        <Button
          key="google-btn"
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          size="large"
          startIcon={<Google />}
        >
          Entrar com Google
        </Button>
      </Box>
    </Stack>
  );
}
