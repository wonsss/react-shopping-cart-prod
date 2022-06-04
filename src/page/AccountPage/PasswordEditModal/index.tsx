import ModalOverlay from 'components/@shared/Modal';
import Input from 'components/Input';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import Title from 'components/Title';
import AuthButton from 'components/AuthButton';
import { useState } from 'react';
import Container from 'components/@shared/Container';
import { validatePassword } from 'utils/validator';
import { getCookie } from 'utils/cookie';

import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import { authApiClient } from 'utils/apiClient';

const PasswordEditModal = ({ handleModal }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [renderSnackbar] = useSnackbar();

  const editPassword = async () => {
    try {
      if (!isCorrectPassword) return;

      const accessToken = getCookie('accessToken');

      await authApiClient.patch(
        '/customers',
        {
          password: currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      renderSnackbar(MESSAGE.UPDATE_PASSWORD_SUCCESS, 'SUCCESS');
      handleModal();
    } catch (error) {
      renderSnackbar(MESSAGE.UPDATE_NICKNAME_FAILURE, 'FAILED');
    }
  };

  return (
    <ModalOverlay onCloseModal={handleModal}>
      <Container width="505px" height="400px">
        <div>
          <Title mainTitle="비밀번호 변경" />
          <Input
            type="password"
            icon={<PasswordIcon />}
            label="Current Password"
            inputValue={currentPassword}
            setInputValue={setCurrentPassword}
          />
          <Input
            type="password"
            icon={<PasswordIcon />}
            label="New Password"
            inputValue={newPassword}
            setInputValue={setNewPassword}
            validator={validatePassword}
            isCorrect={isCorrectPassword}
            setIsCorrect={setIsCorrectPassword}
          />
          <AuthButton
            actionType="Change Password"
            action={editPassword}
            isDisabled={!isCorrectPassword}
          />
        </div>
      </Container>
    </ModalOverlay>
  );
};

export default PasswordEditModal;
