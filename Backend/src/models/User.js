import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          // Phone optional hai, but agar diya toh valid Indian number hona chahiye
          if (!v || v === "") return true;
          return /^[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
        },
        message: "Enter a valid 10-digit Indian mobile number",
      },
    },

    avatar: {
      type: String,
      default: "",
    },

    // Frontend "user" bhejta hai, backend "customer" use karta hai
    // Dono support karo
    role: {
      type: String,
      enum: ["customer", "user", "restaurant", "delivery", "admin"],
      default: "customer",
    },

    rewardPoints: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Forgot password ke liye
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Password hash karo save karne se pehle
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password compare karne ka method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Password reset token generate karne ka method
userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

// Virtual: "user" role ko "customer" jaisa treat karo authorization mein
userSchema.methods.hasRole = function (...roles) {
  const normalizedRole = this.role === "user" ? "customer" : this.role;
  return roles.includes(normalizedRole) || roles.includes(this.role);
};

const User = mongoose.model("User", userSchema);
export default User;
