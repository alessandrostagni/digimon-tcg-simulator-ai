import styled from "@emotion/styled";
import SecurityStack from "./SecurityStack.tsx";
import PlayerHand from "./PlayerHand.tsx";
import PlayerDeck from "./PlayerDeck.tsx";
import BattleArea from "./BattleArea.tsx";
import {SIDE} from "../../../utils/types.ts";
import TokenButton from "./TokenButton.tsx";
import PlayerEggDeck from "./PlayerEggDeck.tsx";
import Trash from "./Trash.tsx";
import DeckUtilButtons from "./DeckUtilButtons.tsx";
import EventUtils from "./EventUtils/EventUtils.tsx";

export default function PlayerBoardSide() {
    return (
        <LayoutContainer>
            <SecurityStack/>
            <PlayerEggDeck/>
            {Array.from({ length: 15 }).map((_, index) => (
                <BattleArea key={index} num={index + 1} side={SIDE.MY}/>
            ))}
            <BattleArea isBreeding side={SIDE.MY}/>
            <EventUtils/>
            <Trash side={SIDE.MY}/>
            <DeckUtilButtons/>
            <PlayerDeck />
            <PlayerHand />
            {/*TODO:*/}
            <TokenButton sendTokenMessage={() => {}}/>
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 9 / 15;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  grid-template-areas: 
          ". SS SS . BA1 BA1 BA2 BA2 BA3 BA3 BA4 BA4 BA5 BA5 BA6 BA6 BA7 BA7 BA8 BA8 BA9 BA9 BA10 BA10 reaction event-utils event-utils event-utils . trash trash deck-utils deck deck ."
          ". SS SS . BA1 BA1 BA2 BA2 BA3 BA3 BA4 BA4 BA5 BA5 BA6 BA6 BA7 BA7 BA8 BA8 BA9 BA9 BA10 BA10 reaction event-utils event-utils event-utils . trash trash deck-utils deck deck ."
          "egg-deck egg-deck breeding breeding BA1 BA1 BA2 BA2 BA3 BA3 BA4 BA4 BA5 BA5 BA6 BA6 BA7 BA7 BA8 BA8 BA9 BA9 BA10 BA10 . . . . . . . . deck deck eye"
          "egg-deck egg-deck breeding breeding BA1 BA1 BA2 BA2 BA3 BA3 BA4 BA4 BA5 BA5 BA6 BA6 BA7 BA7 BA8 BA8 BA9 BA9 BA10 BA10 hand hand hand hand hand hand hand hand hand hand hand"
          "tokens tokens breeding breeding BA11 BA11 BA11 BA11 BA12 BA12 BA12 BA12 BA13 BA13 BA13 BA13 BA14 BA14 BA14 BA14 BA15 BA15 BA15 BA15 hand hand hand hand hand hand hand hand hand hand hand"
          "tokens tokens breeding breeding BA11 BA11 BA11 BA11 BA12 BA12 BA12 BA12 BA13 BA13 BA13 BA13 BA14 BA14 BA14 BA14 BA15 BA15 BA15 BA15 hand hand hand hand hand hand hand hand hand hand hand";
  gap: 1px;
`;