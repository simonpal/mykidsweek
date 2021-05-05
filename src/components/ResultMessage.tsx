interface MessageProps {
  haveKids: boolean;
  selectedWeek: number;
}

const ResultMessage = ({ haveKids, selectedWeek }: MessageProps) => {
  let message = `Ja, du har barnen vecka ${selectedWeek}!`;
  if (!haveKids) {
    message = `Nej, du har inte barnen vecka ${selectedWeek}!`;
  }
  return <h3>{message}</h3>;
};

export default ResultMessage;
