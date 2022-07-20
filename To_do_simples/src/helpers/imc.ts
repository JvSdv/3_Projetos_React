export type Level = {
    title: string;
    color: string;
    icon: 'down' | 'up';
    imc: number[];
    yourImc?: number;
}

export const levels: Level[] = [
    {title: 'Magreza', color:'#96A3AB', icon: 'down', imc: [0, 18.5]},
    {title: 'Normal', color:'#0ead69', icon: 'up', imc: [18.6, 24.9]},
    {title: 'Sobrepeso', color:'#e2b039', icon: 'down', imc: [25, 30]},
    {title: 'Obsidade', color:'#c3423f', icon: 'down', imc: [30.1, 99]},
];

export function calculateImc(height:number, weight: number){
    const imc = weight / (Math.pow(height,2));

    for(let i in levels){               //para nao ficar fazendo muito codigo envia so um com os parametros recebidos
        if(imc >= levels[i].imc[0] && imc <= levels[i].imc[1]){

            let levelCopy: Level = {...levels[i]} //fazer uma copia para nao alterar o array com os dados principais
            levelCopy.yourImc = imc; //já retorno o imc junto com a categoria
            return levelCopy;
        }
    }
    return null;
}