import { Menu } from 'antd';
import React, { useEffect, useState } from 'react'
import {AppstoreOutlined,ShopOutlined,ShoppingCartOutlined,UserOutlined} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

function SideMenu() {
  const location = useLocation()
  const [selectedkeys, setSelectedkeys] = useState('/')
    useEffect(() => {
      const pathName = location.pathname
      setSelectedkeys(pathName)
      
    }, [location.pathname])
    

  const navigate = useNavigate()
  return (
    <div className='SideMenu'>
      <Menu
      className='SideMenuVertical'
      mode='vertical'
      onClick={(items)=>{
        //items.key
        navigate(items.key);
      }}
      selectedKeys={[selectedkeys]}
        items={[
          {
            label: "Dashboard",
            key: "/",
            icon: <AppstoreOutlined/>
          },
          {
            label: "Inventory",
            key: "/inventory",
            icon: <ShopOutlined/>
          },
          {
            label: "Orders",
            key: "/orders",
            icon:<ShoppingCartOutlined/>
          },
          {
            label: "Customers",
            key: "/customers",
            icon:<UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  )
}

export default SideMenu;