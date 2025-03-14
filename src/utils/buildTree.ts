import { Item } from "../models/Item";

export const buildTree = (items: Item[]): Item[] => {
    const map = new Map<number, Item>();
    const rootNodes: Item[] = [];

    items.forEach((item) => map.set(item.id, item));

    items.forEach((item) => {
        if (item.parentId !== null) {
            const parent = map.get(item.parentId);
            if (parent) {
                parent.children.push(item);
            }
        } else {
            rootNodes.push(item);
        }
    });

    return rootNodes;
};