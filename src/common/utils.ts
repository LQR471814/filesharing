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