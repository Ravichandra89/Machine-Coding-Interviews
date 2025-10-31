/**
 * Auth Middleware - JWT
 *      - Authorization: 'Bearer ${token}`
 *      - Access Token - short lived
 *      - Refresh Access Token - Long lived
 */

// Access Token - verification middleware
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // fetch token from header
  const token = req.header.authorization?.split(" ")[1];

  if (!token) {
    res.status(404).json({
      success: false,
      message: "No Token Provided",
    });
  }

  // Verify through the jwt
  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    console.error("Unable to verify token", error);
    res.status(500).json({
      success: false,
    });
  }
};

// Refresh Access Token handling
import express from "express";

const app = express();

app.post("/auth/refresh", (req: Request, res: Response) => {
  // fetch refresh token
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(404).json({
      success: false,
      message: "Refresh Token not found",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    // create a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Unable to create access token ", error);
    res.status(500).json({
      success: false,
      message: "Error creating accessToekn from RFToken",
    });
  }
});

