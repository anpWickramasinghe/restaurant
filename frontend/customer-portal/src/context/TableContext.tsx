import React, { createContext, useContext, useState } from 'react';

interface TableContextType {
    tableNumber: string | null;
    setTableNumber: (num: string | null) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tableNumber, setTableNumber] = useState<string | null>(null);

    return (
        <TableContext.Provider value={{ tableNumber, setTableNumber }}>
            {children}
        </TableContext.Provider>
    );
};

export const useTable = () => {
    const context = useContext(TableContext);
    if (context === undefined) {
        throw new Error('useTable must be used within a TableProvider');
    }
    return context;
};
