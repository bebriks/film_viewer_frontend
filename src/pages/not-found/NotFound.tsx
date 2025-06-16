import { Layout } from 'antd'

import { HeaderComponent } from '../../components/header/Header'
import { FooterComponent } from '../../components/footer/Footer'

import '../../App.css'
import { SmileOutlined } from '@ant-design/icons'
import { UserActions, TuseUserStore } from '../../store/user.store'

function NotFound({ store }: {store: (TuseUserStore & UserActions)}) {

  return (
    <Layout style={{ display: 'flex', maxWidth: '100vw', minHeight: '100vh' }}>
      <HeaderComponent store={store}/>
      <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <SmileOutlined
            style={{
                fontSize: 80,
            }}
            />
            <p  style={{
                fontSize: 50,
            }}>Page Not Found</p>
      </Layout>
      <FooterComponent />
    </Layout>
  )
}

export default NotFound