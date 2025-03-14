import React from "react";
import { useNavigate } from "react-router-dom";
import { Folder, File, Star  } from 'lucide-react';

import {useFileStore} from "../../store/fileStore";

import styles from './Item.module.css'

interface ItemProps {
    id: number
    type: string
    name: string
    isFavorite: boolean
    itemsCount: number
}

export const Item: React.FC<ItemProps> = ({ id, type, name, isFavorite, itemsCount }) => {
    const { toggleFavorite } = useFileStore();
    const navigate = useNavigate();

    const handleClick = () => {
        if (type === 'dir') {
            navigate(`/folder/${id}`);
        }
    };

    return (
        <div className={`${styles.container} ${itemsCount === 1 && styles.broderNone}`}>
            <div className={styles.leftSide} onClick={handleClick}>
                {type === 'dir' ? <Folder fill='#e6b700' /> : <File fill='#8bc8f7' />}
                <span>{name}</span>
            </div>
            <Star
                style={{ cursor: 'pointer' }}
                fill={isFavorite ? 'yellow' : 'transparent'}
                onClick={() => toggleFavorite(id)}
            />
        </div>
    );
};