import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Header } from "./components/Header/Header";
import { useFileStore } from "./store/fileStore";
import { Item } from "./components/Item/Item";
import { FileType } from "./models/Item";

import styles from './App.module.css'

interface FilesProps {
    id: number
    type: FileType
    parentId: number | null
    name: string
    isFavorite: boolean
    children: FilesProps[]
}

const FileList = () => {
    const { files, isLoading, fetchFiles } = useFileStore();
    const { parentId } = useParams<{ parentId?: string }>();
    const [currentFiles, setCurrentFiles] = useState<FilesProps[]>([]);

    useEffect(() => {
        if (files.length === 0) {
            fetchFiles();
        }
    }, [fetchFiles, files.length]);

    useEffect(() => {
        if (parentId) {
            const parentFolder = findFolderById(Number(parentId), files);
            if (parentFolder) {
                setCurrentFiles(parentFolder.children || []);
            }
        } else {
            setCurrentFiles(files);
        }
    }, [parentId, files]);


    const findFolderById = (id: number, files: FilesProps[]): FilesProps | null => {
        for (let file of files) {
            if (file.id === id) {
                return file;
            }
            if (file.children) {
                const foundInChildren = findFolderById(id, file.children);
                if (foundInChildren) {
                    return foundInChildren;
                }
            }
        }
        return null;
    };

    if (isLoading) return <p>Загрузка...</p>;

    return (
        <div>
            {currentFiles.length > 0 ? (
                currentFiles.map(item => (
                    <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        isFavorite={item.isFavorite}
                        itemsCount={currentFiles.length}
                    />
                ))
            ) : (
                <p>Нет файлов в этой папке</p>
            )}
        </div>
    );
};

export const App = () => (
    <div className={styles.App}>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<FileList />} />
                <Route path="/folder/:parentId" element={<FileList />} />
            </Routes>
        </Router>
    </div>
);