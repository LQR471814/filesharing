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
