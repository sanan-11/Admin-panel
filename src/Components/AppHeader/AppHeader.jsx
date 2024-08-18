import React, { useEffect, useState } from 'react'
import { Badge,Image,Space,Typography,Drawer,List } from 'antd';
import {MailOutlined,BellFilled} from '@ant-design/icons';
import image from './logo-06.png'
import { getComments, getOrders } from '../../API/API';

function AppHeader() {
  const [comments, setComments] = useState([])
  const [orders, setOrders] = useState([])
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  useEffect(() => {
   getComments().then(res=>{
    setComments(res.comments)
   });
   getOrders().then(res=>{
    setOrders(res.products)
   });
    
  }, [])
  
  return (
    <div className='AppHeader'>
      <img src={image} alt="" width='100px' />
      {/* <Image>
        width={40}
        src="https://orcaclantech.com/wp-content/uploads/2020/09/logo-06.png"
      </Image> */}
      <Typography>DashBoard</Typography>
      <Space>
        <Badge count={comments.length } dot>
          <MailOutlined style={{fontSize:24}} onClick={()=>{
                setCommentsOpen(true);
          }}/>
        </Badge>
        <Badge count={orders.length}>
        <BellFilled style={{fontSize:24}}  onClick={()=>{
                setNotificationsOpen(true);
          }}/>
        </Badge>
      </Space>
      <Drawer title="Comments" open={commentsOpen} onClose={()=>{
        setCommentsOpen(false)
      }} marksClosable
      >
        <List dataSource={comments} renderItem={(item)=>{
        return  <List.Item>{item.body}</List.Item>
        }}></List>
      </Drawer>
      <Drawer title="Notifications" open={notificationsOpen} onClose={()=>{
        setNotificationsOpen(false)
      }} marksClosable
      >
        <List dataSource={orders} renderItem={(item)=>{
        return  <List.Item><Typography.Paragraph strong>{item.title}</Typography.Paragraph> has been ordered</List.Item>
        }}></List>
      </Drawer>
    </div>
  )
}

export default AppHeader;