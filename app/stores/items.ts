import { defineStore } from 'pinia'

interface Item {
  id: string
  name: string
  description: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type NewItem = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>

const DEFAULT_ITEMS: Item[] = [
  { id: '1', name: 'Fix login bug', description: 'Users cannot login with special characters in password', status: 'todo' },
  { id: '2', name: 'Update documentation', description: 'Add API endpoints documentation for v2', status: 'in-progress' },
  { id: '3', name: 'Database migration', description: 'Waiting for DevOps team to approve schema changes', status: 'blocked' },
  { id: '4', name: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for automated testing', status: 'done' },
];

export const useItemStore = defineStore('items', () => {
  
  const items = ref<Item[]>(DEFAULT_ITEMS);
  const swimlanes = ['blocked', 'in-progress', 'todo', 'done']

  const generateRandomId = (): string => {
    return crypto.randomUUID()
  }
  const addItem = (item: NewItem): Item[] => {
    items.value.push({
      ...item,
      id: generateRandomId(),
      status: item.status ?? 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return items.value;
  }

  const updateStatus = (item: Item, status: Item['status']): Item => {
    item.status = status;
    return item;
  }

  const remoteItem = (item: Item): Item[] => {
    items.value = items.value.filter(i => i.id !== item.id);
    return items.value;
  }

  return { items, addItem, updateStatus, remoteItem, swimlanes };
});
