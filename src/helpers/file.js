export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function blobToFile({ blob, mimeType, filename }) {
  // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
  const newBlob = new Blob([blob], { type: mimeType });

  // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
  } else {
    // For other browsers: create a link pointing to the ObjectURL containing the blob.
    const objUrl = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = objUrl;
    link.download = filename;
    link.click();

    // For Firefox it is necessary to delay revoking the ObjectURL.
    setTimeout(() => window.URL.revokeObjectURL(objUrl), 250);
  }
}
