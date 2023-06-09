import React from "react";
import styled from "styled-components";

const TableStyled = styled.div`
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 40px;
  table {
    width: 100%;
    background-color: ${(props) => props.theme.bodyThird};
    thead {
      background-color: ${(props) => props.theme.bgInput};
      color: ${(props) => props.theme.textInput};
    }
    th {
      padding: 20px 15px;
      text-align: left;
      font-weight: 600;
    }
    td {
      padding: 15px;
    }
  }
`;

const Table = ({ children }) => {
  return <TableStyled>{children}</TableStyled>;
};

export default Table;
