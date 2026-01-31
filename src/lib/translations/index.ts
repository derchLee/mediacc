/**
 * Static build-time translations.
 * Each language = independent URL. Content baked at build.
 */

import type { Locale, CommonT, ImagePageT, VideoPageT, ImageLayoutMetaT, VideoLayoutMetaT } from "./types";
import { LOCALES, getImagePath, getVideoPath } from "./types";
import { common as enCommon, imagePage as enImage, videoPage as enVideo, imageLayoutMeta as enImageMeta, videoLayoutMeta as enVideoMeta } from "./en";
import { common as jaCommon, imagePage as jaImage, videoPage as jaVideo, imageLayoutMeta as jaImageMeta, videoLayoutMeta as jaVideoMeta } from "./ja";
import { common as esCommon, imagePage as esImage, videoPage as esVideo, imageLayoutMeta as esImageMeta, videoLayoutMeta as esVideoMeta } from "./es";
import { common as ptCommon, imagePage as ptImage, videoPage as ptVideo, imageLayoutMeta as ptImageMeta, videoLayoutMeta as ptVideoMeta } from "./pt";

export type { Locale, CommonT, ImagePageT, VideoPageT, ImageLayoutMetaT, VideoLayoutMetaT, UiT } from "./types";
export { LOCALES, getImagePath, getVideoPath } from "./types";

import { ui as enUi } from "./en";
import { ui as jaUi } from "./ja";
import { ui as esUi } from "./es";
import { ui as ptUi } from "./pt";

const commonMap: Record<Locale, CommonT> = {
  en: enCommon,
  ja: jaCommon,
  es: esCommon,
  pt: ptCommon,
};

import type { UiT } from "./types";
const uiMap: Record<Locale, UiT> = {
  en: enUi,
  ja: jaUi,
  es: esUi,
  pt: ptUi,
};

const imagePageMap: Record<Locale, ImagePageT> = {
  en: enImage,
  ja: jaImage,
  es: esImage,
  pt: ptImage,
};

const videoPageMap: Record<Locale, VideoPageT> = {
  en: enVideo,
  ja: jaVideo,
  es: esVideo,
  pt: ptVideo,
};

const imageLayoutMetaMap: Record<Locale, ImageLayoutMetaT> = {
  en: enImageMeta,
  ja: jaImageMeta,
  es: esImageMeta,
  pt: ptImageMeta,
};

const videoLayoutMetaMap: Record<Locale, VideoLayoutMetaT> = {
  en: enVideoMeta,
  ja: jaVideoMeta,
  es: esVideoMeta,
  pt: ptVideoMeta,
};

export function getCommonT(locale: Locale): CommonT {
  return commonMap[locale];
}

export function getUiT(locale: Locale): UiT {
  return uiMap[locale];
}

export function getImagePageT(locale: Locale): ImagePageT {
  return imagePageMap[locale];
}

export function getVideoPageT(locale: Locale): VideoPageT {
  return videoPageMap[locale];
}

export function getImageLayoutMeta(locale: Locale): ImageLayoutMetaT {
  return imageLayoutMetaMap[locale];
}

export function getVideoLayoutMeta(locale: Locale): VideoLayoutMetaT {
  return videoLayoutMetaMap[locale];
}

/** Get locale from pathname: /ja/image -> ja, /image -> en */
export function getLocaleFromPathname(pathname: string | null): Locale {
  if (!pathname) return "en";
  if (pathname.startsWith("/ja")) return "ja";
  if (pathname.startsWith("/es")) return "es";
  if (pathname.startsWith("/pt")) return "pt";
  return "en";
}

/** Language labels for switcher */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  es: "Español",
  pt: "Português",
};
