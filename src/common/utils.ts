import { ComponentType, SvelteComponentTyped } from "svelte";
import {
  ComputerLine,
  DeviceLine,
  FileLine,
  FileMusicLine,
  FilePdfLine,
  FileTextLine,
  FileZipLine,
  ImageLine,
  MovieLine,
  SmartphoneLine,
} from "svelte-remixicon";
import { Platform } from "../api/api";

export function getPlatform(): Platform {
  const platformString: string =
    // @ts-ignore
    navigator.userAgentData?.platform ?? navigator.platform;
  if (
    platformString.startsWith("Win") ||
    platformString.startsWith("Mac") ||
    platformString.startsWith("Linux")
  ) {
    return Platform.DESKTOP;
  } else if (
    platformString.startsWith("iPhone") ||
    platformString.startsWith("iPad") ||
    platformString.startsWith("iPod") ||
    platformString.startsWith("Android")
  ) {
    return Platform.MOBILE;
  }
  return Platform.OTHER;
}

export type IconComponent = ComponentType<
  SvelteComponentTyped<{
    class?: string;
  }>
>;

export const platformMeta: {
  [key in Platform]: {
    name: string;
    icon: IconComponent;
  };
} = {
  [Platform.DESKTOP]: {
    name: "Desktop",
    icon: ComputerLine,
  },
  [Platform.MOBILE]: {
    name: "Mobile",
    icon: SmartphoneLine,
  },
  [Platform.OTHER]: {
    name: "Other",
    icon: DeviceLine,
  },
};

export function fileIcon(mimetype: string): IconComponent {
  const category = mimetype.split("/")[0];
  switch (category) {
    case "audio":
      return FileMusicLine;
    case "image":
      return ImageLine;
    case "video":
      return MovieLine;
    case "text":
      return FileTextLine;
    case "application":
      switch (mimetype) {
        case "application/pdf":
          return FilePdfLine;
        case "application/zip":
        case "application/gzip":
        case "application/x-bzip2":
        case "application/x-lzip":
        case "application/x-lzma":
        case "application/x-lzop":
        case "application/x-snappy-framed":
        case "application/x-xz":
        case "application/x-compress":
        case "application/x-zstd":
        case "application/x-7z-compressed":
        case "application/x-rar-compressed":
        case "application/x-gtar":
          return FileZipLine;
      }
  }
  return FileLine;
}

const filesizeUnits: {
  exponent: number;
  label: string;
}[] = [
  {
    exponent: 12,
    label: "TB",
  },
  {
    exponent: 9,
    label: "GB",
  },
  {
    exponent: 6,
    label: "MB",
  },
  {
    exponent: 3,
    label: "KB",
  },
  {
    exponent: 0,
    label: "B",
  },
];

export function getFilesizeLabel(size: number) {
  for (const unit of filesizeUnits) {
    if (size >= 10 ** unit.exponent) {
      return (size / 10 ** unit.exponent).toFixed(2) + " " + unit.label;
    }
  }
  return size + " B";
}

export function downloadURL(url: string, filename: string) {
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.style.display = "none";

  document.body.appendChild(a);

  a.click();
  a.remove();
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  downloadURL(url, filename);
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}
