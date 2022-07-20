import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { getAllPhotos, uploadPhoto } from './services/photos';
import { Photo } from './services/photos';

function App() {
   //Vamos criar uma Galeria de imagens com React-Bootstrap e Firebase Storage armazenar as imagens, vai ter um input para selecionar a imagem e um botão para enviar a imagem para o Firebase Storage e um botão para excluir a imagem. Vamos mostrar as imagens na tela com React-Bootstrap.
   //meus types

   //meus states
   const [photos, setPhotos] = useState<Photo[]>([]);
   //const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [upLoAding, setUpLoAding] = useState(false);

   //meus effects
   useEffect(() => {
      const getPhotos = async () => {
         setIsLoading(true);
         const photos = await getAllPhotos();
         setPhotos(photos);
         setIsLoading(false);
      };
      getPhotos();
   }, []);

   //Minhas funções
   async function enviarImagem(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      if (file && file.size > 0) {
         setUpLoAding(true);
         const result = await uploadPhoto(file);
         setUpLoAding(false);
         if (result instanceof Error) {
            alert(result.message);
         } else {
            setPhotos([...photos, result]);
         }
      }
   }

   //HTML
   return (
      <>
         <Container
            fluid
            style={{ backgroundColor: '#27282f', height: '100vh' }}
            className='text-whie'
         >
            <Container>
               {/* HEADER */}
               <Row>
                  <Col xs={12} className='text-center text-white mt-3'>
                     <h1>Galeria de fotos</h1>
                  </Col>
               </Row>
               {/* AREA DE UPLOAD */}
               <Row>
                  <Col>
                     <Form onSubmit={enviarImagem}>
                        <Form.Group controlId='formBasicFile'>
                           <Form.Control type='file' name='file' accept='image/*' />
                           <Button
                              variant='primary'
                              type='submit'
                              disabled={isLoading || upLoAding}
                           >
                              {upLoAding ? 'Carregando...' : 'Enviar'}
                           </Button>
                        </Form.Group>
                     </Form>
                  </Col>
               </Row>
               {/* AREA DE IMAGENS */}

               {isLoading && (
                  <Row>
                     <Col xs={12} className='text-center text-white'>
                        <h1>Carregando...</h1>
                        <div
                           className='spinner-border'
                           style={{ width: '3rem', height: '3rem' }}
                           role='status'
                        >
                           <span className='visually-hidden'>Loading...</span>
                        </div>
                     </Col>
                  </Row>
               )}

               {!isLoading && photos.length > 0 && (
                  <Row className='mt-3'>
                     {photos.map((photo: Photo, index) => (
                        <Col key={index} xs={12} sm={6} md={4}>
                           <Card className='bg-dark text-white'>
                              <Card.Img className='p-2' variant='top' src={photo.url} />

                              <Card.Body>
                                 <Card.Text>{photo.name}</Card.Text>
                              </Card.Body>
                           </Card>
                        </Col>
                     ))}
                  </Row>
               )}

               {!isLoading && photos.length === 0 && (
                  <Row>
                     <Col xs={12} className='text-center text-white'>
                        <h1>Nenhuma foto encontrada</h1>
                        <span role='img' aria-label='emoji'>
                           🙁
                        </span>
                     </Col>
                  </Row>
               )}
            </Container>
         </Container>
      </>
   );
}

export default App;
