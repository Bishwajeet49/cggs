export interface Speaker {
  speaker_id: string;
  name: string;
  designation: string;
  organization: string;
  country: string;
  country_code: string;
  image_url: string;
  bio: string;
  session: string;
  day: number;
}

export interface Country {
  country_id: string;
  name: string;
  flag: string;
  code: string;
  delegation_size: number;
  ships: number;
  role: "host" | "secretariat" | "former-host" | "participant";
}

export interface NewsItem {
  news_id: string;
  title: string;
  date: string;
  category: string;
  thumbnail: string;
  summary: string;
  content: string;
  author: string;
  tags: string[];
  source_url?: string;
}

export interface GalleryImage {
  gallery_id: string;
  url: string;
  caption: string;
  album_id: string;
  credit?: string;
}

export interface GalleryAlbum {
  album_id: string;
  title: string;
  category: string;
  images: GalleryImage[];
}

export interface GalleryVideo {
  video_id: string;
  youtube_id: string;
  title: string;
  description: string;
  thumbnail: string;
  source: string;
  source_url: string;
  category: string;
  date: string;
  featured: boolean;
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface MediaPageInfo {
  intro: string;
  sources: { name: string; url: string; description: string }[];
  stats: {
    photos: number;
    videos: number;
    summits_covered: number;
    press_releases: number;
  };
}
