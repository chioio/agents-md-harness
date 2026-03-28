import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/root";

export const router = createRouter({
  routeTree: rootRoute,
});
