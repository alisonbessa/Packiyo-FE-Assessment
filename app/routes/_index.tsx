import * as React from "react";
import type { MetaFunction } from "@remix-run/node";
import Typography from "@mui/material/Typography";

export const meta: MetaFunction = () => [
  { title: "Remix Starter" },
  { name: "description", content: "Welcome to remix!" },
];

export default function Index() {
  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Material UI Remix in TypeScript example
      </Typography>
    </React.Fragment>
  );
}
