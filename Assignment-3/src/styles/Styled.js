import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  background: radial-gradient(1200px 600px at 50% -200px, ${({ theme }) => theme.accentSoft}, transparent 60%), ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  padding: 24px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// New: vertical stack with gap
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 30px;
  line-height: 1.1;
  background: linear-gradient(90deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.text});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Logo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
`;

export const Subtitle = styled.p`
  margin: 6px 0 0 0;
  color: ${({ theme }) => theme.mutedText};
  font-size: 13px;
`;

export const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-radius: 16px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 8px 36px rgba(0,0,0,0.1);
`;

export const AccentPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1000px;
  margin: 16px auto 0 auto;

  @media (min-width: 980px) {
    grid-template-columns: 380px 1fr;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s ease, transform 0.12s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const Button = styled.button`
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.buttonText};
  background-color: ${({ theme }) => theme.buttonBg};
  transition: transform 0.05s ease, filter 0.2s ease, box-shadow 0.2s ease;

  &:hover { filter: brightness(1.05); box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px ${({ theme }) => theme.accentSoft}; }

  & + & { margin-left: 10px; }

  ${({ variant, theme }) => variant === 'danger' && `
    background-color: ${theme.dangerBg};
    color: ${theme.dangerText};
  `}

  ${({ variant, theme }) => variant === 'ghost' && `
    background-color: transparent;
    color: ${theme.text};
    border: 1px solid ${theme.border};
  `}
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; box-shadow: 0 0 0 3px ${({ theme }) => theme.accentSoft}; }
`;

export const Label = styled.label`
  display: block;
  margin: 10px 0;
`;

export const Badge = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  margin-left: 8px;
  color: ${({ $completed, theme }) => ($completed ? theme.successText : theme.dangerText)};
  background: ${({ $completed, theme }) => ($completed ? theme.successBg : theme.dangerBg)};
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const grow = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.border};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.accent};
  width: ${({ $percent }) => Math.max(0, Math.min(100, $percent))}%;
  transition: width 0.4s ease;
  animation: ${grow} 0.6s ease;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ToggleLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 999px;
  transition: background-color 0.2s ease;

  &:hover { background-color: ${({ theme }) => theme.accentSoft}; }
`;

export const ToggleThumb = styled.span`
  width: 48px;
  height: 26px;
  background: ${({ theme }) => theme.border};
  border-radius: 999px;
  position: relative;
  transition: background 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $on }) => ($on ? '26px' : '3px')};
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.cardBg};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 50%;
    transition: left 0.2s ease;
  }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.2s ease;
  animation: ${fadeInUp} 0.25s ease;

  &:hover { background-color: ${({ theme }) => theme.accentSoft}; }
  &:last-child { border-bottom: 0; }
`;

export const ItemLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const Tabs = styled.div`
  display: inline-flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const Tab = styled.button`
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ $active, theme }) => ($active ? theme.accent : 'transparent')};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.text)};
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;

  &:hover { border-color: ${({ theme }) => theme.accent}; box-shadow: 0 2px 10px rgba(0,0,0,0.12); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 16px;
  width: min(420px, 92vw);
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.12s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(0,0,0,0.14); border-color: ${({ theme }) => theme.accent}; }
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.mutedText};
`;

export const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
`;
