/**
 * The resume documents. Both are built in the `resume` repository.
 *
 * The one-page resume is the public version: /resume shows it and every
 * channel links to that page. The two-page CV is the complete record, linked
 * quietly from /resume and kept at a stable URL to send when asked.
 *
 * Page images are rendered from the PDF with
 * `pdftoppm -png -scale-to-x 2000 -scale-to-y -1` (see the resume BUILD.md).
 */

export const resumeDocument = {
  label: "Resume",
  pdf: "/resume/Himadri_Mishra_Resume.pdf",
  download: "Himadri_Mishra_Resume.pdf",
  pages: [{ src: "/resume/pages/resume-1.png", width: 2000, height: 2829 }],
};

export const cvDocument = {
  label: "Full CV, two pages (PDF)",
  pdf: "/resume/Himadri_Mishra_CV.pdf",
  download: "Himadri_Mishra_CV.pdf",
};
