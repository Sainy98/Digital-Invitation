import { Inter, Playfair_Display, Great_Vibes, Tiro_Devanagari_Hindi, Karma, Baloo_2, Noto_Serif_Devanagari } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const playfair = Playfair_Display({
  subsets: ["latin"],
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export const hindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
});

export const karma = Karma({
  subsets: ["devanagari", "latin"],
  weight: ["400", "700"],
});         
export const baloo2 = Baloo_2({             
    subsets: ["devanagari", "latin"],
    weight: ["400", "700"],
});


export const mangala = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
});
