import React from "react";
import { Folder, File, Star  } from 'lucide-react';

import {useFileStore} from "../../store/fileStore";

import styles from './Item.module.css'

interface ItemProps {
    id: number
    type: string
    name: string
    isFavorite: boolean
}

export const Item: React.FC<ItemProps> = ({id, type, name, isFavorite}) => {
    const { toggleFavorite } = useFileStore();

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                {type === 'dir' ? <Folder fill='#e6b700'/> : <File fill='#8bc8f7'/>}
                <span>{name}</span>
            </div>
            <Star
                style={{cursor: 'pointer'}}
                fill={isFavorite ? 'yellow' : 'transparent'}
                onClick={() => toggleFavorite(id)}
            />
        </div>
    );
}