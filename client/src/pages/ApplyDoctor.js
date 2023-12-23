import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import {toast} from "react-hot-toast"
import {showLoading, hideLoading} from "../redux/alertsSlice"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function ApplyDoctor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state =>state.user);
    const onFinish = async(values) =>{
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/apply-doctor-account', {...values, userId: user._id},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if(response.data.success){
              toast.success(response.data.message);
              navigate("/");
            }
            else{
              toast.error(response.data.message);
            }
          } catch(error){
            dispatch(hideLoading())
            toast.error("Something went wrong!");
          }
    }
    
  return (
    <Layout>
        <h1 className='page-title' >Apply Doctor</h1>
        <hr/>
        <Form layout='vertical' onFinish={onFinish}>
            <h2 className='card-title mt-3'>Personal Information</h2>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="First Name" name="firstName" rules={[{required: true}]}>
                        <Input placeholder='First Name' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Last Name" name="lastName" rules={[{required: true}]}>
                        <Input placeholder='Last Name' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Phone No." name="phoneNumber" rules={[{required: true}]}>
                        <Input placeholder='Phone No.' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label="Website" name="website">
                        <Input placeholder='Website' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Address" name="address" rules={[{required: true}]}>
                        <Input placeholder='Address' />
                    </Form.Item>
                </Col>
            </Row>
            <hr/>
            <h2 className='card-title mt-3'>Professional Information</h2>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Specialization" name="specialization" rules={[{required: true}]}>
                        <Input placeholder='Specialization' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Experience" name="experience" rules={[{required: true}]}>
                        <Input placeholder='Experience (Yrs)' type='number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Fee per consultation" name="feePerConsultation" rules={[{required: true}]}>
                        <Input placeholder='Fee per consultation (Rs)' type='number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Timings" name="timings" rules={[{required: true}]}>
                        <TimePicker.RangePicker status='' />
                    </Form.Item>
                </Col>
            </Row>
            <div className='d-flex justify-content-end'>
                <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
            </div>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor