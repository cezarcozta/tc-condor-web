export function formatToHHmm(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}h:${minutes}min`;
}

export type headersKey = "sleepDurationInMinutes" | "timeToBed" | "wakesUp" | "tookMedication" | 'createdAt';

export function translateHeader(key: headersKey) {
  const dictonary = {
    id: 'ID',
    name: 'Nome',
    sleepDurationInMinutes: 'Duração do sono',
    timeToBed: 'Horário que deitou',
    wakesUp: 'Despertares',
    tookMedication: 'Ingeriu medicamento?',
    createdAt: 'Dia da semana'
  }
  return dictonary[key] || 'Header Inválido'
}

export function timestampToWeekDay(data: string | number | Date): string {
  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const date = new Date(data);
  return diasDaSemana[date.getDay()];
}