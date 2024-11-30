/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faUser,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import './ContactForm.css';
import axiosInstance from "../lib/axiosInstance";
import { showError, showSuccess } from "../lib/toast";
import { getErrorMessage, isNetworkError } from "../lib/errorHandling";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [focusedField, setFocusedField] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/contact',
        data: form,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSubmitted(true);
        // showSuccess("Thank you! We'll be in touch soon.");
        // Reset form after successful submission
        setForm({
          name: '',
          phone: '',
          email: '',
        });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      if (isNetworkError(error)) {
        showError('Network error. Please try again.');
      } else {
        showError(getErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      {submitted && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <span>Thank you! We'll be in touch soon.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className={focusedField === 'name' ? 'focused' : ''}>
            Your Name
          </label>
          <div className={`input-wrapper ${focusedField === 'name' ? 'focused' : ''}`}>
            <FontAwesomeIcon 
              icon={faUser} 
              className={`field-icon ${focusedField === 'name' ? 'focused' : ''}`} 
            />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label className={focusedField === 'phone' ? 'focused' : ''}>
            Phone Number
          </label>
          <div className={`input-wrapper ${focusedField === 'phone' ? 'focused' : ''}`}>
            <FontAwesomeIcon 
              icon={faPhone} 
              className={`field-icon ${focusedField === 'phone' ? 'focused' : ''}`} 
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField('')}
              placeholder="(123) 456-7890"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label className={focusedField === 'email' ? 'focused' : ''}>
            Email Address
          </label>
          <div className={`input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className={`field-icon ${focusedField === 'email' ? 'focused' : ''}`} 
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className='formSubmit'
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;