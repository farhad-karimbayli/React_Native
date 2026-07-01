const API_URL = "https://www.themealdb.com/api/json/v1/1";

const fetchMealDb = async (path) => {
  const url = `${API_URL}/${path}`;
  console.log("[MealDB] request", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`MealDB request failed: ${response.status}`);
    }

    const data = await response.json();
    const count = Array.isArray(data.meals)
      ? data.meals.length
      : Array.isArray(data.categories)
        ? data.categories.length
        : 0;

    console.log("[MealDB] response", path, "items:", count);

    return data;
  } catch (error) {
    console.log("[MealDB] failed", url, error?.message || error);
    throw error;
  }
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
