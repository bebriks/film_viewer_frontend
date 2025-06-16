import {  Card } from 'antd';
import { TCardProfile } from '../../api/types';
import Title from 'antd/es/typography/Title';
import Icon from '@ant-design/icons';

export const CardProfileComponent = ({data}: {data: TCardProfile}) => {

  return (
    <Card hoverable style={{ height: 'fit-content', textAlign: 'center' }}>
      <Icon component={data.icon} style={{ fontSize: '50px' }}/>
      <Title style={{ margin: 0 }}>{data.label}</Title>
    </Card>
  );
};