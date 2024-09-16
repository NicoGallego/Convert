import styled from 'styled-components';
import { Button } from 'antd';
import ConverterBox from './ConverterBox';

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004b3d;
  height: 90vh;

  .heroContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .heroTitle {
    color: #f6efe8;
    font-family: 'abril fatface', cursive;
    font-size: 8rem;
    display: flex;
    text-align: start;
    line-height: 1.05;
    margin-left: 4rem;
  }

  .discoverButton {
    color: #004b3d;
    background-color: #f6efe8;
    font-size: 1.7rem;
    font-family: 'roboto', sans-serif;
    font-weight: 500;
    border-radius: 50px;
    padding: 2rem 1.5rem;
    margin: 3rem 4rem;
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;

    .heroTitle {
      font-size: 4rem;
      margin: 0;
      text-align: center;
    }

    .discoverButton {
      margin: 2rem 0;
      font-size: 1.5rem;
      padding: 1.5rem 1rem;
      pointer-events: auto;
    }

    .heroContent {
      align-items: center;
    }

    .converterBox {
      margin-top: 2rem;
      margin-right: 0;
    }
  }

  @media screen and (max-width: 480px) {
    .heroTitle {
      font-size: 3rem;
    }

    .discoverButton {
      font-size: 1rem;
      padding: 1rem 0.5rem;
    }

    .converterBox {
      margin: 2rem;
    }
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <div className='heroContent'>
        <span className='heroTitle'>
          Converting <br /> has never been <br /> so easy.
        </span>
        <div>
          <Button
            className='discoverButton'
            onClick={(e) => e.preventDefault()}
          >
            Discover more
          </Button>
        </div>
      </div>
      <div className='converterBox'>
        <ConverterBox />
      </div>
    </HeroContainer>
  );
};

export default HeroSection;
