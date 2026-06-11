// Server-side coupon validation
// Coupons are no longer stored in the frontend JS bundle.
// The client posts { code, subtotal } and gets back the discount amount.

const COUPONS = [
  { code: "WELCOME50",  type: "flat",    value: 50,  minOrder: 299 },
  { code: "SAVE20",     type: "percent", value: 20,  minOrder: 499, maxDiscount: 200 },
  { code: "FOODIE30",   type: "percent", value: 30,  minOrder: 699, maxDiscount: 300 },
  { code: "FUSION100",  type: "flat",    value: 100, minOrder: 799 },
];

// POST /api/coupons/validate
// Body: { code: string, subtotal: number }
// Protected — only logged-in customers can apply coupons
export const validateCoupon = (req, res) => {
  const { code, subtotal } = req.body;

  if (!code || subtotal === undefined) {
    return res.status(400).json({
      success: false,
      message: "Coupon code and subtotal are required.",
    });
  }

  const coupon = COUPONS.find(
    (c) => c.code === String(code).toUpperCase().trim()
  );

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: "Invalid coupon code.",
    });
  }

  if (subtotal < coupon.minOrder) {
    return res.status(400).json({
      success: false,
      message: `Minimum order amount for this coupon is ₹${coupon.minOrder}.`,
    });
  }

  let discountAmount = 0;

  if (coupon.type === "flat") {
    discountAmount = coupon.value;
  } else if (coupon.type === "percent") {
    discountAmount = Math.round((subtotal * coupon.value) / 100);
    if (coupon.maxDiscount) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }
  }

  return res.status(200).json({
    success: true,
    message: `Coupon applied! You saved ₹${discountAmount}.`,
    discount: discountAmount,
    coupon: {
      code: coupon.code,
      type: coupon.type,
    },
  });
};
