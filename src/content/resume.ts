/**
 * The two resume documents on /resume. Both are built in the `resume`
 * repository; the page images are rendered from the PDFs with
 * `pdftoppm -png -scale-to-x 2000 -scale-to-y -1` (see its BUILD.md).
 */

export type ResumePage = { src: string; width: number; height: number };

export type ResumeDocument = {
  /** Also the URL hash that opens this tab, e.g. /resume#cv */
  id: "resume" | "cv";
  label: string;
  meta: string;
  pdf: string;
  download: string;
  downloadLabel: string;
  pages: ResumePage[];
};

const page = (src: string): ResumePage => ({ src, width: 2000, height: 2829 });

export const resumeDocuments: ResumeDocument[] = [
  {
    id: "resume",
    label: "Resume",
    meta: "1 page",
    pdf: "/resume/Himadri_Mishra_Resume.pdf",
    download: "Himadri_Mishra_Resume.pdf",
    downloadLabel: "Download resume",
    pages: [page("/resume/pages/resume-1.png")],
  },
  {
    id: "cv",
    label: "Full CV",
    meta: "2 pages",
    pdf: "/resume/Himadri_Mishra_CV.pdf",
    download: "Himadri_Mishra_CV.pdf",
    downloadLabel: "Download CV",
    pages: [page("/resume/pages/cv-1.png"), page("/resume/pages/cv-2.png")],
  },
];
