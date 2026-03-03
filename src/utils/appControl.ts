export const exitApp = () => {
  try {
    // Tizen
    if ((window as any).tizen?.application) {
      (window as any).tizen.application.getCurrentApplication().exit()
      return
    }

    // WebOS
    if ((window as any).webOS?.platformBack) {
      (window as any).webOS.platformBack()
      return
    }

    // Fallback (browser)
    window.close()
  } catch (e) {
    console.warn('Exit failed:', e)
  }
}

const APP_START_URL = 'file:///index.html'  // ili neki validan URL


export const restartApp = () => {
  window.location.href = APP_START_URL
}


export const hardRestartApp = () => {
  try {
    // obriši sve što čuvaš
    // localStorage.removeItem('deviceInfo')
    // localStorage.removeItem('userId')

    // ili ako želiš totalno čisto:
    localStorage.clear()
    sessionStorage.clear()

    // reload bez history
    window.location.replace(window.location.origin)
  } catch (e) {
    console.warn('Restart failed:', e)
  }
}

export const reloadApp = () => {
  window.location.reload()
}