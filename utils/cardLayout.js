export const getRecipeColumns = (cardSize, width, height) => {
  if (cardSize === "small") {
    return width > height ? 4 : 3;
  }

  return width > height ? 3 : 2;
};
