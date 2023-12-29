import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm'
import Layout from "../../components/Layout"
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from "axios";
import { toast } from 'react-hot-toast';
import moment from "moment";

function Profile() {
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    const onFinish = async(values) =>{
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/update-doctor-profile', {...values, userId: user._id, timings: [moment(values.timings[0]).format("HH:mm"),moment(values.timings[1]).format("HH:mm"),],},{ 
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
    };

    const getDoctorData = async() =>{
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/doctor/get-doctor-info-by-id',{userId: user?._id},{
                 headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                 }
            });
            dispatch(hideLoading());
            if(response.data.success){
                setDoctor(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading()); 
        }
    };

    useEffect(()=>{
        getDoctorData();
    },[]);
  return (
    <Layout>
        <h1 className='page-title'>Doctor Profile</h1>
        <hr/>
        {doctor && <DoctorForm onFinish={onFinish} initialValues = {doctor}/>} 
    </Layout>
  )
}

export default Profile