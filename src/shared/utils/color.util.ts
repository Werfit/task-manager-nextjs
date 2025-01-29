export const getContrastingTextColor = (hex: string) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the hex color to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white (#fff) for dark backgrounds, black (#000) for light backgrounds
  return luminance > 0.5 ? "#000" : "#fff";
};
