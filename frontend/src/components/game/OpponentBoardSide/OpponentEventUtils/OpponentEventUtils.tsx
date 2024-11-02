import styled from "@emotion/styled";
import {useGameBoardStates} from "../../../../hooks/useGameBoardStates.ts";
import {BootStage} from "../../../../utils/types.ts";
import {WSUtils} from "../../../../pages/GamePage.tsx";
import OpponentAttackResolve from "./OpponentAttackResolve.tsx";
import firstAnimation from "../../../../assets/lotties/net-ball.json";
import Lottie from "lottie-react";
import useResponsiveFontSize from "../../../../hooks/useResponsiveFontSize.ts";

export default function OpponentEventUtils({ wsUtils }: { wsUtils?: WSUtils }) {
    const [bootStage, isOpponentOnline, startingPlayer] = useGameBoardStates((state) => [
        state.bootStage, state.isOpponentOnline, state.startingPlayer]);

    const isFirst = startingPlayer === wsUtils?.matchInfo.opponentName;

    const {fontContainerRef, fontSize} = useResponsiveFontSize(7.25);

    return (
        <Container ref={fontContainerRef}>
            {bootStage === BootStage.SHOW_STARTING_PLAYER &&
                <Lottie animationData={firstAnimation} autoplay={isFirst} loop={false}
                        initialSegment={[0, 70]} style={{ transform: "scaleY(-1)"}}/>
            }
            {!isOpponentOnline && <ErrorSpan>OFFLINE</ErrorSpan>}
            <OpponentAttackResolve wsUtils={wsUtils} fontSize={fontSize}/>
        </Container>
    );
}

const Container = styled.div`
  grid-area: event-utils;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ErrorSpan = styled.span`
  font-family: Pixel Digivolve, sans-serif;
  font-size: 1.5em;
  color: #e30a4c;
`;