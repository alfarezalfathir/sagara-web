export interface GalleryPost {
  id: string;
  title: string;
  category: string;
  caption: string | null;
  image_url: string;
  event_date: string;
  created_at?: string;
}

export interface GalleryPostInput {
  title: string;
  category: string;
  caption: string | null;
  image_url: string;
  event_date: string;
}
