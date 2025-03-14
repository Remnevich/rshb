export type FileType = "dir" | "file";
export type FileExtension = "jpg" | "png" | "txt" | "pdf" | "docx" | "xlsx";

export class Item {
    id: number;
    type: FileType;
    parentId: number | null;
    name: string;
    isFavorite: boolean;
    children: Item[] = [];
    extension?: FileExtension;

    constructor(row: { id: number; type: FileType; parentId: number | null; name: string; isFavorite: boolean }) {
        this.id = row.id;
        this.type = row.type;
        this.parentId = row.parentId;
        this.name = row.name;
        this.isFavorite = row.isFavorite;

        if (this.type === "file") {
            const ext = this.name.split(".").pop();
            if (ext && ["jpg", "png", "txt", "pdf", "docx", "xlsx"].includes(ext)) {
                this.extension = ext as FileExtension;
            }
        }
    }
}