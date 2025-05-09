const publicRoutes = [
  { name: "login", path: "/login", authenticated: "redirect" }
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";
const REDIRECT_WHEN_AUTHENTICATED = "/";

export type PublicRoute = typeof publicRoutes[number];

export {
  publicRoutes,
  REDIRECT_WHEN_AUTHENTICATED,
  REDIRECT_WHEN_NOT_AUTHENTICATED,
};
