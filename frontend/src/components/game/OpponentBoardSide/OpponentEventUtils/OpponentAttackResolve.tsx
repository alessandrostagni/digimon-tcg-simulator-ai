import styled from "@emotion/styled";
import {AttackPhase} from "../../../../utils/types.ts";
import {useGame} from "../../../../hooks/useGame.ts";
import {WSUtils} from "../../../../pages/GamePage.tsx";
import {useSound} from "../../../../hooks/useSound.ts";

/**
 * For Player {@link AttackPhase}
 */
export default function OpponentAttackResolve({ wsUtils } : { wsUtils?: WSUtils }) {
    const myAttackPhase = useGame((state) => state.myAttackPhase);
    const getMyAttackPhase = useGame((state) => state.getMyAttackPhase);
    const setMyAttackPhase = useGame((state) => state.setMyAttackPhase);

    const playNextAttackPhaseSfx = useSound((state) => state.playNextAttackPhaseSfx);

    function sendAttackPhaseUpdate(attackPhase: AttackPhase | false) {
        wsUtils?.sendMessage(`${wsUtils?.matchInfo.gameId}:/updateAttackPhase:${wsUtils?.matchInfo.opponentName}:${attackPhase}`);
    }

    function resolveMyAttack() {
        const attackPhase = getMyAttackPhase();
        if (!attackPhase) return;
        else if (attackPhase === AttackPhase.WHEN_ATTACKING) {
            setMyAttackPhase(AttackPhase.COUNTER_BLOCK);
            sendAttackPhaseUpdate(AttackPhase.COUNTER_BLOCK);
        } else if (attackPhase === AttackPhase.RESOLVE_ATTACK) {
            setMyAttackPhase(false);
            sendAttackPhaseUpdate(false);
        }
        playNextAttackPhaseSfx();
        wsUtils?.sendSfx("playNextAttackPhaseSfx");
    }

    if(!myAttackPhase) return <></>

    return (
        <StyledButton onClick={resolveMyAttack} disabled={myAttackPhase === AttackPhase.COUNTER_BLOCK}>
            {myAttackPhase}
        </StyledButton>
    );
}

const StyledButton = styled.div<{disabled: boolean}>`
  z-index: 5;
  width: 100%;

  --color: ${({disabled}) => disabled ? "#ea6c1f" : "#11eaf1"};
  font-size: 21px;
  padding: 5px;
  letter-spacing: 0.06em;
  position: relative;
  font-family: Pixel Digivolve, sans-serif;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  border: 1px solid var(--color);
  background: linear-gradient(to right, ${({disabled}) => disabled ? "rgba(166,7,90,0.1)" : "rgba(27, 125, 253, 0.1)"} 1%, transparent 40%, transparent 60%, ${({disabled}) => disabled ? "rgba(70,6,114,0.1)" : "rgba(57, 27, 253, 0.1)"} 100%);
  color: var(--color);
  box-shadow: inset 0 0 10px ${({disabled}) => (disabled) ? "rgba(234,10,124,0.4)" : "rgba(27, 140, 253, 0.4)"} , 0 0 9px 3px ${({disabled}) => disabled ? "rgba(122,11,46,0.27)" : "rgba(27, 140, 253, 0.1)"};
  cursor: ${({disabled}) => disabled ? "default" : "pointer"};
  pointer-events: ${({disabled}) => disabled ? "none" : "unset"};
  
  &:hover {
    color: #11aef1;
    box-shadow: inset 0 0 10px rgba(57, 27, 253, 0.6), 0 0 9px 3px rgba(102, 27, 253, 0.2);
  }

  &:before {
    content: "";
    position: absolute;
    left: -4em;
    width: 4em;
    height: 100%;
    top: 0;
    transition: transform .4s ease-in-out;
    background: linear-gradient(to right, transparent 1%, rgba(27, 253, 234, 0.1) 40%, rgba(27, 174, 253, 0.1) 60%, transparent 100%);
  }

  &:hover:before {
    transform: translateX(15em);
  }
`;
