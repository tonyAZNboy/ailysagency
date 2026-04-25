/**
 * Resize an image to specified dimensions using Canvas
 */
export async function resizeImage(
  imageUrl: string,
  targetWidth: number,
  targetHeight: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Calculate scaling to cover the target area (crop if needed)
      const sourceAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;
      
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = img.width;
      let sourceHeight = img.height;
      
      if (sourceAspect > targetAspect) {
        // Source is wider - crop sides
        sourceWidth = img.height * targetAspect;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        // Source is taller - crop top/bottom
        sourceHeight = img.width / targetAspect;
        sourceY = (img.height - sourceHeight) / 2;
      }
      
      // Draw the image with cropping/scaling
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, targetWidth, targetHeight
      );
      
      // Convert to base64
      const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      resolve(resizedDataUrl);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image for resizing'));
    };
    
    img.src = imageUrl;
  });
}

/**
 * Parse image size string like "1080x1080" into width and height
 */
export function parseImageSize(sizeString: string): { width: number; height: number } {
  const [width, height] = sizeString.split('x').map(Number);
  return { width, height };
}

/**
 * Resize image for multiple platforms
 */
export async function resizeImageForPlatforms(
  imageUrl: string,
  platforms: Array<{ id: string; imageSize: string }>
): Promise<Record<string, string>> {
  const resizedImages: Record<string, string> = {};
  
  for (const platform of platforms) {
    const { width, height } = parseImageSize(platform.imageSize);
    try {
      resizedImages[platform.id] = await resizeImage(imageUrl, width, height);
    } catch (error) {
      console.error(`Failed to resize image for ${platform.id}:`, error);
      // Fall back to original image
      resizedImages[platform.id] = imageUrl;
    }
  }
  
  return resizedImages;
}
