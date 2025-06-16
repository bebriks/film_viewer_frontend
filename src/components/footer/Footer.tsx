import { ConfigProvider, Layout, Row, Col, Typography, Divider, Space } from 'antd';

export const FooterComponent = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            footerBg: '#FFFFFF'
          },
        },
      }}
    >
      <Layout.Footer style={{ 
        borderTop: '1px solid rgba(0,0,0,0.1)', 
        padding: '60px 0 40px',
        marginTop: 'auto'
      }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <Space>
            <Typography.Text strong style={{ fontSize: 20 }}>Film Viewer</Typography.Text>
            <Typography.Text type="secondary">Ваш киносправочник</Typography.Text>
          </Space>
          <Divider style={{ margin: '16px 0' }} />
          <Row gutter={[40, 40]}>
            <Col xs={24} sm={12} md={6}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>О нас</Typography.Title>
              <Typography.Paragraph type="secondary">
                Лучший киносправочник с актуальной информацией о фильмах, сериалах и актерах.
              </Typography.Paragraph>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>Разделы</Typography.Title>
              <Typography.Paragraph type="secondary">
                <div><a href="#" style={{ color: 'inherit' }}>Фильмы</a></div>
                <div><a href="#" style={{ color: 'inherit' }}>Сериалы</a></div>
                <div><a href="#" style={{ color: 'inherit' }}>Актеры</a></div>
                <div><a href="#" style={{ color: 'inherit' }}>Новости</a></div>
              </Typography.Paragraph>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>Помощь</Typography.Title>
              <Typography.Paragraph type="secondary">
                <div><a href="#" style={{ color: 'inherit' }}>FAQ</a></div>
                <div><a href="#" style={{ color: 'inherit' }}>Контакты</a></div>
                <div><a href="#" style={{ color: 'inherit' }}>Отзывы</a></div>
              </Typography.Paragraph>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Typography.Title level={5} style={{ marginBottom: 16 }}>Контакты</Typography.Title>
              <Typography.Paragraph type="secondary">
                <div>Email: info@movieapp.com</div>
                <div>Телефон: +7 (123) 456-78-90</div>
              </Typography.Paragraph>
            </Col>
          </Row>
          
          <Divider style={{ margin: '40px 0 24px' }} />
          
          <Typography.Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
            © {new Date().getFullYear()} Film Viewer. Все права защищены.
          </Typography.Text>
        </div>
      </Layout.Footer>
    </ConfigProvider>
  );
};