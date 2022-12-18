import Prando from "prando";
import { gameParameters, initial, Outcome, simulate } from "../rules";
import { StrategicPlayer } from "../rules/players";

export async function monteCarlo(n: number) {
  const results: Outcome[] = [];
  const player = new StrategicPlayer();

  for (let i = 0; i < n; i++) {
    const chance = new Prando(1234 + i);
    const result = await simulate(initial, player, gameParameters, chance);
    results.push(result);
  }
  return results;
}
