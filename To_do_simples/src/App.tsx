import React, { useEffect, useState } from 'react';
/* import styles from './App.module.css'; */
//import checkIcon from './assets/leftarrow.png';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function App() {
   //Vamos criar um To-Do List
   //meus types
   type Tarefa = {
      id: number;
      texto: string;
      concluida: boolean;
   };

   //Minhas variáveis
   const [tarefas, setTarefas] = useState<Tarefa[]>([]);
   const [exibirTarefas, setExibirTarefas] = useState<Tarefa[]>([]);
   const [theme, setTheme] = useState<boolean>(false);

   //////////////// useEffect para carregar as tarefas do localStorage
   useEffect(() => {
      const tarefas = localStorage.getItem('tarefas');
      if (tarefas) {
         setTarefas(JSON.parse(tarefas));
      }
      //verificar se tem o tema
      const theme = localStorage.getItem('theme');
      if (theme) {
         setTheme(JSON.parse(theme));
      }
   }, []);

   //useEffect para ordenar as tarefas por data regredindo
   useEffect(() => {
      const tarefasOrdenadas = tarefas.sort((a, b) => {
         return b.id - a.id;
      });
      setExibirTarefas(tarefasOrdenadas);
   }, [tarefas]);

   //useEffect para salvar as o thema no localStorage
   useEffect(() => {
      localStorage.setItem('theme', theme.toString());
   }, [theme]);
   //useEffect para salvar as tarefas no localStorage
   useEffect(() => {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      setExibirTarefas(tarefas);
   }, [tarefas]);

   ///////////////Funções

   //Função para adicionar uma tarefa
   const adicionarTarefa = (texto: string) => {
      if (texto.trim() === '') {
         alert('Digite um texto');
         return;
      }

      const novaTarefa: Tarefa = {
         id: Date.now(),
         texto,
         concluida: false,
      };
      setTarefas([...tarefas, novaTarefa]);
   };

   //Função para remover uma tarefa
   const removerTarefa = (id: number) => {
      const novasTarefas: Tarefa[] = tarefas.filter((tarefa) => tarefa.id !== id);
      setTarefas(novasTarefas);
   };

   //Função para concluir uma tarefa
   const concluirTarefa = (id: number) => {
      const novasTarefas = tarefas.map((tarefa) => {
         if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
         }
         return tarefa;
      });
      setTarefas(novasTarefas);
   };

   //Função para limpar todas as tarefas
   const limparTarefas = () => {
      setTarefas([]);
   };

   //Função para definir o dia selecionado e colocar as tarefas do dia selecionado
   const selecionarDia = (dia: string) => {
      tarefas.forEach((tarefa) => {
         const diaTarefa = new Date(tarefa.id).getDay();
         console.log(diaTarefa);

         let diaN = parseInt(dia);
         console.log(diaN);
         if (diaTarefa === diaN) {
            setExibirTarefas(tarefas.filter((tarefa) => tarefa.id !== diaN));
         } else {
            if (dia === '') {
               setExibirTarefas(tarefas);
            } else {
               setExibirTarefas([]);
               console.log('Não tem tarefas para esse dia');
            }
         }
      });
   };

   //HTML
   return (
      <>
         {
            <style type='text/css'>
               {`
            .bg-darkmode {
                  background-color: #17181F;
                  color: #fff;
            }
            .bg-lightmode {
                  background-color: #fff;
                  color: #17181F;
            }
            .bg-tarefa {
                  background-color: ${theme ? '#131313' : '#474749'};
                  color: ${theme ? '#fff' : '#ffffff'};
            }
            `}
            </style>
         }
         <Container
            fluid
            //className={theme ? ' bg-darkmode te' : 'bg-lightmode'}
            className={theme ? 'bg-dark text-light' : 'bg-light text-dark'}
            style={{
               minHeight: '100vh',
            }}
         >
            <Container>
               <Row>
                  <Col xs='12' md='2'>
                     <Form.Check
                        type='switch'
                        label='Mudar o tema'
                        checked={theme}
                        onChange={() => setTheme(!theme)}
                     />
                  </Col>
                  {/* Criar um dataPicker para selecionar o dia, atráves do metodo date */}
                  <Col xs='12' md='10'>
                     <Form.Group controlId='formGridState'>
                        <Form.Label>Selecione o dia</Form.Label>
                        <Form.Control as='select' onChange={(e) => selecionarDia(e.target.value)}>
                           <option value=''>Todos</option>
                           <option value='0'>Domingo</option>
                           <option value='1'>Segunda</option>
                           <option value='2'>Terça</option>
                           <option value='3'>Quarta</option>
                           <option value='4'>Quinta</option>
                           <option value='5'>Sexta</option>
                           <option value='6'>Sábado</option>
                        </Form.Control>
                     </Form.Group>
                  </Col>
               </Row>
            </Container>
            <Container>
               <Row>
                  <Col className='text-center mt-3'>
                     <h1>Lista de Tarefas</h1>
                     <hr />
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Form.Control
                        id='texto'
                        type='text'
                        placeholder='Adicionar uma tarefa'
                        onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                              //adicionar a tarefa com typeScript
                              adicionarTarefa((e.target as HTMLInputElement).value);
                              //limpar o input
                              (e.target as HTMLInputElement).value = '';
                           }
                        }}
                     />
                     <Button
                        className='mt-2 align-self-flex-start'
                        variant='primary'
                        onClick={() =>
                           adicionarTarefa(
                              (document.getElementById('texto') as HTMLInputElement).value,
                           )
                        }
                     >
                        Adicionar
                     </Button>
                     <Button
                        className='mt-2 ms-2 align-self-flex-start'
                        variant='danger'
                        onClick={limparTarefas}
                     >
                        Limpar
                     </Button>
                  </Col>
               </Row>
               <Row>
                  {tarefas && tarefas.length > 0 ? (
                     //fazer um checkbox para cada tarefa o checkbox estará concluido ou não, e quando clicar no checkbox, vai mudar o estado da tarefa para concluida ou não e quando estiver concluida, vai mudar fazer um risco no texto da tarefa
                     //quando for alinhar no centro fazer no row o align-items-center ou align-self-center no elemento
                     <Col xs={'12'}>
                        {exibirTarefas.map((tarefa) => (
                           <Row
                              key={tarefa.id}
                              className={`mx-auto border rounded mt-3 align-items-center ${
                                 theme ? '' : 'bg-white'
                              }`}
                           >
                              <Col xs={'auto'}>
                                 <Form.Check
                                    type='checkbox'
                                    checked={tarefa.concluida}
                                    onChange={() => concluirTarefa(tarefa.id)}
                                    //deixar maior e mudar a cor do fundo se for o tema claro
                                    className='fs-2'
                                 />
                              </Col>
                              <Col>
                                 <span
                                    className={
                                       tarefa.concluida ? 'text-decoration-line-through ' : ''
                                    }
                                 >
                                    {tarefa.texto} - {new Date(tarefa.id).toLocaleDateString()}
                                 </span>
                              </Col>
                              <Col>
                                 <Button
                                    className='my-auto'
                                    variant='danger'
                                    onClick={() => removerTarefa(tarefa.id)}
                                 >
                                    Deletar
                                 </Button>
                              </Col>
                           </Row>
                        ))}
                     </Col>
                  ) : (
                     <Col className='text-center'>
                        <h2>Nenhuma tarefa adicionada</h2>
                     </Col>
                  )}
               </Row>
            </Container>
         </Container>
      </>
   );
}

export default App;
