import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Form, Button, Table, Card, CardGroup } from 'react-bootstrap';

function App() {
   //Vamos criar um Sistema de Finanças Pessoais, para que o usuário possa cadastrar suas despesas e receitas de cada mês.
   //meus types
   type Category =
      | 'Alimentação'
      | 'Transporte'
      | 'Salário'
      | 'Lazer'
      | 'Saúde'
      | 'Moradia'
      | 'Outros';

   type Item = {
      id: number;
      category: Category;
      title: string;
      value: number;
      tipo: 'receita' | 'despesa';
   };
   type Meses =
      | 'Janeiro'
      | 'Fevereiro'
      | 'Março'
      | 'Abril'
      | 'Maio'
      | 'Junho'
      | 'Julho'
      | 'Agosto'
      | 'Setembro'
      | 'Outubro'
      | 'Novembro'
      | 'Dezembro'
      | 'Todos';

   //111111//Minhas variáveis////////////////
   const [items, setItems] = useState<Item[]>([]);
   const [exibirItens, setExibirItens] = useState<Item[]>([]);
   const [mes, setMes] = useState<Meses>('Todos');
   const [receitaDoMes, setReceitaDoMes] = useState<number>(0);
   const [despesaDoMes, setDespesaDoMes] = useState<number>(0);
   const [balançoDoMes, setBalançoDoMes] = useState<number>(0);

   //////////////// useEffect para carregar as tarefas do localStorage
   useEffect(() => {
      selecionarMes(mes);
      calcularMes();
   }, [items]);

   useEffect(() => {
      /* const items = localStorage.getItem('items');
      if (items) {
         setItems(JSON.parse(items));
      } */
      setMes('Todos');
      selecionarMes('Todos');
   }, []);

   //////////////// useEffect para salvar as o thema no localStorage
   /* useEffect(() => {
      localStorage.setItem('items', JSON.stringify([items]));
   }, [items]); */

   //22222//Funções////////////////
   //função para adicionar novas tarefas
   function FormAddItem(e: React.FormEvent<HTMLFormElement>) {
      //use o typescript para criar
      e.preventDefault();
      const title = (e.currentTarget.title as unknown as HTMLInputElement).value;
      const valueS = e.currentTarget.value.value;
      const value = parseFloat(valueS);
      const category = e.currentTarget.category.value;
      const tipo = e.currentTarget.tipo.value;
      //o id vem de um Form.Control type='date'
      const diaSelecionado = (e.currentTarget.date as unknown as HTMLInputElement).value;
      //trasformar o diaSelecionado em um Date
      //console.log(diaSelecionado);
      const diaSelecionadoArray = diaSelecionado.split('-');
      const dia = parseInt(diaSelecionadoArray[2]);
      const mes = parseInt(diaSelecionadoArray[1]);
      const ano = parseInt(diaSelecionadoArray[0]);
      const data = new Date(ano, mes - 1, dia);
      //o mes - 1 é para que o mes comece em 0
      const id = new Date(data).getTime();

      /* const teste = new Date(diaSelecionado).getTime();
      console.log(new Date(teste).toLocaleDateString()); */

      const item: Item = {
         id,
         category,
         title,
         value,
         tipo,
      };
      setItems([...items, item]);
   }
   //função de selecionar o mês e exibir os itens do mês
   function selecionarMes(mes: Meses) {
      setMes(mes);
      if (mes === 'Todos') {
         setExibirItens(items);
         console.log(items);
      } else {
         const itensDoMes = items.filter((item) => {
            const data = new Date(item.id).getMonth();
            //prettier-ignore
            const Meses = [
               'Janeiro','Fevereiro', 'Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
            ];
            return data === Meses.indexOf(mes);
         });
         setExibirItens(itensDoMes);
         console.log(itensDoMes);
      }
   }
   //função para fazer os calculos do mês
   function calcularMes() {
      let receita = 0;
      let despesa = 0;
      exibirItens.forEach((item) => {
         if (item.tipo === 'receita') {
            receita += item.value;
         } else {
            despesa += item.value;
         }
      });
      setReceitaDoMes(receita);
      setDespesaDoMes(despesa);
      setBalançoDoMes(receita - despesa);

      /* //filtro para pegar somente as receitas
      const receitas = exibirItens.filter((item) => item.tipo === 'receita');
      //filtro para pegar somente as despesas
      const despesas = exibirItens.filter((item) => item.tipo === 'despesa');
      //somar as receitas
      const somaReceitas = receitas.reduce((acc, item) => {
         return acc + item.value;
      }, 0);
      //somar as despesas
      const somaDespesas = despesas.reduce((acc, item) => {
         return acc + item.value;
      }, 0);
      //calcular o balanço
      const balanco = somaReceitas - somaDespesas;
      //atualizar os valores
      setReceitaDoMes(somaReceitas);
      setDespesaDoMes(somaDespesas);
      setBalançoDoMes(balanco); */
      console.log(receitaDoMes, despesaDoMes, balançoDoMes);
   }
   //função para deletar uma tarefa
   function deletarItem(id: number) {
      console.log(id);
   }

   //33333//HTML////////////////
   return (
      <Container>
         <Row>
            <Col>
               <h1>Sistema de Finanças Pessoais</h1>
            </Col>
         </Row>

         <Row>
            {/* fazer um seletor do mes */}
            <Col>
               <Form.Group controlId='exampleForm.ControlSelect1'>
                  <Form.Label>Selecione o mês</Form.Label>
                  <Form.Control
                     as='select'
                     onChange={(e) => selecionarMes(e.target.value as Meses)}
                  >
                     <option value='Todos'>Todos</option>
                     <option value='Janeiro'>Janeiro</option>
                     <option value='Fevereiro'>Fevereiro</option>
                     <option value='Março'>Março</option>
                     <option value='Abril'>Abril</option>
                     <option value='Maio'>Maio</option>
                     <option value='Junho'>Junho</option>
                     <option value='Julho'>Julho</option>
                     <option value='Agosto'>Agosto</option>
                     <option value='Setembro'>Setembro</option>
                     <option value='Outubro'>Outubro</option>
                     <option value='Novembro'>Novembro</option>
                     <option value='Dezembro'>Dezembro</option>
                  </Form.Control>
               </Form.Group>
            </Col>
         </Row>

         <Row>
            <Col>
               <Form onSubmit={FormAddItem}>
                  <Row sm={'12'}>
                     <Form.Group as={Col} controlId='formBasicCategory'>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control as='select' name='category'>
                           <option value='Alimentação'>Alimentação</option>
                           <option value='Transporte'>Transporte</option>
                           <option value='Salário'>Salário</option>
                           <option value='Lazer'>Lazer</option>
                           <option value='Saúde'>Saúde</option>
                           <option value='Moradia'>Moradia</option>
                           <option value='Outros'>Outros</option>
                        </Form.Control>
                     </Form.Group>
                     <Form.Group as={Col} controlId='formBasicTitle'>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type='text' name='title' />
                     </Form.Group>
                     <Form.Group as={Col} controlId='formBasicValue'>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control type='number' name='value' />
                     </Form.Group>
                     <Form.Group as={Col} controlId='formBasicTipo'>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control as='select' name='tipo'>
                           <option value='receita'>Receita</option>
                           <option value='despesa'>Despesa</option>
                        </Form.Control>
                     </Form.Group>
                     <Form.Group as={Col} controlId='formBasicId'>
                        <Form.Label>Data</Form.Label>
                        <Form.Control type='date' name='date' />
                     </Form.Group>
                  </Row>
                  <Button variant='primary' type='submit' className='mt-2'>
                     Adicionar
                  </Button>
               </Form>
            </Col>
         </Row>
         <Row>
            <Col>
               {receitaDoMes !== 0 && (
                  //usar um card para exibir a receita
                  <Card>
                     <Card.Body>
                        <Card.Title>Receita do mês</Card.Title>
                        <Card.Text>{receitaDoMes}</Card.Text>
                     </Card.Body>
                  </Card>
               )}
            </Col>
            <Col>
               {despesaDoMes !== 0 && (
                  //usar um card para exibir a despesa

                  <Card>
                     <Card.Body>
                        <Card.Title>Despesa do mês</Card.Title>
                        <Card.Text>{despesaDoMes}</Card.Text>
                     </Card.Body>
                  </Card>
               )}
            </Col>
            <Col>
               {balançoDoMes !== 0 && (
                  //usar um card para exibir o balanço
                  <Card bg={balançoDoMes < 0 ? 'danger ' : 'success'} className='text-white'>
                     <Card.Body>
                        <Card.Title>Balanço do mês</Card.Title>
                        <Card.Text>{balançoDoMes}</Card.Text>
                     </Card.Body>
                  </Card>
               )}
            </Col>
         </Row>
         <Row className='mt-2'>
            {items.length > 0 && (
               <Col>
                  <Table bordered hover responsive size='sm' variant='dark'>
                     <thead>
                        <tr>
                           <th>Categoria</th>
                           <th>Título</th>
                           <th>Valor</th>
                           <th>Tipo</th>
                           <th>Data</th>
                           <th>Deletar Item</th>
                        </tr>
                     </thead>
                     <tbody>
                        {exibirItens.map((item, index) => (
                           <tr key={index}>
                              <td>{item.category}</td>
                              <td>{item.title}</td>
                              <td
                                 className={
                                    item.tipo === 'receita' ? 'text-success' : 'text-danger'
                                 }
                              >
                                 {item.tipo === 'receita' ? '' : '-'}
                                 {item.value.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 2,
                                 })}
                              </td>
                              <td
                                 className={
                                    item.tipo === 'receita' ? 'text-success' : 'text-danger'
                                 }
                              >
                                 {item.tipo}
                              </td>
                              <td>{new Date(item.id).toLocaleDateString()}</td>
                              <td>
                                 <Button variant='danger' onClick={() => deletarItem(item.id)}>
                                    Deletar
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </Col>
            )}
         </Row>
      </Container>
   );
}

export default App;
