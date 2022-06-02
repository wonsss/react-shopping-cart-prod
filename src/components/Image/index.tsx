import PropTypes from 'prop-types';
import Styled from 'components/Image/index.style';

interface ImageProps {
  src: string;
  alt: string;
  size: string;
}

const Image = ({ src, alt, size, ...rest }: ImageProps) => {
  return <Styled.Image src={src} alt={alt} size={size} {...rest} />;
};

Image.propTypes = {
  /**
   * 이미지의 경로
   */
  src: PropTypes.string.isRequired,
  /**
   * 이미지가 없을 때 대체할 텍스트
   */
  alt: PropTypes.string.isRequired,
  /**
   * 이미지의 사이즈
   */
  size: PropTypes.string,
};

Image.defaultProps = {
  size: '180px',
};

export default Image;
