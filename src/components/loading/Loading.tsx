import { LoadingOutlined } from "@ant-design/icons"
import { Flex, Spin } from "antd"

export const Loading = () => {
    return (
        <Flex justify="center" align="center" style={{ width: '100%', height: '100vh', maxHeight: '100%' }}>
            <Spin
            indicator={
                <LoadingOutlined
                style={{
                    fontSize: 48,
                }}
                spin
                />
            }
            />
        </Flex>
    )
}