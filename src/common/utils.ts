import { Platform } from "../api/api_pb"

export function getPlatform(): Platform {
    //@ts-ignore
    const platformString: string = navigator.userAgentData?.platform ?? navigator.platform
    if (
        platformString.startsWith("Win") ||
        platformString.startsWith("Mac") ||
        platformString.startsWith("Linux")
    ) {
        return Platform.DESKTOP
    } else if (
        platformString.startsWith("iPhone") ||
        platformString.startsWith("iPad") ||
        platformString.startsWith("iPod") ||
        platformString.startsWith("Android")
    ) {
        return Platform.MOBILE
    }
    return Platform.OTHER

}

export function friendlyPlatformName(platform: Platform): string {
    switch (platform) {
        case Platform.DESKTOP:
            return "Desktop"
        case Platform.MOBILE:
            return "Mobile"
        case Platform.OTHER:
            return "Other"
    }
}

export function platformIcon(platform: Platform): string {
    switch (platform) {
        case Platform.DESKTOP:
            return "icons/computer-line.svg"
        case Platform.MOBILE:
            return "icons/smartphone-line.svg"
        case Platform.OTHER:
            return "icons/device-line.svg"
    }
}

export function fileIcon(mimetype: string): string {
    const category = mimetype.split("/")[0]
    if (category === "audio") {
        return "fileIcons/file-music-line.svg"
    } else if (category === "image") {
        return "fileIcons/image-line.svg"
    } else if (category === "video") {
        return "fileIcons/movie-line.svg"
    } else if (category === "text") {
        return "fileIcons/file-text-line.svg"
    } else if (category === "application") {
        switch (mimetype) {
            case "application/pdf":
                return "fileIcons/file-pdf-line.svg"
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
                return "fileIcons/file-zip-line.svg"
        }
    }
    return "fileIcons/file-line.svg"
}

const filesizeUnits: {
    exponent: number,
    label: string,
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
]

export function getFilesizeLabel(size: number) {
    for (const unit of filesizeUnits) {
        if (size >= 10**unit.exponent) {
            return (size / 10**unit.exponent).toFixed(2) + " " + unit.label
        }
    }
    return size + " B"
}

export function downloadURL(url: string, filename: string) {
    const a = document.createElement('a')

    a.href = url
    a.download = filename
    a.style.display = 'none'

    document.body.appendChild(a)

    a.click()
    a.remove()
}

export function downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob)
    downloadURL(url, filename)
    setTimeout(() => window.URL.revokeObjectURL(url), 1000)
}
