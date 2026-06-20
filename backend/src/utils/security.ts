import type { CorsOptions } from "cors";
import type { Request } from "express";

export const corsOptions = function (
  req: Request,
  callback: (err: Error | null, options: CorsOptions) => void,
) {
  var corsOptions;
  if (req.path.startsWith("/auth/connect/")) {
    // Access-Control-Allow-Origin: http://localhost:3000/, 
    // Access-Control-Allow-Credentials: true, 
    // Vary: Origin
    corsOptions = {
      origin: "http://localhost:3000/",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    };
  } else {
    // Access-Control-Allow-Origin: *
    corsOptions = { origin: "*" };
  }
  callback(null, corsOptions);
};
