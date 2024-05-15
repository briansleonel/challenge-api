import { diskStorage } from 'multer';
import { extname } from 'path';

export const storageProducts = diskStorage({
  destination: './public/products',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Date.now();
    cb(null, `${name}-${randomName}${extension}`);
  },
});
