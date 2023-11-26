declare module 'qrcode' {
    export function toCanvas(canvas: HTMLCanvasElement | string | undefined, text: string, options?: any): Promise<void>;
    // Add other declarations if needed
  }
  