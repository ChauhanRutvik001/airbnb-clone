const API_BASE_URL = '/api/listings';

export async function fetchDefaultListing() {
  const response = await fetch(`${API_BASE_URL}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch listing. Status: ${response.status}`);
  }

  const body = await response.json();
  const listings = body?.data ?? [];
  // Return the first listing as the default
  return listings.length > 0 ? listings[0] : null;
}
