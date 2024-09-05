import CardStack from "../CardStack.tsx";
import styled from "@emotion/styled";
import {useGame} from "../../../hooks/useGame.ts";
import {CardTypeGame, SIDE} from "../../../utils/types.ts";
import {useContextMenu} from "react-contexify";
import EggIcon from '@mui/icons-material/Egg';
import {WSUtils} from "../../../pages/GamePage.tsx";
import {useDroppable} from "@dnd-kit/core";
import {ChangeHistoryTwoTone as TriangleIcon} from "@mui/icons-material";

type BattleAreaProps = {
    side: SIDE;
    wsUtils?: WSUtils;
} & (
    | { isBreeding: true; num?: never }
    | { isBreeding?: never; num: number }
    );

export default function BattleArea(props : BattleAreaProps) {
    const {num, side, isBreeding, wsUtils} = props;
    const location = isBreeding ? `${side}BreedingArea` : `${side}Digi${num}`;

    const {setNodeRef: dropToField, isOver: isOverField} = useDroppable({ id: location, data: { accept: side === SIDE.MY ? ["card", "card-stack"] : ["card"] } });
    const {setNodeRef: dropToBottom, isOver: isOverBottom, active: canDropToBottom} = useDroppable({id: location + "_bottom", data: { accept: ["card"] } });

    const locationCards = useGame((state) => state[location as keyof typeof state] as CardTypeGame[]);

    const {show: showFieldCardMenu} = useContextMenu({id: "fieldCardMenu", props: {index: -1, location: "", id: ""}});
    const {show: showOpponentCardMenu} = useContextMenu({id: "opponentCardMenu", props: {index: -1, location: "", id: ""}});

    return (
        <Container {...props} id={location} ref={dropToField} isOver={isOverField}>
            {isBreeding && <StyledEggIcon side={side} />}
            {!!locationCards.length &&
                <CardStack cards={locationCards}
                           location={location}
                           opponentSide={side === SIDE.OPPONENT}
                           wsUtils={wsUtils}
                           showFieldCardMenu={showFieldCardMenu}
                           showOpponentCardMenu={showOpponentCardMenu}
                />
            }
            {side === SIDE.MY && (isBreeding || num <= 10) && canDropToBottom && locationCards.length !== 0 &&
                <BottomDropZone isOver={isOverBottom} ref={dropToBottom}>
                    {canDropToBottom &&
                        <>
                            <TriangleIcon sx={{opacity: 0.75}}/>
                            <TriangleIcon sx={{opacity: 0.75}}/>
                            <TriangleIcon sx={{opacity: 0.75}}/>
                        </>
                    }
                </BottomDropZone>
            }
        </Container>
    );
}

const Container = styled.div<BattleAreaProps & { isOver: boolean }>`
  grid-area: ${({num}) => num ? `BA${num}` : "breeding"};
  position: relative;
  height: calc(100% - 6px);
  width: calc(100% - 6px);
  border-radius: 2px;
  display: flex;
  flex-direction: ${({isBreeding, num}) => (isBreeding || num <= 10) ? "column" : "row"};
  justify-content: center;
  align-items: center;
  cursor: ${({isOver}) => isOver ? "grabbing" : "unset"};
  background: rgba(20, 20, 20, 0.25);
  box-shadow: inset 0 0 20px rgba(${({isOver}) => isOver ? "10, 10, 10" : "113, 175, 201"}, 0.2);
  outline: ${({side, isOver}) => side === SIDE.MY ? `2px solid rgba(167, 189, 219, ${isOver ? 1 : 0.5})` : "2px solid rgba(56, 38, 38, 0.5)"};
`;

const StyledEggIcon = styled(EggIcon)<{ side: SIDE }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${({side}) => side === SIDE.MY ? "0" : "180deg"});
  opacity: 0.5;
  font-size: 4em;
  @media (max-height: 500px) {
    font-size: 1.5em;
  }
`;

const BottomDropZone = styled.div<{ isOver: boolean }>`
  position: absolute;
  bottom: -2px;
  left: 0;
  z-index: 100;
  height: 10%;
  width: 100%;
  background-color: ${({isOver}) => isOver ? "ghostwhite" : "black"};
  opacity: ${({isOver}) => isOver ? 0.75 : 0.75};
  border-radius: 3px;
  transition: all 0.15s ease-in-out;
  text-wrap: nowrap;
  text-overflow: clip;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: grabbing;
  svg {
    line-height: 1;
    font-size: 90%;
    color: ghostwhite;
    transform: ${({isOver}) => isOver ? "translateY(100%)" : "translateY(0px)"};
    transition: all 0.5s ease-in-out;
    filter: ${({isOver}) => isOver ? "drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black)" : "unset"}
  }
  @container board-layout (max-width: 1000px) {
    gap: 2px;
    svg {
      font-size: 70%;
    }
}
`;
