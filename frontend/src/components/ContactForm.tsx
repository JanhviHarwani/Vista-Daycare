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

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [focusedField, setFocusedField] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="form-wrapper">
      {submitted && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <span>Thank you for your message!</span>
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

        <button type="submit" className='formSubmit'>
          <span>Send Message</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;