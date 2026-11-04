import React, { useState, useMemo } from 'react';
import { HexCell } from '../engine/types';

interface CategoryLegendProps {
  board: HexCell[];
  onHoverCategory: (catId: string | null) => void;
}

export const CategoryLegend: React.FC<CategoryLegendProps> = ({ board, onHoverCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract unique categories on the board
  const activeCategories = useMemo(() => {
    const map = new Map<string, { id: string; shortLabel: string; label: string; description?: string; type: string }>();
    for (const cell of board) {
      if (!map.has(cell.category.id)) {
        map.set(cell.category.id, {
          id: cell.category.id,
          shortLabel: cell.category.shortLabel || cell.category.label,
          label: cell.category.label,
          description: cell.category.description,
          type: cell.category.type,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.shortLabel.localeCompare(b.shortLabel));
  }, [board]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '860px',
        margin: '16px auto 32px auto',
        backgroundColor: '#121929',
        border: '1px solid #1f2c42',
        borderRadius: '16px',
        padding: '14px 18px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>📖</span>
          <div>
            <span style={{ fontWeight: 800, fontSize: '14px', color: '#f8fafc' }}>
              Legenda Categorie & Abbreviazioni
            </span>
            <span
              style={{
                marginLeft: '8px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: '#1e293b',
                color: '#38bdf8',
                padding: '2px 8px',
                borderRadius: '10px',
              }}
            >
              {activeCategories.length} categorie sulla mappa
            </span>
          </div>
        </div>

        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isOpen ? 'Nascondi ▲' : 'Espandi e spiega ▼'}
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            marginTop: '16px',
            borderTop: '1px solid #1e293b',
            paddingTop: '14px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '10px',
            maxHeight: '340px',
            overflowY: 'auto',
          }}
          className="animate-pop-in"
        >
          {activeCategories.map((cat) => (
            <div
              key={cat.id}
              onMouseEnter={() => onHoverCategory(cat.id)}
              onMouseLeave={() => onHoverCategory(null)}
              style={{
                backgroundColor: '#0c101a',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#38bdf8';
                e.currentTarget.style.backgroundColor = '#162238';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.backgroundColor = '#0c101a';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    fontWeight: 800,
                    fontSize: '12px',
                    padding: '2px 6px',
                    borderRadius: '6px',
                  }}
                >
                  {cat.shortLabel}
                </span>
                <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  {cat.type}
                </span>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginTop: '3px' }}>
                {cat.label}
              </div>

              {cat.description && (
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {cat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
