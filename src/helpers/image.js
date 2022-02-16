export function prepareImages({ images, sizes, path, ext = '.png' }) {
  return images.map(icon => {
    const { label, name } = icon;
    const srcset = generateSrcset({
      sizes,
      filename: name,
      ext,
      path
    });

    return {
      label,
      name,
      src: srcset[0],
      srcset: srcset.join(', ')
    };
  });
}

export function generateSrcset({ sizes, path, filename, ext }) {
  return sizes.map(({ resolution, size }) => {
    const fullPath = `${path}${filename}${resolution}${ext}`
    return size ? `${fullPath} ${size}` : fullPath;
  });
}

export function imagesMap(images) {
  const map = {};

  images.forEach(image => {
    map[image.name] = image;
  });

  return map
}
