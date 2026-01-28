export interface Media {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectMedia {
  id: string;
  type?: "image" | "video"; // Defaults to "image" if not specified
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  poster?: string; // For videos, optional poster image
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category:
    | "residential"
    | "commercial"
    | "cultural"
    | "hospitality"
    | "retail"
    | "yacht";
  location: string;
  year: number;
  status: "completed" | "in-progress" | "confidential";
  heroImage: Media;
  gallery?: ProjectMedia[];
  description?: string;
  featured: boolean;
  order: number;
}

// A single product within a collection category
export interface CollectionProduct {
  id: string;
  name: string; // e.g., "Heracles Sofa"
  collectionName: string; // e.g., "Warrior Collection"
  images: Media[];
  materials?: string;
  dimensions?: string[];
  order: number;
}

// A collection category containing multiple products
export interface Collection {
  id: string;
  title: string; // e.g., "Sofa"
  slug: string; // e.g., "sofa"
  heroImage: Media; // Main category image for listing
  products: CollectionProduct[];
  order: number;
}

export interface PressItem {
  id: string;
  publication: string;
  date: string;
  coverImage: Media;
  link: string;
}
