import { useState } from "react";
import axiosInstance from "../lib/axiosInstance"; // Import the Axios instance
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { formStyles } from "../styles/styles";

// Add a new FormCheckbox component
const FormCheckbox = ({ 
  label, 
  checked, 
  onChange, 
  'aria-describedby': ariaDescribedBy 
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  'aria-describedby'?: string;
}) => {
  return (
    <div style={formStyles.group}>
      <label style={{
        ...formStyles.label,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer'
      }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby={ariaDescribedBy}
          style={{ cursor: 'pointer' }}
        />
        {label}
      </label>
    </div>
  );
};

export const AddMealForm = ({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSubmit?: () => void;
}) => {
  const [formData, setFormData] = useState({
    meal_date: '',
    meal_name: '',
    quantity: '1pc'  // Default value
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Matches your backend's expected structure
      const response = await axiosInstance.post("/meals", {
        meal_date: formData.meal_date,
        meal_name: [formData.meal_name],
        quantity: formData.quantity
      });

      if (response.status === 201) {
        console.log('Meal added successfully:', response.data);
        if (onSubmit) {
          onSubmit(); // Call the optional onSubmit callback (for refreshing the list or similar)
        }
        onClose(); // Close the modal
      } else {
        console.error("Failed to add meal:", response);
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Meal">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Menu Name"
          type="text"
          value={formData.meal_name}
          onChange={(value) => setFormData({ ...formData, meal_name: value })}
          placeholder="Enter meal name"
          required
          aria-describedby="mealNameDescription"
        />
        <FormInput
          label="Quantity"
          type="text"
          value={formData.quantity}
          onChange={(value) => setFormData({ ...formData, quantity: value })}
          placeholder="Enter quantity (e.g., 1pc, 8 fl oz)"
          required
          aria-describedby="quantityDescription"
        />
        <FormInput
          label="Date"
          type="date"
          value={formData.meal_date}
          onChange={(value) => setFormData({ ...formData, meal_date: value })}
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

  
export const AddEventForm = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit?: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      date: '',
      time: '',
      isHighlight: false
    });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        // Make POST request to add a new event
        const response = await axiosInstance.post("/event", {
          event_name: formData.name,
          event_date: formData.date,
          start_time: formData.time,
          end_time: formData.time,  // You may need to use an additional field for end time if needed
          isHighlight: formData.isHighlight,
        });
  
        if (response.status === 201) {
          console.log('Event added successfully:', response.data);
          if (onSubmit) {
            onSubmit(); // Call the optional onSubmit callback (for refreshing the list or similar)
          }
          onClose(); // Close the modal
        } else {
          console.error("Failed to add event:", response);
        }
      } catch (error) {
        console.error("Error adding event:", error);
      }
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
            aria-describedby="eventNameDescription"
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
          <FormCheckbox
            label="Highlight of Day"
            checked={formData.isHighlight}
            onChange={(checked) => setFormData({ ...formData, isHighlight: checked })}
            aria-describedby="highlightDescription"
          />
          <div style={formStyles.buttons}>
            <button type="button" onClick={onClose} style={formStyles.cancelBtn} aria-label="Cancel event creation">
              Cancel
            </button>
            <button type="submit" style={formStyles.submitBtn} aria-label="Submit event details">
              Add Event
            </button>
          </div>
        </form>
      </Modal>
    );
  };