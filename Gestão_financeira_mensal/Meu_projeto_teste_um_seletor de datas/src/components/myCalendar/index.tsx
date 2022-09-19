/*Usar react e react-bootstrap para criar. Crie uma variaveis no react que vai armazenar a data, crie um botão que quando clicado vai abrir um modal e dentro desse modal vai ter um calendario para selecionar qualquer dia, coloque o mes atual apareçendo primeiro e a data atual com o fundo azul, utilize setas para mudar de mês e crie um seletor de ano também, quando selecionar algum ano o mês começa em janeiro. Após a pessoa selecionar algum dia retornar esse Date e armazenar na variavel inicial.*/

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SchedulerCalendar from 'scheduler-calendar';
import 'scheduler-calendar/dist/index.css';

type Props = {
   date: Date;
   setDate: (date: Date) => void;
};

const daysandTime = [
   {
      day: '2022-07-26',
      slots: [
         { from: '09:00', to: '10:30' },
         { from: '11:30', to: '19:00' },
      ],
      comment: 'Test comment',
   },
   {
      day: '2022-07-27',
      slots: [
         { from: '09:00', to: '10:30' },
         { from: '11:30', to: '19:00' },
      ],
      comment: 'Test comment',
   },
];

function DatePicker({ date, setDate }: Props) {
   const [show, setShow] = useState(true);
   //const [date, setDate] = useState(new Date());

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <Button variant='primary' onClick={handleShow}>
            Selecionar {date.toLocaleDateString()}
         </Button>

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Selecione uma data</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
               <SchedulerCalendar
                  availabilities={daysandTime}
                  availabilityType={'infinity '}
                  duration={10}
                  onIntervalChange={(date: Date) => setDate(date)}
               />
            </Modal.Body>
            <Modal.Footer>
               <Button variant='secondary' onClick={handleClose}>
                  Fechar
               </Button>
               <Button variant='primary' onClick={handleClose}>
                  Salvar
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default DatePicker;
