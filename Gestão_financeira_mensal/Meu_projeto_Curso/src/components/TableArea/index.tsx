import { Table, Button, Card } from 'react-bootstrap';
import { Item } from '../../types/item';
import { Category } from '../../types/category';
import { categories } from '../../data/categories';
import { formatDate } from '../../helpers/dateFilter';

type Props = {
   filteredList: Item[];
   list: Item[];
   setList: (list: Item[]) => void;
};

export function TableArea({ filteredList, list, setList }: Props) {
   //criar uma tabela mostrando os itens, primeiro a data, depois a categoria, depois o titulo, depois o valor e depois um botão para remover o item da lista de itens (remover o item da lista de itens)
   const handleRemoveItem = (item: Item) => {
      const newList = list.filter((itemList) => itemList.id !== item.id);
      setList(newList);
   };

   const mostrarSalario = () => {
      const salario = 2500;
      salario.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      console.log(salario);
   };

   return (
      <Table responsive hover className='table-light'>
         <thead>
            <tr>
               <th>Data</th>
               <th>Categoria</th>
               <th>Título</th>
               <th>Valor</th>
               <th>Ações</th>
            </tr>
         </thead>
         <tbody>
            {filteredList.map((item: Item) => (
               <tr key={item.id}>
                  <td>{formatDate(item.date) /*ou item.date.toLocaleDateString*/}</td>
                  <td>
                     <Card
                        style={{
                           backgroundColor: categories[item.category].color,
                           //minWidth: '120px',
                        }}
                        className='text-center text-white p-1 d-inline-block'
                     >
                        {categories[item.category].title}
                     </Card>
                  </td>
                  <td>{item.title}</td>
                  <td
                     className={categories[item.category].expense ? 'text-danger' : 'text-success'}
                  >
                     {categories[item.category].expense ? '- ' : ''}
                     {item.value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                     })}
                  </td>
                  <td>
                     <Button variant='danger' onClick={() => handleRemoveItem(item)}>
                        Remover
                     </Button>
                  </td>
               </tr>
            ))}
         </tbody>
      </Table>
   );
}
