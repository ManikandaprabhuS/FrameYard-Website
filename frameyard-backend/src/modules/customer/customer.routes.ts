// customer.routes.ts

import { Router } from "express";
import { getCustomerDetails, getCustomers } from "./customer.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { authorizeAdmin } from "../../middlewares/admin.middleware";

const router = Router();

router.get("/", authenticateUser, authorizeAdmin, getCustomers);
router.get("/:id", authenticateUser,authorizeAdmin,getCustomerDetails
);

export default router;