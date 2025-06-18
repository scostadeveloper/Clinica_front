import { ReactNode } from 'react';

interface TableProps {
  columns: { label: string; key: string | number; className?: string }[];
  data: any[];
  actions?: (row: any) => ReactNode;
}

export default function Table({ columns, data, actions }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-[#d6c3a1]/30 bg-[#1e332c]">
      <table className="min-w-full divide-y divide-[#d6c3a1]/20">
        <thead className="bg-[#22382f]">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className={`px-4 py-3 text-center text-xs font-bold text-[#d6c3a1] uppercase tracking-wider ${col.className || ''}`}>{col.label}</th>
            ))}
            {actions && <th className="px-4 py-3 text-center text-xs font-bold text-[#d6c3a1] uppercase">AÇÕES</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#d6c3a1]/10">
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center text-[#d6c3a1] py-6">Nenhum registro encontrado.</td>
            </tr>
          )}
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#22382f]/60 transition">
              {columns.map((col) => (
                <td key={col.key as string} className={`px-4 py-2 text-center text-[#f5f5f5] ${col.className || ''}`}>{row[col.key]}</td>
              ))}
              {actions && <td className="px-4 py-2 text-center align-middle flex justify-center items-center">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 