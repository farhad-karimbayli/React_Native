const API_URLS = [
  "https://www.themealdb.com/api/json/v1/1",
  "https://themealdb.com/api/json/v1/1",
];

const fetchMealDb = async (path) => {
  let lastError;

  for (const apiUrl of API_URLS) {
    const url = `${apiUrl}/${path}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`MealDB request failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      lastError = error;
      console.warn("MealDB request failed", url, error?.message || error);
    }
  }

  throw lastError;
};

export const mapMeal = (meal, fallback = {}) => ({
  id: meal.idMeal,
  name: meal.strMeal,
  category: meal.strCategory || fallback.category || null,
  area: meal.strArea || fallback.area || null,
  thumb: meal.strMealThumb,
  instructions: meal.strInstructions || fallback.instructions || "",
  youtube: meal.strYoutube || fallback.youtube || "",
});

export const getMealsBySearch = async (query = "") => {
  const data = await fetchMealDb(`search.php?s=${encodeURIComponent(query)}`);
  return (data.meals || []).map(mapMeal);
};

export const getMealsByFirstLetter = async (letter) => {
  const data = await fetchMealDb(`search.php?f=${encodeURIComponent(letter)}`);
  return (data.meals || []).map(mapMeal);
};

export const getMealsByArea = async (area) => {
  const data = await fetchMealDb(`filter.php?a=${encodeURIComponent(area)}`);
  return (data.meals || []).map((meal) => mapMeal(meal, { area }));
};

export const getMealsByCategory = async (category) => {
  const data = await fetchMealDb(`filter.php?c=${encodeURIComponent(category)}`);
  return (data.meals || []).map((meal) => mapMeal(meal, { category }));
};

export const getMealById = async (id) => {
  const data = await fetchMealDb(`lookup.php?i=${encodeURIComponent(id)}`);
  const meal = data.meals?.[0];

  return meal ? mapMeal(meal) : null;
};

export const getMealDetailsById = async (id) => {
  const data = await fetchMealDb(`lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals?.[0] || null;
};

export const getCategories = async () => {
  const data = await fetchMealDb("categories.php");
  return data.categories || [];
};

export const getAreas = async () => {
  const data = await fetchMealDb("list.php?a=list");
  return (data.meals || [])
    .map((meal) => meal.strArea)
    .filter(Boolean);
};
