import { expect, test } from "vitest";
import { monteCarlo } from "./analysis";

test("Run Monte-Carlo analysis", async () => {
  const n = 10000;
  const results = await monteCarlo(n);
  expect(results.length).toEqual(n);
  const won = results.filter((r) => r.final.outcome === "won").length;
  const loss = results.filter((r) => r.final.outcome === "lost").length;
  const day4 = results.filter(
    (r) => r.final.outcome === "won" && r.final.day === 4
  ).length;
  const day5 = results.filter(
    (r) => r.final.outcome === "won" && r.final.day === 5
  ).length;
  const day6 = results.filter(
    (r) => r.final.outcome === "won" && r.final.day === 6
  ).length;
  console.log(`win = ${(won * 100) / n}%, loss = ${(loss * 100) / n}`);
  expect(won + loss).toEqual(n);
  expect(won).toEqual(4936);
  expect(loss).toEqual(5064);
  expect(day4).toEqual(0);
  expect(day5).toEqual(3974);
  expect(day6).toEqual(962);
  expect(results[0].final.log).toEqual([
    "Initial allied airdrop results: -1, 0, -1",
    "After initial airdrop: C:belgium W:false Z1:A:5 G:2* Z2: A:6 G:2* Z3: A:0 G:1* Z4: A:4 G:2* -> undecided",
    "Allied unit in zone 1 chooses to attack",
    "day 1, zone 1, roll: 5, Allied losses: 0, German losses: -1, Allies seize control",
    "Allied unit in zone 2 chooses to attack",
    "day 1, zone 2, roll: 4, Allied losses: -1, German losses: -1, Allies seize control",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to attack",
    "day 1, zone 4, roll: 6, Allied losses: 0, German losses: -1, Allies seize control",
    "After day 1 battles: C:belgium W:false Z1:A:5* G:1 Z2: A:5* G:1 Z3: A:0 G:1* Z4: A:4* G:1 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "30th Corp successfully advances to zone 1",
    "After day 1 advance (corp): C:zone1 W:false Z1:A:5* G:2 Z2: A:5* G:2 Z3: A:0 G:1* Z4: A:4* G:2 -> undecided",
    "Allies rolled a 1 on day 1.  Needed a 6, no airdrop.",
    "Allied unit in zone 1 chooses to defend",
    "day 2, zone 1, roll: 6, Allied losses: 0, German losses: 0, Control: allies",
    "Allied unit in zone 2 chooses to defend",
    "day 2, zone 2, roll: 5, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 2, zone 4, roll: 2, Allied losses: 0, German losses: 0, Control: allies",
    "After day 2 battles: C:zone1 W:false Z1:A:5* G:2 Z2: A:5* G:2 Z3: A:0 G:1* Z4: A:4* G:2 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "30th Corp successfully advances to zone 2",
    "After day 2 advance (corp): C:zone2 W:false Z1:A:5* G:3 Z2: A:5* G:3 Z3: A:0 G:1* Z4: A:4* G:3 -> undecided",
    "Allies rolled a 5 on day 2.  Needed a 5 so airdrop of 1st Airborne reinforcements succeeded.",
    "Allied unit in zone 1 chooses to defend",
    "day 3, zone 1, roll: 3, Allied losses: 0, German losses: 0, Control: allies",
    "Allied unit in zone 2 chooses to defend",
    "day 3, zone 2, roll: 4, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 3, no Allied units",
    "Allied unit in zone 4 chooses to defend",
    "day 3, zone 4, roll: 1, Allied losses: -1, German losses: -1, Control: allies",
    "After day 3 battles: C:zone2 W:true Z1:A:5* G:3 Z2: A:5* G:3 Z3: A:0 G:1* Z4: A:4* G:2 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "After day 3 advance (unit): C:zone2 W:true Z1:A:5* G:4 Z2: A:0* G:4 Z3: A:5 G:1* Z4: A:4* G:3 -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 4, zone 1, roll: 6, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 2, no Allied units",
    "Allied unit in zone 3 chooses to attack",
    "day 4, zone 3, roll: 3, Allied losses: -1, German losses: -1, Allies seize control",
    "Allied unit in zone 4 chooses to defend",
    "day 4, zone 4, roll: 2, Allied losses: 0, German losses: 0, Control: allies",
    "After day 4 battles: C:zone2 W:true Z1:A:5* G:4 Z2: A:0* G:4 Z3: A:4* G:1 Z4: A:4* G:3 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "30th Corp successfully advances to zone 3",
    "After day 4 advance (corp): C:zone3 W:true Z1:A:5* G:5 Z2: A:0* G:5 Z3: A:4* G:1 Z4: A:4* G:4 -> undecided",
    "Allied unit in zone 1 chooses to defend",
    "day 5, zone 1, roll: 6, Allied losses: 0, German losses: 0, Control: allies",
    "No battle in zone 2, no Allied units",
    "Allied unit in zone 3 chooses to defend",
    "day 5, zone 3, roll: 2, Allied losses: 0, German losses: 0, Control: allies",
    "Allied unit in zone 4 chooses to defend",
    "day 5, zone 4, roll: 5, Allied losses: 0, German losses: 0, Control: allies",
    "After day 5 battles: C:zone3 W:true Z1:A:5* G:5 Z2: A:0* G:5 Z3: A:4* G:1 Z4: A:4* G:4 -> undecided",
    "Germans could not reinforce in Nijmegen",
    "30th Corp successfully advances to zone 4",
    "After day 5 advance (corp): C:zone4 W:true Z1:A:5* G:6 Z2: A:0* G:6 Z3: A:4* G:1 Z4: A:4* G:5 -> won",
  ]);
});
