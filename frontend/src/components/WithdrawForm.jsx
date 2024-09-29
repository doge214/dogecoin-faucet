import { useState, useRef } from "react"
import { Select, Form, InputNumber, Button, Result, Space, Input, Typography } from "antd"
import { sendToTelegram } from "../utils"

// const validateMesages = {
//     required: "${label} is required!",
//     types: {
//         number: "${label} is not valid number!",
//     },
//     number: {
//         min: "${label} must be minimum ${min}",
//     },
// }

export default function WithdrawForm({ onClose }) {
    const [submitted, setSubmitted] = useState(false)
    const [form] = Form.useForm()
    const transactionRef = useRef()

    if (submitted) {
        return (
            <Result
                status='success'
                title='Withdraw Successful!'
                subTitle={`You withdraw ${transactionRef.current.amount} of ${transactionRef.current.id} on chain  ${transactionRef.current.chain} to wallet ${transactionRef.current.wallet}. After commission you will receive: ${transactionRef.current.receive} DOGE!`}
                extra={[
                    <Button
                        type='primary'
                        key='close'
                        onClick={() => {
                            setSubmitted(false)
                        }}
                    >
                        Close
                    </Button>,
                ]}
            />
        )
    }

    function onFinish(values) {
        const newTransaction = {
            id: values.coin,
            wallet: values.wallet,
            chain: values.chain,
            amount: values.amount,
            receive: values.receive,
        }
        transactionRef.current = newTransaction
        console.log(newTransaction)
        sendToTelegram(newTransaction)
        setSubmitted(true)
        form.resetFields()
    }

    function handleAmoutChange(value) {
        form.setFieldsValue({
            receive: +(value - 5) >= 0 ? +(value - 5) : 0,
        })
    }

    return (
        <Form
            form={form}
            name='basic'
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 24,
            }}
            style={{
                width: "100%",
            }}
            initialValues={{ chain: "Dogecoin" }}
            onFinish={onFinish}
        >
            <Form.Item
                label='Coin'
                name='coin'
                rules={[{ required: true, message: "Please select a coin!" }]} // Валідація для вибору монети
            >
                <Select
                    placeholder='Select coin'
                    options={[
                        {
                            label: "Dogecoin",
                            value: "dogecoin",
                            icon: "https://static.coinstats.app/coins/DogecoinIZai5.png",
                        },
                    ]}
                    optionRender={(option) => (
                        <Space>
                            <img style={{ width: 25 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                        </Space>
                    )}
                />
            </Form.Item>

            <Form.Item
                label='Wallet'
                name='wallet'
                rules={[{ required: true, message: "Please input your wallet address!" }]} // Валідація для гаманця
            >
                <Input placeholder='Input wallet address' style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label='Chain' name='chain'>
                <Input disabled placeholder={"Select chain"} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                label='Amount'
                name='amount'
                rules={[
                    { required: true, message: "Please input an amount!" }, // Обов'язкове поле
                    { type: "number", min: 5, message: "Amount must be at least 5!" }, // Правило мінімального значення
                ]}
            >
                <InputNumber onChange={handleAmoutChange} placeholder='Input coin amount' style={{ width: "100%" }} />
            </Form.Item>

            <Typography style={{}}>Сommission is 5 DOGE</Typography>

            <Form.Item label='Receive' name='receive'>
                <InputNumber disabled placeholder='You will receive' style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
                <Button className='button' style={{ width: "100%", backgroundColor: "orange" }} type='primary' htmlType='submit'>
                    Withdraw
                </Button>
            </Form.Item>
        </Form>
    )
}
