import styled from 'styled-components';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ConverterTab from './ConverterTab';
import ChartsTab from './ChartsTab';

const ConverterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  margin-right: 4rem;
  border-radius: 16px;
  width: 30rem;
  height: 20rem;

  .tabSelector {
    padding: 1rem;
  }
  .ant-tabs-tab {
    font-size: 1rem;
    margin: 0 2.5rem !important;
    color: #004b3d;
    padding: 5px 0;
  }

  .ant-tabs-tab-btn {
    color: #004b3d !important;
  }

  .ant-tabs-ink-bar {
    background-color: #004b3d;
  }

  .ant-tabs-nav {
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
    width: 100%;
  }
`;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Converter',
    children: <ConverterTab />,
  },
  {
    key: '2',
    label: 'Charts',
    children: <ChartsTab />,
  },
];

const Converter = () => {
  return (
    <ConverterContainer>
      <div className='tabSelector'>
        <Tabs
          defaultActiveKey='1'
          items={items}
          centered
          indicator={{ size: 40 }}
        />
      </div>
    </ConverterContainer>
  );
};

export default Converter;
