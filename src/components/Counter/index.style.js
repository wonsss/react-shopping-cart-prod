import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    width: 83px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    display: grid;
    box-sizing: border-box;
    grid-template-areas:
      'count increase'
      'count decrease';
  `,

  Count: styled.div`
    grid-row: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  CountButton: styled.div`
    font-size: 9px;
    grid-column: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 1px solid ${({ theme }) => theme.colors.gray};
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,
};

export default Styled;
