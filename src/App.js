import { useState } from "react";

const Bracket = ({ title, matchups, round, setWinners }) => {
  const handleWinnerSelect = (index, player) => {
    const newWinners = [...Array(matchups.length).fill(null)];
    newWinners[index] = player;
    setWinners((prev) => {
      const updated = [...prev];
      updated[round] = newWinners;
      return updated;
    });
  };

  return (
    <div className="p-4 m-4 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{title} - {round === 0 ? 'Round of 16' : round === 1 ? 'Quarterfinals' : round === 2 ? 'Semifinals' : 'Final'}</h2>
      <div className="grid gap-4">
        {matchups.map((match, index) => (
          <div key={index} className="bg-white p-3 rounded shadow border">
            <div className="font-medium mb-2">{match[0]} vs {match[1]}</div>
            <div className="flex gap-4">
              <button
                onClick={() => handleWinnerSelect(index, match[0])}
                className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
              >
                {match[0]}
              </button>
              <button
                onClick={() => handleWinnerSelect(index, match[1])}
                className="px-3 py-1 rounded bg-green-100 hover:bg-green-200"
              >
                {match[1]}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const generateNextRound = (winners) => {
  const nextRound = [];
  for (let i = 0; i < winners.length; i += 2) {
    if (winners[i] && winners[i + 1]) {
      nextRound.push([winners[i], winners[i + 1]]);
    }
  }
  return nextRound;
};

export default function Brackets() {
  const initialMatchupsA = [
    ["Claes PERSSON", "Mitch SPRENGELMEYER"],
    ["Augusto BALLESTER", "David WARREN"],
    ["Greg ARTZT", "Quinn CARMEAN"],
    ["Kavir KUMAR", "Rodrigo PACHECO"],
    ["Anders PERSSON", "Tim KULLICK"],
    ["Gabriel VEIGA", "Niclas NILSSON"],
    ["Caio LIMA", "Zach CARDAIS"],
    ["Fabio MEDINA", "Rob HAYWOOD"]
  ];

  const [winnersA, setWinnersA] = useState([[], [], [], []]);

  const roundsA = [
    initialMatchupsA,
    generateNextRound(winnersA[0]),
    generateNextRound(winnersA[1]),
    generateNextRound(winnersA[2])
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Flight A Bracket</h1>
      {roundsA.map((matchups, index) =>
        matchups.length > 0 ? (
          <Bracket
            key={index}
            title="Flight A"
            matchups={matchups}
            round={index}
            setWinners={setWinnersA}
          />
        ) : null
      )}
    </div>
  );
}