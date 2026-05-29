/**
 * Admin-facing business logic — import from here for shorter paths:
 *   import { listCoupons } from "../../../shared/services/admin";
 */
export * from "./dashboard.service";
export * from "./customerManagement.service";
export * from "./vendorManagement.service";
export * from "./serviceRequestManagement.service";
export * from "./paymentManagement.service";
export * from "./subscriptionManagement.service";
export * from "./couponManagement.service";
export * from "./notificationManagement.service";
export * from "./supportTicket.service";
export * from "./reportsAnalytics.service";
export * from "./userManagement.service";
export {
  listCaptains,
  getCaptainStats,
  getCaptainDetail,
  updateCaptainInfo,
  updateCaptainDocuments,
  approveCaptain,
  rejectCaptain,
  suspendCaptain,
  reactivateCaptain,
  getCaptainWallet,
  getCaptainTransactions,
  getCaptainWalletAnalytics,
  getCaptainLiveOrders,
  getCaptainHistory,
  listCaptainSettlements,
  approveCaptainSettlement,
  rejectCaptainSettlement,
} from "./captainManagement.service";
