import React from "react";
import { FolderInput, Upload } from 'lucide-react';

import styles from './ActionButton.module.css'

interface ActionButtonProps {
    type: string
    name: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({type, name}) => {
    return (
        <div className={`${styles.actionButton} ${type === 'create' ? styles.create : styles.upload}`}>
            { type === 'create' ? <FolderInput /> : <Upload /> }
            <div>{ name }</div>
        </div>
    );
}