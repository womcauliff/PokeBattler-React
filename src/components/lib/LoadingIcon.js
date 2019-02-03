import React from "react";
import styled, { css, keyframes } from "styled-components";

const spinning = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Outer = styled.div`
  border-radius: 50%;
  border: black 0.25em solid;
  width: 3em;
  height: 3em;
  position: relative;
  animation: ${spinning} 2s ease-in-out infinite;
`;
const ballHalfStyle = css`
  height: 50%;
  width: 100%;
  border-radius: 0;
`;
const Upper = styled.div`
  ${ballHalfStyle}
  background: #cc1a00;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
`;
const Lower = styled.div`
  ${ballHalfStyle}
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
`;
const Stripe = styled.div`
  height: 0.25em;
  background-color: black;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Center = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: black 0.2em solid;
  width: 1em;
  height: 1em;
  margin: 0 auto;
  background-color: white;
`;

export default function LoadingIcon() {
  return (
    <Outer>
      <Upper />
      <Stripe />
      <Center />
      <Lower />
    </Outer>
  );
}
