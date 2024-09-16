import React, { useState } from 'react';
import styled from 'styled-components';
import { ThunderboltOutlined } from '@ant-design/icons';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 1rem;
  width: 100%;
  height: 1.75rem;
  position: relative;
  background: #fff;
  overflow: hidden;
  font-size: 0.75rem;
`;

const SwitchBackground = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.active ? '50%' : '0')};
  height: 100%;
  width: 50%;
  background: #004b3d;
  border-radius: 1rem;
  transition: left 0.3s ease;
  z-index: 0;
`;

const SwitchItem = styled.div<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  height: 100%;
  border-radius: 1rem;
  transition: color 0.3s ease;
  background: transparent;
  padding: 0 0.5rem; /* Added padding to ensure consistent spacing */
  box-sizing: border-box;
  text-align: center;
  z-index: 1;

  svg {
    margin-right: 0.2rem; /* Adjusted margin for better alignment */
    color: ${(props) => (props.active ? '#fff' : '#000')};
  }
`;

interface SwitchProps {
  onToggle: (isCrypto: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ onToggle }) => {
  const [isCrypto, setIsCrypto] = useState(false);

  const handleClick = () => {
    setIsCrypto((prev) => {
      const newIsCrypto = !prev;
      onToggle(newIsCrypto);
      return newIsCrypto;
    });
  };

  return (
    <SwitchContainer onClick={handleClick}>
      <SwitchBackground active={isCrypto} />
      <SwitchItem active={!isCrypto}>Currencies</SwitchItem>
      <SwitchItem active={isCrypto}>
        <ThunderboltOutlined /> Crypto
      </SwitchItem>
    </SwitchContainer>
  );
};

export default Switch;
