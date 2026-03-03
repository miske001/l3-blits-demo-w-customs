import qrcode from 'qrcode'

export interface QRCodeOptions {
  width?: number
  margin?: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  color?: {
    dark?: string
    light?: string
  }
}

const DEFAULT_OPTIONS: QRCodeOptions = {
  width: 441,
//   margin: 2,
//   errorCorrectionLevel: 'H',
  color: {
    dark: '#000000',
    light: '#FFFFFF',
  },
}

export const generateQR = async (text: string, options?: QRCodeOptions) => {
  try {
        const mergedOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
      color: {
        ...DEFAULT_OPTIONS.color,
        ...options?.color,
      },
    }
    console.log('asdf text: ', text)
    const img = await qrcode.toDataURL(text, mergedOptions);
    return img;
  } catch (e) {
    console.error('❌ QR generation failed', e);
    return '';
  }
};