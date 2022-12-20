import React from "react";
import { useStats } from "../hooks/stats";
import { monteCarlo } from "../monte/analysis";
import { clone, initial, Outcome, Player, State } from "../rules";
import { StrategicPlayer } from "../rules/players";
import { GameReview } from "./game-review";
import { Inputs } from "./inputs";
import { Stats } from "./stats";
import {
  attackTable as baselineAttackTable,
  defendTable as baselineDefendTable,
  gameParameters,
  GameParameters,
} from "../rules/parameters";

export interface SimulatorProps {}

export const Simulator = (props: SimulatorProps) => {
  const [results, setResults] = React.useState<Outcome[]>([]);
  const [seed, setSeed] = React.useState<number>(0);
  const [player, setPlayer] = React.useState<Player>(new StrategicPlayer());
  const [strength, setStrength] = React.useState<[number, number, number]>([
    6, 6, 5,
  ]);
  const [attackTable, setAttackTable] = React.useState(baselineAttackTable);
  const [defendTable, setDefendTable] = React.useState(baselineDefendTable);

  const stats = useStats(results);

  React.useEffect(() => {
    const init = clone(initial);
    init.zones[0].allied = strength[0];
    init.zones[1].allied = strength[1];
    init.zones[3].allied = strength[2];

    const params = {
      ...gameParameters,
      attackTable: attackTable,
      defendTable: defendTable,
    };

    setTimeout(() => {
      runSimulation(seed, player, init, params, setResults);
    }, 200);
  }, [seed, player, setResults, strength, attackTable, defendTable]);
  return (
    <div>
      <h1>Simulator</h1>
      <div style={{ display: "flex", flexDirection: "column", width: "60vw" }}>
        <Inputs
          seed={seed}
          setSeed={setSeed}
          player={player}
          setPlayer={setPlayer}
          initial={strength}
          setInitial={setStrength}
          attackTable={attackTable}
          setAttackTable={setAttackTable}
          defendTable={defendTable}
          setDefendTable={setDefendTable}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: 1, margin: 20, width: "50%" }}>
          <Stats stats={stats} />
        </div>
        <div style={{ flexGrow: 1, margin: 20, width: "50%" }}>
          <h3>Game Specific Details</h3>
          <GameReview seed={seed} results={results} />
        </div>
      </div>
    </div>
  );
};

async function runSimulation(
  seed: number,
  player: Player,
  init: State,
  params: GameParameters,
  setResults: (results: Outcome[]) => void
) {
  const n = 10000;

  const results = await monteCarlo(n, seed * n, player, init, params);
  setResults(results);
}
