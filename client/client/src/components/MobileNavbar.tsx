import React, { useState } from 'react';
import styled from 'styled-components';
import { Drawer, Dropdown, MenuProps, Space } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

const MobileNavbarContainer = styled.div`
  display: none;
  background-color: #004b3d;
  height: 10vh;
  padding: 1rem 2rem;
  color: #f6efe8;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-family: 'Abril Fatface', cursive;
    font-size: 2rem;
  }

  .menuIcon {
    font-size: 2rem;
    color: #f6efe8;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .link {
    color: #004b3d;
    text-decoration: none;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .signUp {
    background-color: #004b3d;
    color: #fff;
    border: 1px solid #004b3d;
    border-radius: 50px;
    padding: 0.5rem 1rem;
    text-align: center;
  }

  .login {
    background-color: #fff;
    color: #004b3d;
    border: 1px solid #004b3d;
    border-radius: 50px;
    padding: 0.5rem 1rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .auth {
    display: flex;
    flex-direction: column;
  }
`;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target='_blank' rel='noopener noreferrer'>
        👋 ​⛰️
      </a>
    ),
  },
];

const MobileNavbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <MobileNavbarContainer>
        <div className='logo'>Convert.</div>
        <MenuOutlined className='menuIcon' onClick={showDrawer} />
      </MobileNavbarContainer>
      <Drawer placement='right' onClose={closeDrawer} open={visible}>
        <DrawerContent>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a className='link' onClick={(e) => e.preventDefault()}>
              <Space>
                Features
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <a className='link' onClick={(e) => e.preventDefault()}>
            Pricing
          </a>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a className='link' onClick={(e) => e.preventDefault()}>
              <Space>
                Use cases
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a className='link' onClick={(e) => e.preventDefault()}>
              <Space>
                Ressources
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <div className='auth'>
            <a className='login' onClick={(e) => e.preventDefault()}>
              Login
            </a>
            <a className='signUp' onClick={(e) => e.preventDefault()}>
              Sign up
            </a>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
