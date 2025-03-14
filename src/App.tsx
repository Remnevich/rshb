import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Item} from "./components/Item/Item";
import {useFileStore} from "./store/fileStore";

export const App = () => {
    const { files, isLoading, fetchFiles } = useFileStore();

    useEffect(() => {
        fetchFiles();
    }, []);

   if (isLoading) return <p>Загрузка...</p>;

    return (
        <div className="App">
            <Header />
            {files?.map((item, key) => (
                <Item
                    key={key}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    isFavorite={item.isFavorite}
                />
            ) )}
        </div>
  );
}
