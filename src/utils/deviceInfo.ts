import type { StoragePlugin } from '@lightningjs/blits/plugins/storage'

/* ---------------------------------- */
/* TYPES */
/* ---------------------------------- */

export interface DeviceInfo {
  osVersion?: string
  tvModel?: string
  udid?: string
  appVersion: string
  userId: string
}

/* ---------------------------------- */
/* UUID FALLBACK (TV SAFE) */
/* ---------------------------------- */

const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  // fallback za Tizen/WebOS stare browsere
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/* ---------------------------------- */
/* TIZEN HELPER (WEBAPIS) */
/* ---------------------------------- */

const detectTizenInfo = async (): Promise<Partial<DeviceInfo>> => {
  try {
    if (!(window as any).webapis?.productinfo) {
      return {}
    }

    const webapis = (window as any).webapis

    // OS verzija iz userAgenta
    const osMatch = navigator.userAgent.match(/tizen\s(\d+(?:\.\d+)?)/i)
    const osVersion = osMatch ? `Tizen ${osMatch[1]}` : undefined

    const tvModel =
      typeof webapis.productinfo.getRealModel === 'function'
        ? webapis.productinfo.getRealModel()
        : undefined

    const udid =
      typeof webapis.productinfo.getDuid === 'function'
        ? webapis.productinfo.getDuid()
        : undefined

    return {
      osVersion,
      tvModel,
      udid,
    }
  } catch (e) {
    console.warn('Tizen webapis error:', e)
    return {}
  }
}

/* ---------------------------------- */
/* WEBOS HELPER */
/* ---------------------------------- */

const detectWebOSInfo = (): Promise<Partial<DeviceInfo>> => {
  return new Promise((resolve) => {
    try {
      if (!(window as any).webOS?.service) {
        resolve({})
        return
      }

      ;(window as any).webOS.service.request({
        method: 'luna://com.webos.service.tv.systemproperty/getSystemInfo',
        parameters: {},
        onSuccess: (res: any) => {
          resolve({
            osVersion: res.osVersion,
            tvModel: res.modelName,
            udid: res.serialNumber,
          })
        },
        onFailure: () => resolve({}),
      })
    } catch {
      resolve({})
    }
  })
}

/* ---------------------------------- */
/* MAIN DETECTOR */
/* ---------------------------------- */

export const detectDeviceInfo = async (
  $storage?: StoragePlugin
): Promise<DeviceInfo> => {
  // persistent userId
  const existingUserId = localStorage.getItem('userId')
  const userId = existingUserId || generateUUID()
  localStorage.setItem('userId', userId)

  const info: DeviceInfo = {
    appVersion: (window as any).APP_VERSION || '1.0.0',
    userId,
  }

  /* ---------- PLATFORM DETECTION ---------- */

  if ((window as any).webapis?.productinfo) {
    // Samsung Tizen
    Object.assign(info, await detectTizenInfo())
  } else if ((window as any).webOS) {
    // LG WebOS
    Object.assign(info, await detectWebOSInfo())
  } else {
    // Browser / Sky / fallback
    info.osVersion = navigator.platform
    info.tvModel = navigator.userAgent
  }

  console.log('🔥 FINAL DEVICE INFO →', info)

  /* ---------- STORAGE ---------- */

  if ($storage) {
    $storage.set('deviceInfo', info)
  } else {
    // console.log('asdf info: ', info);
    localStorage.setItem('deviceInfo', JSON.stringify(info))
  }

  return info
}

/* ---------------------------------- */
/* GET STORED INFO */
/* ---------------------------------- */

export const getStoredDeviceInfo = (
  $storage?: StoragePlugin
): DeviceInfo | null => {
  if ($storage) {
    // console.log("asdf storage: ", $storage.get("deviceInfo"));
    return ($storage.get('deviceInfo') as DeviceInfo) || null
  }

  const stored = localStorage.getItem('deviceInfo')
  return stored ? JSON.parse(stored) : null
}