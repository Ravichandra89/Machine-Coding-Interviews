/**
 * Authorization Middleware for RBAC
 *   - allowedUsers - String array of allowed users
 *       - ["adming", "Manager"]
 *       - ["users", "guest"]
 *
 */

export const authorize =
  (...allowerUsers) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // fetch the user role from request
      const user = req.user;

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User Role not exist",
        });
      }

      if (!allowerUsers.includes(user)) {
        res.status(400).json({
          success: false,
          message: "Forbidden — You don't have permission to access this",
        });
      }

      next();
    } catch (error) {
      console.error("Unable to Authorize", error);
      res.status(500).json({
        success: false,
        message: "Can't Authorize",
      });
    }
  };
