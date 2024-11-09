import { useState } from "react";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { formStyles } from "../styles/styles";

export const AddMealForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      mealType: '',
      menu: '',
      date: ''
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Submitting meal:', formData);
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Add New Meal">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Meal Type"
            type="text"
            value={formData.mealType}
            onChange={(value) => setFormData({ ...formData, mealType: value })}
            placeholder="Enter meal type (e.g., Breakfast, Lunch)"
            required
          />
          <FormInput
            label="Menu Description"
            type="text"
            value={formData.menu}
            onChange={(value) => setFormData({ ...formData, menu: value })}
            placeholder="Enter menu details"
            required
          />
          <FormInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(value) => setFormData({ ...formData, date: value })}
            required
          />
          <div style={formStyles.buttons}>
            <button type="button" onClick={onClose} style={formStyles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={formStyles.submitBtn}>
              Add Meal
            </button>
          </div>
        </form>
      </Modal>
    );
  };
  
export const AddEventForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      date: '',
      time: ''
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Submitting event:', formData);
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Add New Event">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Event Name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter event name"
            required
          />
          <FormInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(value) => setFormData({ ...formData, date: value })}
            required
          />
          <FormInput
            label="Time"
            type="time"
            value={formData.time}
            onChange={(value) => setFormData({ ...formData, time: value })}
            required
          />
          <div style={formStyles.buttons}>
            <button type="button" onClick={onClose} style={formStyles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={formStyles.submitBtn}>
              Add Event
            </button>
          </div>
        </form>
      </Modal>
    );
  };