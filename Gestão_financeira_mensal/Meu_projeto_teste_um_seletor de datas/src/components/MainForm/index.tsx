import { useState } from 'react';
import { categories } from '../../data/categories';
import { Item } from '../../types/item';
import { Category } from '../../types/category';
import MyCalendar from '../myCalendar';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';

type Props = {
   list: Item[];
   setList: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function MainForm({ list, setList }: Props) {
   const [title, setTitle] = useState('');
   const [value, setValue] = useState('');
   const [category, setCategory] = useState('');
   const [date, setDate] = useState(new Date());
   const [error, setError] = useState('');

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title || !value || !category) {
         setError('Preencha todos os campos');
         return;
      }
      if (parseFloat(value) <= 0) {
         setError('O valor deve ser maior que zero');
         return;
      }
      const newItem = {
         id: idAleatorio(),
         title,
         value: parseFloat(value),
         category,
         date,
      };
      setList([...list, newItem]);
      setTitle('');
      setValue('');
      setCategory('');
      setDate(new Date());
      setError('');
   };

   function idAleatorio() {
      return Number(Math.random() * 1000000 + '00');
   }

   return (
      <Col md={12}>
         <Form onSubmit={handleSubmit}>
            <Row>
               <Col md='3'>
                  <Form.Group controlId='formBasicTitle'>
                     <Form.Label>Título</Form.Label>
                     <Form.Control
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Título'
                     />
                  </Form.Group>
               </Col>

               <Col md='3'>
                  <Form.Group controlId='formBasicValue'>
                     <Form.Label>Valor</Form.Label>
                     <Form.Control
                        type='number'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder='Valor'
                     />
                  </Form.Group>
               </Col>

               <Col md='3'>
                  <Form.Group controlId='formBasicCategory'>
                     <Form.Label>Categoria</Form.Label>
                     <Form.Control
                        as='select'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                     >
                        <option value=''>Selecione uma categoria</option>
                        {Object.keys(categories).map((key) => (
                           <option key={key} value={key}>
                              {categories[key].title}
                           </option>
                        ))}
                     </Form.Control>
                  </Form.Group>
               </Col>

               <Col md='3'>
                  <Form.Group as={Row} controlId='formBasicDate'>
                     <Col sm='12'>
                        <Form.Label>Data</Form.Label>
                     </Col>
                     <Col sm='12'>
                        <MyCalendar date={date} setDate={setDate} />
                     </Col>
                  </Form.Group>
               </Col>
            </Row>
            <Button className='mt-2' variant='primary' type='submit'>
               Adicionar
            </Button>
            {error && <Alert variant='danger'>{error}</Alert>}
         </Form>
      </Col>
   );
}
