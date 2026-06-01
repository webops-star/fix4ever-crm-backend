import mongoose, { Schema } from "mongoose";

const technicianWalletSchema = new Schema(
  {
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      unique: true,
      index: true,
    },
    balance: { type: Number, default: 0, min: 0 },
    totalEarned: { type: Number, default: 0, min: 0 },
    totalWithdrawn: { type: Number, default: 0, min: 0 },
    pendingSettlement: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      branchName: String,
      upiId: String,
    },
  },
  { timestamps: true, strict: false },
);

export const TechnicianWalletModel =
  mongoose.models["TechnicianWallet"] ??
  mongoose.model("TechnicianWallet", technicianWalletSchema);
