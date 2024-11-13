import { useState } from "react";
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

export const AddMealForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    menu: '',
    servingsCount: '',
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
          label="Menu Description"
          type="text"
          value={formData.menu}
          onChange={(value) => setFormData({ ...formData, menu: value })}
          placeholder="Enter menu details"
          required
          aria-describedby="menuDescription"
        />
        <FormInput
          label="Servings"
          type="text"
          value={formData.servingsCount}
          onChange={(value) => setFormData({ ...formData, servingsCount: value })}
          placeholder="Enter number of servings"
          required
          // min="1"
          aria-describedby="servingsDescription"
        />
        <FormInput
          label="Date"
          type="date"
          value={formData.date}
          onChange={(value) => setFormData({ ...formData, date: value })}
          required
        />
        <div style={formStyles.buttons}>
          <button 
            type="button" 
            onClick={onClose} 
            style={formStyles.cancelBtn} 
            aria-label="Cancel meal creation"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={formStyles.submitBtn} 
            aria-label="Submit meal details"
          >
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
      time: '',
      isHighlight: false
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