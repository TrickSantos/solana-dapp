import React, { useEffect, useState } from 'react'
import { Col, Layout, Menu, Row } from 'antd'
import {
  HomeOutlined,
  LineChartOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Route, Routes } from 'react-router-dom'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import Home from 'pages/Home'
import { Vacas } from 'pages/Vacas'

export const AppRoutes = () => {
  const wallet = useAnchorWallet()
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (wallet) {
      setAddress(wallet.publicKey.toString())
    }
  }, [wallet])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider theme='light'>
        <Menu theme='light'>
          <Menu.Item key='home' icon={<HomeOutlined />}>
            Inicio
          </Menu.Item>
          <Menu.Item key='team' icon={<TeamOutlined />}>
            Meu Time
          </Menu.Item>
          <Menu.Item key='marketplace' icon={<LineChartOutlined />}>
            Transferencias
          </Menu.Item>
          <Menu.Item key='academy' icon={<SolutionOutlined />}>
            Academia de Juniores
          </Menu.Item>
          <Menu.Item key='finance' icon={<HomeOutlined />}>
            Financeiro
          </Menu.Item>
          <Menu.Item key='calendar' icon={<HomeOutlined />}>
            Calendario
          </Menu.Item>
          <Menu.Item key='league' icon={<HomeOutlined />}>
            Liga
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header className='header'>
          <Row justify='end' align='middle'>
            <Col>
              {address ? (
                <div>
                  <p>Wallet Address: {address}</p>
                </div>
              ) : (
                <WalletModalProvider>
                  <WalletMultiButton />
                </WalletModalProvider>
              )}
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content
          style={{
            margin: 24,
            backgroundColor: '#fff',
          }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/wallet' element={<Vacas />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
