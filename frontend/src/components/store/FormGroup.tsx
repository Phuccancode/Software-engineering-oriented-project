import React from 'react';
import styles from '../../styles/StoreCreation.module.css';

interface FormGroupProps {
    label: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ label }) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.formLabel}>{label}</label>
            <input type="text" className={styles.formInput} aria-label={label} />
        </div>
    );
};

export default FormGroup;