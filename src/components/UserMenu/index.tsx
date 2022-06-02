import { doInitializeCartList, doLogout } from 'actions/actionCreator';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store/store';
import { deleteCookie, getCookie } from 'utils/cookie';
import Styled from './index.style';
import useSnackbar from 'hooks/useSnackbar';

const UserMenu = ({ nickname }) => {
  const [renderSnackbar] = useSnackbar();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const logout = async () => {
    try {
      const accessToken = getCookie('accessToken');

      await axios.post(
        '/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      deleteCookie('accessToken');
      setIsOpen(false);
      store.dispatch(doLogout());
      store.dispatch(doInitializeCartList({ shoppingCart: [] }));
      renderSnackbar('로그아웃이 완료되었습니다.', 'SUCCESS');
      navigate('/');
    } catch (error) {
      renderSnackbar('로그아웃에 실패하였습니다', 'FAILED');
    }
  };

  return (
    <Styled.Container>
      <Styled.NicknameThumbnail onClick={toggleMenu}>{nickname[0]}</Styled.NicknameThumbnail>
      {isOpen && (
        <Styled.Menu>
          <Styled.Nickname>{nickname}님 👋</Styled.Nickname>
          <Styled.Line />
          <Styled.MenuItem
            onClick={() => {
              navigate('/account');
              setIsOpen(false);
            }}
          >
            회원수정
          </Styled.MenuItem>
          <Styled.Line />
          <Styled.MenuItem onClick={logout}>로그아웃</Styled.MenuItem>
        </Styled.Menu>
      )}
    </Styled.Container>
  );
};

export default UserMenu;
