/**
 * Vendor Management Routes
 *
 * Policy-driven — every route is gated purely by permission, not role.
 * Any role (admin, crm_manager, regional_manager) that holds the relevant
 * vendors.* permission can access these endpoints.
 *
 * Route map:
 *  GET    /vendors/stats                     — aggregate KPIs
 *  GET    /vendors                           — list + filter
 *  GET    /vendors/:vendorId                 — full profile + wallet + active jobs
 *  GET    /vendors/:vendorId/performance     — performance metrics
 *  PATCH  /vendors/:vendorId/approve         — approve onboarding
 *  PATCH  /vendors/:vendorId/reject          — reject application
 *  PATCH  /vendors/:vendorId/suspend         — suspend vendor
 *  POST   /vendors/:vendorId/clarification   — request clarification
 */
import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { requirePermission } from "../../shared/middleware/permission.middleware";
import { PERMISSIONS } from "../../access";
import {
  vendorStatsController,
  listVendorsController,
  getVendorController,
  approveVendorController,
  rejectVendorController,
  suspendVendorController,
  vendorPerformanceController,
  clarificationController,
} from "../controllers/adminVendor.controller";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const r = (fn: unknown) => fn as any;

export async function vendorRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);

  // ── Stats (before :vendorId to avoid param collision) ────────────────────
  app.get(
    "/stats",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_READ)] },
    r(vendorStatsController),
  );

  // ── Vendor List ───────────────────────────────────────────────────────────
  app.get(
    "/",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_READ)] },
    r(listVendorsController),
  );

  // ── Vendor Detail & Performance ───────────────────────────────────────────
  app.get(
    "/:vendorId",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_READ)] },
    r(getVendorController),
  );
  app.get(
    "/:vendorId/performance",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_MONITOR)] },
    r(vendorPerformanceController),
  );

  // ── Onboarding Actions ────────────────────────────────────────────────────
  app.patch(
    "/:vendorId/approve",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_APPROVE)] },
    r(approveVendorController),
  );
  app.patch(
    "/:vendorId/reject",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_REJECT)] },
    r(rejectVendorController),
  );
  app.patch(
    "/:vendorId/suspend",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_SUSPEND)] },
    r(suspendVendorController),
  );
  app.post(
    "/:vendorId/clarification",
    { preHandler: [requirePermission(PERMISSIONS.VENDORS_UPDATE)] },
    r(clarificationController),
  );
}
