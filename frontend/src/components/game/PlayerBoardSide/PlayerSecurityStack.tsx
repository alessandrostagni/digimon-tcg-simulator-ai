import {Tooltip, Zoom as MuiZoom} from "@mui/material";
import Card from "../../Card.tsx";
import {getSleeve} from "../../../utils/sleeves.ts";
import mySecurityAnimation from "../../../assets/lotties/my-security-apng.png";
import {Fragment, useState} from "react";
import styled from "@emotion/styled";
import {useGame} from "../../../hooks/useGame.ts";
import {useContextMenu} from "react-contexify";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {BootStage} from "../../../utils/types.ts";
import {useSound} from "../../../hooks/useSound.ts";
import {useDroppable} from "@dnd-kit/core";
import useResponsiveFontSize from "../../../hooks/useResponsiveFontSize.ts";
import {WSUtils} from "../../../pages/GamePage.tsx";

export default function PlayerSecurityStack({wsUtils}: { wsUtils?: WSUtils }) {
    const mySleeve = useGame((state) => state.mySleeve);
    const mySecurity = useGame((state) => state.mySecurity);
    const opponentReveal = useGame((state) => state.opponentReveal);
    const moveCard = useGame((state) => state.moveCard);
    const bootStage = useGame((state) => state.bootStage);
    const setBootStage = useGame((state) => state.setBootStage);
    const getOpponentReady = useGame((state) => state.getOpponentReady);

    const playSecurityRevealSfx = useSound((state) => state.playSecurityRevealSfx);

    const {setNodeRef} = useDroppable({id: "mySecurity", data: {accept: ["card"]}});

    function sendSecurityReveal() {
        if (opponentReveal.length) return;
        moveCard(mySecurity[0].id, "mySecurity", "myReveal");
        playSecurityRevealSfx();
        if ((bootStage === BootStage.MULLIGAN) && getOpponentReady()) setBootStage(BootStage.GAME_IN_PROGRESS);
        wsUtils?.sendMoveCard(mySecurity[0].id, "mySecurity", "myReveal");
        wsUtils?.sendSfx("playSecurityRevealSfx");
        wsUtils?.sendChatMessage(`[FIELD_UPDATE]≔【${mySecurity[0].name}】﹕Security ➟ Reveal`);
    }

    const {fontContainerRef, fontSize} = useResponsiveFontSize(2, 55);

    const [isOpen, setIsOpen] = useState(false);

    const {show: showSecurityStackMenu} = useContextMenu({id: "securityStackMenu"});

    return (
        <Container ref={fontContainerRef}>
            <InnerContainer ref={setNodeRef}>
                <Tooltip TransitionComponent={MuiZoom} sx={{width: "100%"}}
                         open={mySecurity.length === 0 ? false : isOpen}
                         onClose={() => setIsOpen(false)}
                         onOpen={() => setIsOpen(!!mySecurity.length)}
                         arrow placement={"top"}
                         componentsProps={getTooltipStyles(mySecurity.length)}
                         title={
                             <div style={{position: "relative", display: "flex", flexWrap: "wrap", gap: "5px"}}>
                                 {mySecurity.map((card, index) =>
                                     <Fragment key={card.id + "_fragment"}>
                                         {index === 0 &&
                                             <ArrowDropUpIcon key={card.id + "_arrow"} sx={{
                                                 position: "absolute",
                                                 zIndex: 5,
                                                 fontSize: 35,
                                                 color: "#3787ff",
                                                 left: 9,
                                                 top: -21,
                                                 filter: "dropShadow(0 0 2px black)"
                                             }}/>
                                         }
                                         {card.inSecurityFaceUp
                                             ? <Card key={card.id} card={card}
                                                     location={"mySecurityTooltip"}/>
                                             : <FaceDownCard key={card.id} alt="card"
                                                             src={getSleeve(mySleeve)}/>
                                         }
                                     </Fragment>
                                 )}
                             </div>}>
                    <SecuritySpan onContextMenu={(e) => showSecurityStackMenu({event: e})}
                                   id={"mySecurity"}
                                   style={{fontSize}}
                                   onClick={() => sendSecurityReveal?.()}
                    >
                        {mySecurity.length}
                    </SecuritySpan>
                </Tooltip>
                <SecurityAnimationImg alt={"mySS"} src={mySecurityAnimation}/>
            </InnerContainer>
        </Container>
    );
}

const Container = styled.div`
  grid-area: SS;
  height: 100%;
  width: 100%;
  z-index: 10;
  transform: translateY(-10%);
`;

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SecuritySpan = styled.span`
  z-index: 5;
  font-family: Awsumsans, sans-serif;
  font-style: normal;
  font-size: 2em;
  text-shadow: #111921 1px 1px 1px;
  user-select: none;
  cursor: pointer;
  color: #5ba2cb;
  transition: all 0.15s ease;

  &:hover {
    filter: drop-shadow(0 0 5px #1b82e8) saturate(1.5);
    scale: 1.1;
    color: #f9f9f9;
  }
  @media (max-height: 500px) {
    font-size: 1.5em;
  }
`;

const SecurityAnimationImg = styled.img`
  width: 200%;
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%);
`;

export const FaceDownCard = styled.img`
  width: 69.5px;
  max-width: 50px;
  max-height: 70px;
  border-radius: 2px;

  @media (max-width: 767px) {
    max-height: 115px;
  }
  @media (min-width: 768px) {
    width: 95px;
  }
`;

function getTooltipStyles(stackLength: number) {
    return {
        tooltip: {
            style: {
                backgroundColor: "#0c0c0c",
                borderRadius: 6,
                boxShadow: "inset 0 0 0 2px #2e74f6",
                filter: "drop-shadow(1px 2px 3px black)",
                padding: 10,
                minWidth: 280,
                maxWidth: `${stackLength <= 10 ? stackLength * 55 + 30 : 580}px`,
            },
        },
        arrow: {
            style: {color: "#2e74f6"},

        },
    };
}
