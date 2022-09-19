import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Card, CardGroup } from 'react-bootstrap';
import { items } from './data/items';
import { categories } from './data/categories';
import { Item } from './types/item';
import { Category } from './types/category';
import { filterListByMonth, getCurrentMonthAndYear } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InforArea';
import MyCalendar from './components/myCalendar';
import { MainForm } from './components/MainForm';
//importar uuid
//import uuid from 'uuid';
//import Calendar from 'react-calendar';
/* <Calendar
      onChange={(date: Date) => setDate(date)}
      value={date}
      className='m-auto w-100 border-0'
/> */
//import 'react-calendar/dist/Calendar.css';

function App() {
   //App de Finanças pessoais, que permite um gereciamento mensal de despesas e receitas

   const [list, setList] = useState<Item[]>([]);
   const [filteredList, setFilteredList] = useState<Item[]>([]);
   const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonthAndYear());

   //useEffects
   useEffect(() => {
      console.log(list);
      setFilteredList(filterListByMonth(list, currentMonth));
   }, [list, currentMonth]);

   //
   //So salvando
   //puxar do localStorage o array de itens e setar no state
   useEffect(() => {
      const localList = localStorage.getItem('list');
      if (localList) {
         //transformar o string date em um Date
         const localListParsed = JSON.parse(localList);
         localListParsed.forEach((item: Item) => {
            item.date = new Date(item.date);
         });
         setList(localListParsed);
      }
   }, []);

   //salvar no localStorage o array de itens, primeiro puxar depois salvar
   useEffect(() => {
      localStorage.setItem('list', JSON.stringify(list));
   }, [list]);

   return (
      <>
         <style>{`
            .bg-fluid {
               background-color: #00008b;
               height: 150px;
            }
            .mt-negative-4 {
               margin-top: -4rem;
            }
            
         `}</style>
         {/* header */}
         <Container fluid className='bg-fluid'>
            <Row className='text-center '>
               <Col>
                  <h1 className='text-white mt-3'>Finanças Pessoais</h1>
               </Col>
            </Row>
         </Container>
         {/* body */}
         <Container>
            {/* Informações */}
            <Row className='shadow-lg bg-light mt-negative-4 rounded mb-3 p-3'>
               <InfoArea
                  filteredList={filteredList}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
               />
            </Row>

            {/* Formulario */}
            <Row className='shadow-lg bg-light rounded mb-3 p-3'>
               <MainForm list={list} setList={setList} />
            </Row>
            {/* Tabela*/}
            <Row className='shadow-lg bg-light rounded mt-3 mb-3'>
               <TableArea filteredList={filteredList} list={list} setList={setList} />
            </Row>
            {/* fazer um botao para setar a lista em filterlist para ver todos os itens */}
            <Button
               variant='primary'
               className='ms-0'
               onClick={() => {
                  setFilteredList(list);
               }}
            >
               Ver todos os itens
            </Button>
            {/* fazer um botao para voltar com a lista filtrada */}
            <Button
               variant='primary'
               className='ms-3'
               onClick={() => {
                  setFilteredList(filterListByMonth(list, currentMonth));
               }}
            >
               Voltar
            </Button>
         </Container>
      </>
   );
}

export default App;
