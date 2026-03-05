import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects

// single file upload middleware 
export const singleUpload = multer({storage}).single('image'); // 'file' is the field name in the form data

// multiple files upload middleware
export const multipleUpload = multer({storage}).array('images', 5); // 'files' is the field name, max 10 files