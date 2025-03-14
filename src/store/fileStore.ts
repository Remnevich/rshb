import { create } from "zustand";
import { FileType, Item } from "../models/Item";
import { buildTree } from "../utils/buildTree";

interface FileStore {
    files: Item[]
    isLoading: boolean
    fetchFiles: () => void
    toggleFavorite: (id: number) => void
}

export const useFileStore = create<FileStore>((set) => ({
    files: [],
    isLoading: true,
    fetchFiles: () => {
        set({ isLoading: true });

        setTimeout(() => {
            const rawData = [
                {id: 1, type: "dir", parentId: null, name: "Ваши файлы", isFavorite: false },
                { id: 2, type: "dir", parentId: 1, name: "second", isFavorite: false },
                { id: 3, type: "dir", parentId: 1, name: "test", isFavorite: true },
                { id: 4, type: "dir", parentId: 1, name: "third", isFavorite: false },
                { id: 5, type: "file", parentId: 1, name: "photo.jpg", isFavorite: true },
                { id: 6, type: "dir", parentId: 2, name: "Вложенная папка", isFavorite: false },
                { id: 7, type: "dir", parentId: 6, name: "Глубокое вложение", isFavorite: false },
            ];


            const items = rawData.map((row) => new Item({
                ...row,
                type: row.type as FileType
            }));
            const tree = buildTree(items);

            console.log("Файловая структура:", tree);

            set({ files: tree, isLoading: false });
        }, 1000);
    },

    toggleFavorite: (id) => {
        set((state) => {
            const updateFavorite = (items: Item[]): Item[] =>
                items.map(item => ({
                    ...item,
                    isFavorite: item.id === id ? !item.isFavorite : item.isFavorite,
                    children: updateFavorite(item.children)
                }));

            return { files: updateFavorite(state.files) };
        });

        setTimeout(() => console.log(`Изменен статус избранного у файла с id: ${id}`), 500);
    }
}));