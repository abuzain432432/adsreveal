import React from 'react'
import { getRequrieRules, getValidateEmailRules } from '../fn-utli/form-util'
import { Input, Form, Button } from 'antd'
export default function ContactForm() {
    const contactUsFormHandler = (data) => {
        console.log(data)
    }
    return (
        <div className='xl:p-16 lg:p-12 sm:p-10 p-6 bg-white lg:mb-0 sm:mb-24 mb-16 rounded-lg contact-form shadow-md'>
            <h2 className='font-semibold lg:text-3xl text-2xl  mb-7 text-gray-700'>Send us a Message</h2>
            <Form onFinish={contactUsFormHandler} layout='vertical'>
                <Form.Item label='First Name' name={'firstName'} rules={[getRequrieRules('first name')]}>
                    <Input className='border-0 text-lg font-medium text-gray-400 border-b border-b-gray-200 rounded-none w-full hover:border-0 hover:border-b focus:border-0 focus:border-b hover:border-b-primary'></Input>
                </Form.Item>
                <Form.Item label='Email' name={'lastName'} rules={[getRequrieRules('email'), getValidateEmailRules()]}>
                    <Input className='border-0 text-lg font-medium text-gray-400 border-b border-b-gray-200 rounded-none w-full hover:border-0 hover:border-b focus:border-0 focus:border-b hover:border-b-primary'></Input>

                </Form.Item>
                <Form.Item label='Message' name={'message'} rules={[getRequrieRules('message')]}>
                    <Input.TextArea className='border-0 text-lg font-medium text-gray-400 border-b border-b-gray-200 rounded-none w-full hover:border-0 hover:border-b focus:border-0 focus:border-b hover:border-b-primary'></Input.TextArea>
                </Form.Item>
                <div className='flex justify-end'>
                    <Button htmlType='submit' className='bg-primary h-auto px-6 py-2 text-white hover:opacity-90'>Submit</Button>

                </div>
            </Form>
        </div>
    )
}
