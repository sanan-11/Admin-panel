import React, { useEffect, useState } from "react";
import { Typography, Card, Space, Statistic,Table } from "antd";
// import RecentOrders from '../Dashboard/Dashboard'
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../../API/API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0)
  const [inventory, setInventory] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    getOrders().then((res)=>{
      setOrders(res.total);
      setRevenue(res.discountedTotal)
    });
    getInventory().then((res)=>{
      setInventory(res.total);
    });
    getCustomers().then((res)=>{
      setCustomers(res.total);
    });
    
    
  }, [])
  
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>DashBoard</Typography.Title>
      <Space direction="horizontal">
        <DashBoardCard
          icon={<ShoppingCartOutlined 
            style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8
              }}
          />}
          title={"Orders"}
          value={orders}
        />
        <DashBoardCard
          icon={<ShopOutlined 
          style={{
            color: "blue",
            backgroundColor: "rgba(0,0,255,0.25)",
            borderRadius: 20,
            fontSize: 24,
            padding: 8
          }}
          />}
          title={"Inventory"}
          value={inventory}
        />
        <DashBoardCard
          icon={<UserOutlined 
            style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8
              }}
          />}
          title={"Customer"}
          value={customers}
        />
        <DashBoardCard
          icon={<DollarCircleOutlined 
            style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8
              }}
          />}
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders/>
        <DashBoardChart/>
      </Space>
    </Space>
  );
}

function DashBoardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
  function RecentOrders(){
    const [dataSource ,setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
    getOrders().then(res=>{
      setDataSource(res.products.slice(0,3))
      setLoading(false)
    })
    }, [])
    return (
      <>
      <Typography.Text>Recent Orders</Typography.Text>
    <Table
      columns={[
        {
        title: "title",
        dataIndex: "title"
      },
        {
        title: "Quantity",
        dataIndex: "quantity"
      },
        {
        title: "Price",
        dataIndex: "discountedPrice"
      },
    ]}
    loading={loading}
    dataSource={dataSource}
    pagination={false}
    ></Table>
    </>
  );
  }

function DashBoardChart(){
  const [revenueData, setRevenueData] = useState({
    labels : [],
    datasets: []
  });

  useEffect(() => {
    getRevenue().then(res=>{
      const lables = res.carts.map(cart=>{
        return `User-$ ${cart.userID}`;
      })
      const data = res.carts.map(cart=>{
        return cart.discountedTotal;
      })
          const dataSource = {
            labels: lables,
            datasets: [
              {
                label: 'Revenue',
                data: data,
                backgroundColor: 'rgba(255, 0, 0, 1)',
              },
            ],
          };
          setRevenueData(dataSource);
    })
    
  }, [])
  
 const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };

  return (
  <Card style={{width: 500, height:250}}>
  <Bar options={options} data={revenueData} />
  </Card>
);
}
export default Dashboard;
