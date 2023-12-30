import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AddSchool = () => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('image', data.image[0]); // Assuming you are allowing only one file
      formData.append('email_id', data.email_id);

      const response = await fetch('http://localhost:5172/add-school', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("School added!!!")
        console.log('School added successfully');
        // Optionally, you can reset the form after successful submission
        setValue('name', '');
        setValue('address', '');
        setValue('city', '');
        setValue('state', '');
        setValue('contact', '');
        setValue('image', '');
        setValue('email_id', '');
      } else {
        console.error('Failed to add school');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-school-container">
      <h2 className="add-school-heading">Add School</h2>
      <form className="add-school-form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <label className="add-school-label">Name:</label>
        <input className="add-school-input" {...register('name', { required: 'required' })} />

        <label className="add-school-label">Address:</label>
        <input className="add-school-input" {...register('address', { required: 'required' })} />

        <label className="add-school-label">City:</label>
        <input className="add-school-input" {...register('city', { required: 'required' })} />
   
        <label className="add-school-label">State:</label>
        <input className="add-school-input" {...register('state', { required: 'required' })} />

        <label className="add-school-label">Contact:</label>
        <input className="add-school-input" type="number" {...register('contact', { required: 'required' })} />

        <label className="add-school-label">Image:</label>
        <input
          className="add-school-input"
          type="file"
          {...register('image', { required: 'required' })}
          accept=".jpg, .jpeg, .png"
        />

        <label className="add-school-label">Email ID:</label>
        <input className="add-school-input" type="email" {...register('email_id', { required: 'required' })} />

        <button className="add-school-button" type="submit">
          Add School
        </button>
      </form>

      <p className="add-school-link">
        Want to see listed schools: <Link to="/show-school">Click Here</Link>
      </p>
    </div>
  );
};

export default AddSchool;
