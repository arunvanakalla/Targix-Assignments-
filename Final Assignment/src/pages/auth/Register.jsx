import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, message } from 'antd';
import { register as registerApi } from '../../services/authService';
import '../../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();

  // Mutation for registration
  const registerMutation = useMutation({
    mutationFn: (values) => registerApi({
      username: values.username,
      email: values.email,
      password: values.password,
    }),
    onSuccess: () => {
      // Show success message
      message.success('Registration successful! Waiting for admin approval.');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      // Show error message
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      message.error(errorMessage);
    },
  });

  const onFinish = (values) => {
    // Check if passwords match
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    registerMutation.mutate(values);
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">P</div>
          <h2 className="auth-title">
            Project Management System
          </h2>
          <h3 className="auth-subtitle">
            Create your account
          </h3>
        </div>
        
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter your username' },
              { min: 3, message: 'Username must be at least 3 characters' }
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

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
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be at least 8 characters" },
              { pattern: /[A-Z]/, message: "Must include an uppercase letter" },
              { pattern: /[a-z]/, message: "Must include a lowercase letter" },
              { pattern: /\d/, message: "Must include a number" },
              { pattern: /[@$!%*?&]/, message: "Must include a special character" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item className="auth-submit">
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={registerMutation.isPending}
              className="auth-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <span>Already have an account? </span>
          <Button type="link" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;