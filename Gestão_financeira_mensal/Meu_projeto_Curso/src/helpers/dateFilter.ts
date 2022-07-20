//Date Filter Helper

import { Item } from '../types/item';

export function getCurrentMonthAndYear(): string {
   const date = new Date();
   return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

//getPreviousMonth(currentMonth)
export function getPreviousMonth(currentMonth: string): string {
   const [year, month] = currentMonth.split('-');
   const monthNumber = parseInt(month, 10);
   const previousMonth = monthNumber - 1;
   const yearNumber = parseInt(year, 10);
   if (previousMonth === 0) {
      return `${yearNumber - 1}-12`;
   }
   return `${yearNumber}-${previousMonth}`;
}
//getNextMonth(currentMonth)
export function getNextMonth(currentMonth: string): string {
   const [year, month] = currentMonth.split('-');
   const monthNumber = parseInt(month, 10);
   const nextMonth = monthNumber + 1;
   const yearNumber = parseInt(year, 10);
   if (nextMonth === 13) {
      return `${yearNumber + 1}-01`;
   }
   return `${yearNumber}-${nextMonth}`;
}

export function formatCurrentMonth(currentMonth: string): string {
   const mes = currentMonth;
   //prettier-ignore
   const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
   return `${meses[parseInt(mes) - 1]}`;
}

export function filterListByMonth(list: Item[], date: string): Item[] {
   let newList: Item[] = [];
   let [year, month] = date.split('-'); //aqui já está separado o ano e o mês
   list.forEach((item) => {
      /* const [itemYear, itemMonth] = item.date.toLocaleDateString('pt-BR').split('/');
        if (itemYear === year && itemMonth === month) {
            newList.push(item);
        } */
      if (
         item.date.getFullYear() === parseInt(year) &&
         item.date.getMonth() + 1 === parseInt(month)
      )
         newList.push(item);
   });
   return newList;
}

export function formatDate(date: Date): string {
   return date.toLocaleDateString('pt-BR');
}
