async function waitForImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
}

export async function downloadDelegateBadgePdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  await waitForImages(element);
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");

  const captureWidth = 340;
  const aspectRatio = element.offsetHeight / element.offsetWidth;
  const captureHeight = Math.round(captureWidth * aspectRatio);

  const canvas = await html2canvas(element, {
    scale: 4,
    width: captureWidth,
    height: captureHeight,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#0D1B3E",
    logging: false,
    imageTimeout: 15000,
    onclone: (_doc, clonedNode) => {
      const cloned = clonedNode as HTMLElement;
      cloned.style.margin = "0";
      cloned.style.width = `${captureWidth}px`;
      cloned.style.maxWidth = `${captureWidth}px`;
    },
  });

  const imgData = canvas.toDataURL("image/png", 1.0);

  const cardWidthMm = 90;
  const cardHeightMm = (canvas.height / canvas.width) * cardWidthMm;
  const marginMm = 8;
  const pageWidth = cardWidthMm + marginMm * 2;
  const pageHeight = cardHeightMm + marginMm * 2;

  const pdf = new jsPDF({
    orientation: pageHeight > pageWidth ? "portrait" : "landscape",
    unit: "mm",
    format: [pageWidth, pageHeight],
  });

  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");
  pdf.addImage(imgData, "PNG", marginMm, marginMm, cardWidthMm, cardHeightMm, undefined, "FAST");

  pdf.save(filename);
}
