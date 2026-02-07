import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, message } from 'antd';
import { login as loginApi } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: ({ token, user }) => {
      login(token, user);
      message.success('Login successful!');
      navigate('/');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      message.error(errorMessage);
    },
  });

  const onFinish = (values) => {
    loginMutation.mutate({ email: values.email, password: values.password });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">T</div>
          <h2 className="auth-title">
            Ticket Now
          </h2>
          <h3 className="auth-subtitle">
            Sign in to your account
          </h3>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loginMutation.isPending}
              className="auth-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <span>Don't have an account? </span>
          <Button type="link" onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;