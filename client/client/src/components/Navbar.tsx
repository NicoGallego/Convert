import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #004b3d;
  height: 10vh;

  .logo {
    font-family: 'Abril Fatface', cursive;
    font-size: 2.5rem;
    color: #f6efe8;
    font-weight: 500;
  }

  .nav {
    display: flex;
    align-items: center;
    margin-left: 2rem;
    font-size: 0.9rem;
  }

  .links,
  .auth {
    display: flex;
    align-items: center;
    background-color: #fff;
    color: #000;
    border: 1px solid #fff;
    border-radius: 50px;
    height: 50px;
  }

  .links {
    margin-right: 0.5rem;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .auth {
    margin-left: 0.5rem;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .signUp {
    background-color: #004b3d;
    color: #fff;
    border: 1px solid #004b3d;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    display: inline-block;
  }

  @media (max-width: 768px) {
    display: none;
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

const Navbar = () => {
  return (
    <NavbarContainer>
      <h1 className='logo'>Convert.</h1>
      <div className='nav'>
        <div className='links'>
          <Dropdown menu={{ items }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ margin: '0 1rem 0 1.5rem' }}
            >
              <Space>
                Features
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <a onClick={(e) => e.preventDefault()} style={{ margin: '0 1rem' }}>
            Pricing
          </a>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()} style={{ margin: '0 1rem' }}>
              <Space>
                Use cases
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ margin: '0 1.5rem 0 1rem' }}
            >
              <Space>
                Ressources
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className='auth'>
          <a
            onClick={(e) => e.preventDefault()}
            style={{ margin: '0 0.5rem 0 1.5rem' }}
          >
            <Space>Login</Space>
          </a>
          <a
            className='signUp'
            onClick={(e) => e.preventDefault()}
            style={{ margin: '0 0.5rem' }}
          >
            <Space>Sign up</Space>
          </a>
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
