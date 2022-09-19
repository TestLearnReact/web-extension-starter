import React from "react";
import * as S from "./styles";

export const Sidebar: React.FC<{}> = () => {
  return (
    <S.Container>
      <S.Content className="content">
        <br />
        <br />
        <br />
        <div className="crx-root"> Sidebar !!!</div>
        <br />
        <div> content script: sidebar.ts </div>
        <br />
      </S.Content>
    </S.Container>
  );
};
