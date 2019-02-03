import React from "react";
import styled, { css, keyframes } from "styled-components";

// pokeball red
const pbr = "#cc1a00";
const Container = styled.div`
  border-radius: 50%;
  border: none;
  width: 3em;
  height: 3em;
  background-color: #ffffff;
  position: relative;
`;
const Pokeball = styled.div`
  width: 4px;
  height: 4px;
  position: relative;
  top: 0;
  left: 0px;
  background-color: transparent;
  box-shadow: 12px 0, 16px 0, 20px 0, 24px 0, 28px 0, 32px 0, 8px 4px, 12px 4px,
    12px 4px #cc1a00, 16px 4px #cc1a00, 20px 4px #cc1a00, 24px 4px #cc1a00,
    28px 4px #cc1a00, 32px 4px, 36px 4px, 4px 8px, 8px 8px, 12px 8px #cc1a00,
    16px 8px #cc1a00, 20px 8px #cc1a00, 24px 8px #cc1a00, 28px 8px #cc1a00,
    32px 8px #cc1a00, 36px 8px, 40px 8px, 0 12px, 4px 12px, 8px 12px #cc1a00,
    12px 12px #cc1a00, 16px 12px #cc1a00, 20px 12px #cc1a00, 24px 12px #cc1a00,
    28px 12px #cc1a00, 32px 12px #cc1a00, 36px 12px #cc1a00, 40px 12px,
    44px 12px, 0 16px, 4px 16px #cc1a00, 8px 16px #cc1a00, 12px 16px #cc1a00,
    16px 16px #cc1a00, 20px 16px #cc1a00, 24px 16px #cc1a00, 28px 16px #cc1a00,
    32px 16px #cc1a00, 36px 16px #cc1a00, 40px 16px #cc1a00, 44px 16px, 0 20px,
    4px 20px #cc1a00, 8px 20px #cc1a00, 12px 20px #cc1a00, 16px 20px, 20px 20px,
    24px 20px, 28px 20px, 32px 20px #cc1a00, 36px 20px #cc1a00,
    40px 20px #cc1a00, 44px 20px, 0 24px, 4px 24px, 8px 24px, 12px 24px,
    16px 24px, 28px 24px, 32px 24px, 36px 24px, 40px 24px, 44px 24px, 0 28px,
    16px 28px, 20px 28px, 24px 28px, 28px 28px, 44px 28px, 0 32px, 4px 32px,
    40px 32px, 44px 32px, 4px 36px, 8px 36px, 36px 36px, 40px 36px, 8px 40px,
    12px 40px, 32px 40px, 36px 40px, 12px 44px, 16px 44px, 20px 44px, 24px 44px,
    28px 44px, 32px 44px;
`;
const Trace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: gray 0.25em solid;
`;

export default function LoadingIcon() {
  return (
    <Container>
      {/* <Trace /> */}
      <Pokeball />
    </Container>
  );
}
