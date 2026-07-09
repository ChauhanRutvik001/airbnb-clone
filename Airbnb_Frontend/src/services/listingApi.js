const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "https://airbnb-backend-0lf4.onrender.com"
}/api/listings`;

export async function fetchDefaultListing() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch listing. Status: ${response.status}`);
  }

  const body = await response.json();
  const listings = body?.data ?? [];

  return listings.length > 0 ? listings[0] : null;
}