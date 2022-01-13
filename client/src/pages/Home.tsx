import React from 'react'
import { Col, Image, Row, Space, Tag, Typography } from 'antd'

const Home = () => {
  return (
    <Row>
      <Col span={16}>
        <div className='next'>
          <Typography.Text>Próximo Jogo - Liga</Typography.Text>
        </div>
        <Col span={24} className='nextGame'>
          <Row>
            <Col span={8} className='centralizeImage'>
              <Typography.Title level={5}>Meu Time</Typography.Title>
              <Image
                height={200}
                width={200}
                preview={false}
                src='http://lorempixel.com.br/200/200/'
              />
              <Typography.Title level={5}>(85.0) 80%</Typography.Title>
              <Space size={0}>
                <Tag color='green'>V</Tag>
                <Tag color='green'>V</Tag>
                <Tag color='green'>V</Tag>
                <Tag color='green'>V</Tag>
                <Tag color='red'>D</Tag>
                <Tag color='red'>D</Tag>
              </Space>
            </Col>
            <Col span={8} className='centralizeImage'>
              Horario
            </Col>
            <Col span={8} className='centralizeImage'>
              <Typography.Title level={5}>Adversário</Typography.Title>
              <Image
                height={200}
                width={200}
                preview={false}
                src='http://lorempixel.com.br/200/200/'
              />
              <Typography.Title level={5}>(85.0) 80%</Typography.Title>
              <Space size={0}>
                <Tag color='green'>V</Tag>
                <Tag color='green'>V</Tag>
                <Tag color='green'>V</Tag>
                <Tag color='green'>V</Tag>
                <Tag color='red'>D</Tag>
                <Tag color='red'>D</Tag>
              </Space>
            </Col>
          </Row>
        </Col>
      </Col>
      <Col span={8}>Resultados</Col>
    </Row>
  )
}

export default Home
