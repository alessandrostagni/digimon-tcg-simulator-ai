import {getSleeve} from "../../../utils/sleeves.ts";
import Card from "../../Card.tsx";
import {Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon} from "@mui/icons-material";
import styled from "@emotion/styled";
import {useGame} from "../../../hooks/useGame.ts";
import {useContextMenu} from "react-contexify";
import {useEffect, useRef, useState} from "react";
import {calculateCardOffsetX, calculateCardOffsetY, calculateCardRotation } from "../../../utils/functions.ts";

export default function PlayerHand() {
    const {show: showHandCardMenu} = useContextMenu({id: "handCardMenu", props: {index: -1}});

    const [isHandHidden, setIsHandHidden] = useState<boolean>(true);
    const myHand = useGame((state) => state.myHand);
    const mySleeve = useGame((state) => state.mySleeve);

    const containerRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(70);

    const calculateCardWidth = () => setCardWidth(containerRef.current ? containerRef.current.clientWidth / 5.5 : 70);

    useEffect(() => {
        calculateCardWidth();
        window.addEventListener('resize', calculateCardWidth);
        return () => window.removeEventListener('resize', calculateCardWidth);
    }, []);

    return (
        <>
            <EyeButtonContainer>
                <HideHandIconButton onClick={() => setIsHandHidden(!isHandHidden)} isActive={isHandHidden} title={"Hide hand"}>
                    {isHandHidden
                        ? <VisibilityOffIcon sx={{ fontSize: cardWidth / 3.5 }}/>
                        : <VisibilityIcon sx={{ fontSize: cardWidth / 3.5 }}/>}
                </HideHandIconButton>
            </EyeButtonContainer>
            {/*replace with ref dropToHand later*/}
            <Container ref={containerRef}>
                <StyledList cardCount={myHand.length}>
                    {myHand.map((card, index) =>
                        <ListItem cardCount={myHand.length} cardIndex={index} cardWidth={cardWidth} key={card.id}
                                      onContextMenu={(e) => showHandCardMenu({
                                          event: e,
                                          props: {index}
                                      })}>
                            {isHandHidden
                                ? <img alt="card" src={getSleeve(mySleeve)} style={{ width: cardWidth, borderRadius: 5 }}/>
                                : <Card card={card} location={"myHand"} width={cardWidth}/>}
                        </ListItem>)}
                </StyledList>
                {myHand.length > 5 && <StyledSpan>{myHand.length}</StyledSpan>}
            </Container>
        </>
    );
}

const Container = styled.div`
  grid-area: hand;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: translate(0px, 0px); // eye icon??
`;

const StyledList = styled.ul<{ cardCount: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  list-style-type: none;
  position: relative;
  transform: translateX(${({cardCount}) => cardCount > 23 ? "-2%" : "0"});
`;

const ListItem = styled.li<{ cardCount: number, cardIndex: number, cardWidth: number }>`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style-type: none;
  left: 4%;
  top: 0;
  transition: all 0.2s ease;
  transform: translateX(${({
                                                                                                        cardCount,
                                                                                                        cardIndex,
                                                                                                        cardWidth
                                                                                                    }) => calculateCardOffsetX(cardCount, cardIndex, cardWidth)}) translateY(${({
                                                                                                                                                                         cardCount,
                                                                                                                                                                         cardIndex
                                                                                                                                                                     }) => calculateCardOffsetY(cardCount, cardIndex)}) rotate(${({
                                                                                                                                                                                                                                      cardCount,
                                                                                                                                                                                                                                      cardIndex
                                                                                                                                                                                                                                  }) => calculateCardRotation(cardCount, cardIndex)});

  &:hover {
    z-index: 100;
  }
`;

const EyeButtonContainer = styled.div`
  grid-area: eye;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 3;
`;

const HideHandIconButton = styled.button<{ isActive: boolean}>`
  position: absolute;
  left: -5%;
  bottom: -17%;
  display: flex;
  opacity: ${({isActive}) => isActive ? 0.85 : 0.25};
  color: ${({isActive}) => isActive ? "rgba(190,39,85,1)" : "unset"};
  border-radius: 50%;
  background: none;
  border: none;
  outline: none;
  transition: all 0.15s ease;
  padding: 2px;

  &:hover {
    color: #d764c1;
    opacity: 0.5;
  }
`;

const StyledSpan = styled.span`
  font-family: Awsumsans, sans-serif;
  font-style: italic;
  font-size: 20px;
  opacity: 0.4;

  position: absolute;
  bottom: 7px;
  left: 223px;
`;
