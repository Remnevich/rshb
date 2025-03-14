import React from "react";
import { FolderTree } from 'lucide-react';
import {ActionButton} from "../ActionButton/ActionButton";

import styles from "./Header.module.css"

export const Header: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <FolderTree color='gray'/>
                <h2>Ваши файлы</h2>
            </div>
            <div className={styles.subContainer}>
                <ActionButton type='create' name='Создать папку'/>
                <ActionButton type='upload' name='Загрузить файл'/>
            </div>
        </div>
    );
}