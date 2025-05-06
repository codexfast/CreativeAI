import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from 'react';
  
  const STORAGE_KEY = 'ui';
  
  interface StorageData {
    quality: string;
    orientation: string;
    quantity: number;
  }
  
  interface LocalStorageContextType {
    data: StorageData;
    setData: React.Dispatch<React.SetStateAction<StorageData>>;
  }
  
  const defaultValues: StorageData = {
    quality: '',
    orientation: '',
    quantity: 0,
  };
  
  const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);
  
  export const useLocalStorage = (): LocalStorageContextType => {
    const context = useContext(LocalStorageContext);
    if (!context) {
      throw new Error('useLocalStorage deve ser usado dentro de um LocalStorageProvider');
    }
    return context;
  };
  
  interface ProviderProps {
    children: ReactNode;
  }
  
  export const LocalStorageProvider = ({ children }: ProviderProps) => {
    const [data, setData] = useState<StorageData>(() => {
      try {
        const item = localStorage.getItem(STORAGE_KEY);
        return item ? JSON.parse(item) : defaultValues;
      } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return defaultValues;
      }
    });
  
    useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
      }
    }, [data]);
  
    return (
      <LocalStorageContext.Provider value={{ data, setData }}>
        {children}
      </LocalStorageContext.Provider>
    );
  };
  