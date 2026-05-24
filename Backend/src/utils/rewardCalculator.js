const calculateRewardPoints = (reviewText) => {
  const words = reviewText.trim().split(/\s+/).length;

  if (words >= 50) return 50;
  if (words >= 20) return 20;
  if (words >= 10) return 10;

  return 5;
};

export default calculateRewardPoints;