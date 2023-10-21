import styled from "@emotion/styled";

type Props = {
    setRestartMoodle?: (restartMoodle:boolean) => void,
    handleAcceptRestart?: () => void,
    setSurrenderOpen?: (surrenderOpen:boolean) => void,
    handleSurrender?: () => void,
}

export default function SurrenderRestartWindow({setRestartMoodle, handleAcceptRestart, setSurrenderOpen, handleSurrender}:Props) {
    return (<>
            {(setRestartMoodle && handleAcceptRestart) &&
            <Container>
                <StyledSpan>Opponent requested a rematch</StyledSpan>
                <div style={{width: 390, display: "flex", justifyContent: "space-between"}}>
                    <SurrenderButton onClick={() => setRestartMoodle(false)}>DENY</SurrenderButton>
                    <AcceptButton onClick={handleAcceptRestart}>ACCEPT</AcceptButton>
                </div>
            </Container>}

            {(setSurrenderOpen && handleSurrender) &&
            <Container>
                <StyledSpan>Opponent requested a rematch</StyledSpan>
                <div style={{width: 390, display: "flex", justifyContent: "space-between"}}>
                    <SurrenderButton onClick={handleSurrender}>SURRENDER</SurrenderButton>
                    <CancelSurrenderButton onClick={() => setSurrenderOpen(false)}>CANCEL</CancelSurrenderButton>
                </div>
            </Container>}
        </>
    );
}

const Container = styled.div`
  z-index: 10000;
  position: absolute;
  width: 560px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background: #0c0c0c;
  transition: all 0.2s ease;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledSpan = styled.span`
  font-family: Pixel Digivolve, sans-serif;
  font-size: 24px;
  text-shadow: black 2px 4px 2px;
`;

const CancelSurrenderButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 0;
  background: #D9D9D9;
  font-family: Pixel Digivolve, sans-serif;
  font-size: 20px;
  color: #0c0c0c;
  box-shadow: 6px 12px 1px 0 rgb(0, 0, 0);
  transition: all 0.15s ease;

  &:hover {
    background: lightgray;
    transform: translateY(1px);
    box-shadow: 4px 8px 1px 0 rgba(0, 0, 0, 0.9);
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #f8f8f8;
    transform: translateY(2px);
    box-shadow: 2px 4px 1px 0 rgba(0, 0, 0, 0.8);
  }
`;

const SurrenderButton = styled(CancelSurrenderButton)`
  background-color: #c03427;

  &:hover {
    background: #da483b;
  }

  &:active {
    background: #e72737;
  }
`;

const AcceptButton = styled(CancelSurrenderButton)`
  background-color: #27c06e;
  &:hover {
    background: #3bdab5;
  }
  &:active {
    background: #27e747;
  }
`;
