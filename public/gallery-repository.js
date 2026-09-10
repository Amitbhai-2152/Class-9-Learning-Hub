// Safe fallback for the optional gallery loader used by the Learning Hub.
// The gallery is not required for core lesson rendering, but the deployed
// application expects this module to exist and export getGalleryItems().
export async function getGalleryItems(){
  return [];
}

export default { getGalleryItems };
