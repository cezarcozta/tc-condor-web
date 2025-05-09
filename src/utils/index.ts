export function formatToHHmm(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}h:${minutes}min`;
}

export type headersKey = "sleepDuration" | "bedTime" | "wakeUps" | "medicationTaken" | 'createdAt';

export function translateHeader(key: headersKey) {
  const dictonary = {
    id: 'ID',
    name: 'Nome',
    sleepDuration: 'Duração do sono',
    bedTime: 'Horário que deitou',
    wakeUps: 'Despertares',
    medicationTaken: 'Ingeriu medicamento?',
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