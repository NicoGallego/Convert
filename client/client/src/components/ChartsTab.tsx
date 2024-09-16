import styled from 'styled-components';
import { ThunderboltOutlined } from '@ant-design/icons';

const ChartsTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1rem;

  .tabTitle {
    font-size: 1.5rem;
    font-weight: 600;
    color: #000;
  }

  .tabText {
    font-size: 1rem;
    color: #004b3d;
    width: 80%;
    text-align: center;
  }

  button {
    margin-top: 1rem;
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
    background-color: #004b3d;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .anticon {
    margin-right: 0.5rem;
  }
`;

const ChartsTab = () => {
  return (
    <ChartsTabContainer>
      <div className='tabTitle'>Track currencies</div>
      <div className='tabText'>
        Upgrade to premium to track currencies and even more
      </div>
      <button>
        <ThunderboltOutlined />
        Upgrade to premium
      </button>
    </ChartsTabContainer>
  );
};

export default ChartsTab;
