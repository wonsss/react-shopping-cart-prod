// @ts-nocheck
import { Outlet, useLocation } from 'react-router-dom';
import Header from 'components/Header';
import { ROUTES } from 'utils/constants';
import { useSelector } from 'react-redux';
import UserMenu from 'components/UserMenu';

import { useEffect, useState } from 'react';
import Styled from './index.style';
import Logo from 'components/Logo';

const Layout = () => {
  const location = useLocation();
  const { nickname, isAuthenticated } = useSelector(state => state.authReducer);
  const [isHeaderShow, setIsHeaderShow] = useState(true);

  useEffect(() => {
    setIsHeaderShow(location.pathname !== ROUTES.LOGIN && location.pathname !== ROUTES.SIGNUP);
  }, [location]);

  return (
    <Styled.Container>
      {isHeaderShow && (
        <div>
          <Header
            left={<Logo />}
            right={
              isAuthenticated ? (
                <Styled.RightSide>
                  <Styled.CartLink to={ROUTES.CART}>장바구니</Styled.CartLink>
                  <Styled.OrderLink to={ROUTES.ORDER}>주문목록</Styled.OrderLink>
                  <UserMenu nickname={nickname} />
                </Styled.RightSide>
              ) : (
                <Styled.LoginLink to={ROUTES.LOGIN}>로그인</Styled.LoginLink>
              )
            }
          />
        </div>
      )}

      <Styled.OutletContainer>
        <Outlet />
      </Styled.OutletContainer>
    </Styled.Container>
  );
};

export default Layout;
