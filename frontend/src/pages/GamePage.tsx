import GameBackground from "../components/game/GameBackground.tsx";
import styled from "@emotion/styled";
import {Stack, useMediaQuery} from "@mui/material";
import carbackSrc from "../assets/cardBack.jpg";
import {useEffect, useRef} from "react";

const mediaQueries = [
    '(orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) and (pointer: coarse)',
    '(orientation: landscape) and (min-resolution: 192dpi) and (pointer: coarse)',
    '(orientation: landscape) and (min-resolution: 2dppx) and (pointer: coarse)',
    '(max-height: 700px)',
    '(orientation: portrait) and (max-width: 1300px)'
].join(',');

export default function GamePage() {

    const isMobile = useMediaQuery(mediaQueries);
    const isPortrait = useMediaQuery('(orientation: portrait)');
    const boardContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => boardContainerRef.current?.scrollTo(boardContainerRef.current?.scrollWidth / 3, 0), [isMobile]);
    useEffect(() => window.scrollTo(0, 0), [isPortrait]);

    return (
        <>
            <GameBackground/>

            <>
            {/* Komponente: auslagern von Context Menus und co. */}
            </>
            <Stack width={"100vw"} maxHeight={isMobile ? "unset" : "100%"} sx={{ containerType: "inline-size" }}>
                <TopStack isMobile={isMobile}>
                    {isMobile && <div style={{background: "darkolivegreen", width: 500, height: 80, maxWidth: "100vw" }}>Settings</div>}
                    <div style={{ background: "darkolivegreen", width: 500, justifySelf: "flex-start", alignSelf: "flex-start", maxWidth: "100vw", height: 80 }}>Nameplate ME</div>
                    <div style={{background: "darkolivegreen", width: 500, height: 80, maxWidth: "100vw" }}>Nameplate Opponent</div>
                </TopStack>

                <MainStack isMobile={isMobile}>
                    <DetailsContainer isMobile={isMobile}>
                        <StyledCardImg src={carbackSrc} alt={"cardImg"} isMobile={isMobile}/>
                        <div style={{background: "aquamarine", aspectRatio: "1 / 1", width: 400, height: 500 }}>Details</div>
                    </DetailsContainer>
                    <BoardContainer ref={boardContainerRef} isMobile={isMobile}>
                        <ExampleBoard isMobile={isMobile}>
                            <span style={{fontSize: 40}}>COARD CONTENT DIGIMON CARDS</span>
                            </ExampleBoard>
                    </BoardContainer>
                </MainStack>

                <BottomStack isMobile={isMobile}>
                    {!isMobile && <div style={{
                        background: "darkolivegreen",
                        height: "fit-content",
                        maxHeight: "100%",
                        width: 340,
                    }}>Settings</div>}
                    <LogContainer isMobile={isMobile}>Log</LogContainer>
                    <ChatContainer isMobile={isMobile}>Chat</ChatContainer>
                </BottomStack>
            </Stack>


        </>
    );
}

const TopStack = styled.div<{ isMobile: boolean }>`
  order: ${({isMobile}) => isMobile ? 3 : 1};
  display: flex;
  width: 100vw;
  justify-content: ${({isMobile}) => isMobile ? "center" : "space-between"};
  flex-wrap: ${({isMobile}) => isMobile ? "wrap-reverse" : "wrap"};
`;

const MainStack = styled.div<{ isMobile: boolean }>`
  order: ${({isMobile}) => isMobile ? 1 : 2};
  display: flex;
  width: 100vw;
  max-height: ${({isMobile}) => isMobile ? "unset" : "calc(100vh - 230px)"};
  justify-content: space-evenly;
  flex-direction: ${({isMobile}) => isMobile ? "column" : "row"};
`;

const BottomStack = styled.div<{ isMobile: boolean }>`
  order: ${({isMobile}) => isMobile ? 2 : 3};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: ${({isMobile}) => isMobile ? "100%" : "200px"};
;`

const DetailsContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({isMobile}) => isMobile ? "row" : "column"};
  background: rgba(300, 50, 50, 0.2);
  justify-content: center;
  align-items: center;
  flex-wrap: ${({isMobile}) => isMobile ? "wrap" : "unset"};
  order: ${({isMobile}) => isMobile ? 2 : "unset"};
  gap: 5px;
  padding-top: 5px;
`;

const StyledCardImg = styled.img<{ isMobile: boolean }>`
  border-radius: 3.5%;
  aspect-ratio: 5 / 7;
  height: ${({isMobile}) => isMobile ? "unset" : "100%"};
  max-height: ${({isMobile}) => isMobile ? "unset" : "500px"};
  width: ${({isMobile}) => isMobile ? "100%" : "unset"};
  max-width: ${({isMobile}) => isMobile ? "400px" : "unset"};
  @media (max-width: 500px) {
    max-width: unset;
    padding: 5px;
  }
`;

const BoardContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(47, 45, 45, 0.45);
  border-radius: 15px;
  min-height: 500px;
  width: ${({isMobile}) => isMobile ? "unset" : "calc(100vw - 400px)"}; // 400px = Details width, may change
  height: ${({isMobile}) => isMobile ? "fit-content" : "calc(100vh - 230px)"};
  
  container-type: inline-size;
  container-name: board-container;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  
  @media (max-width: 1300px) {
    display: block;
    border-radius: 0;
    scrollbar-width: thin;
  }
  @media (max-height: 499px) {
    min-height: 100vh;
    max-height: 100vh;
  }
`;

const ExampleBoard = styled.div<{ isMobile: boolean }>`
  background: linear-gradient(to right, blue, lightblue);
  aspect-ratio: 19 / 9;
  width: ${({isMobile}) => isMobile ? "unset" : "100%"};
  min-height: ${({isMobile}) => isMobile ? "500px" : "unset"};
  max-height: 100%;
  
  @container board-container (max-width: 900px) {
    width: unset;
    height: 100%;
  }
  @media (max-height: 499px) {
    min-height: 100vh;
    max-height: 100vh;
  }
`;

const ChatContainer = styled.div<{ isMobile: boolean }>`
  order: ${({isMobile}) => isMobile ? 1 : 2};
  background: darkgoldenrod;
  min-width: 400px;
  width: ${({isMobile}) => isMobile ? "100%" : "calc(100% - 900px)"}; // 900px = Log + Settings, may change
  height: ${({isMobile}) => isMobile ? "200px" : "150px"};
  contain: size;
`;

const LogContainer = styled.div<{ isMobile: boolean }>`
  order: ${({isMobile}) => isMobile ? 2 : 1};
  background: darkorchid;
  width: ${({isMobile}) => isMobile ? "100%" : "400px"};
  height: ${({isMobile}) => isMobile ? "200px" : "150px"};
`;
