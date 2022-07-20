import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
//importar o uuid
import { v4 as uuidv4 } from 'uuid';

export type Photo = {
   name: string;
   url: string;
};

export async function getAllPhotos() {
   let photos: Photo[] = [];
   //a pasta é images e lá dentro tem todas as fotos
   const imagesFolder = ref(storage, 'images');
   const photoList = await listAll(imagesFolder);

   for (let i in photoList.items) {
      const photo = photoList.items[i];
      const url = await getDownloadURL(photo);
      photos.push({
         name: photo.name,
         url: url,
      });
   }

   return photos;
}

export async function uploadPhoto(file: File) {
   const tipoPermitido = ['image/jpeg', 'image/png', 'image/jpg'];
   if (!tipoPermitido.includes(file.type)) {
      return new Error('Tipo de arquivo inválido');
   }
   let newFile = ref(storage, `images/${uuidv4()}`);
   let upload = await uploadBytes(newFile, file);

   return {
      name: upload.ref.name,
      url: await getDownloadURL(upload.ref),
   } as Photo;
}
