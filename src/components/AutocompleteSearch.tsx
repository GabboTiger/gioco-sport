import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Entity, HexCell, Player } from '../engine/types';
import { normalizeString, matches } from '../engine/matching';

interface AutocompleteSearchProps {
  entities: Entity[];
  usedEntityIds: string[];
  selectedHex: HexCell;
  activePlayer: Player;
  onConfirmMove: (entityId: string) => void;
  onPreviewEntity: (entity: Entity | null) => void;
  onCancel: () => void;
}

export const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  entities,
  usedEntityIds,
  selectedHex,
  activePlayer,
  onConfirmMove,
  onPreviewEntity,
  onCancel,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const usedSet = useMemo(() => new Set(usedEntityIds), [usedEntityIds]);

  const filteredEntities = useMemo(() => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return [];

    const normalizedQuery = normalizeString(trimmed);

    const matchesList = entities.filter((entity) => {
      const normName = normalizeString(entity.name);
      return normName.includes(normalizedQuery);
    });

    // Sort: 1) Valid matching entities first, 2) By popularity descending
    return matchesList.sort((a, b) => {
      const aMatches = matches(a, selectedHex.category);
      const bMatches = matches(b, selectedHex.category);
      const aUsed = usedSet.has(a.id);
      const bUsed = usedSet.has(b.id);

      const aScore = (aMatches ? 10 : 0) - (aUsed ? 20 : 0) + a.popularity * 0.1;
      const bScore = (bMatches ? 10 : 0) - (bUsed ? 20 : 0) + b.popularity * 0.1;
      return bScore - aScore;
    }).slice(0, 8);
  }, [searchTerm, entities, selectedHex.category, usedSet]);

  const handleSelect = (entity: Entity) => {
    setSelectedEntity(entity);
    onPreviewEntity(entity);

    if (usedSet.has(entity.id)) {
      setErrorNotice(`"${entity.name}" è già stato usato in questa partita!`);
    } else if (!matches(entity, selectedHex.category)) {
      setErrorNotice(`"${entity.name}" non soddisfa la categoria "${selectedHex.category.label}".`);
    } else {
      setErrorNotice(null);
    }
  };

  const handleConfirm = () => {
    if (!selectedEntity) return;

    if (usedSet.has(selectedEntity.id)) {
      setErrorNotice(`Non puoi riusare un'entità già giocata!`);
      return;
    }

    if (!matches(selectedEntity, selectedHex.category)) {
      setErrorNotice(`"${selectedEntity.name}" non rispetta la categoria "${selectedHex.category.label}".`);
      return;
    }

    onConfirmMove(selectedEntity.id);
  };

  return (
    <div
      style={{
        backgroundColor: '#121929',
        border: '1px solid #27354f',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
      }}
      className="animate-pop-in"
    >
      {/* Header with category banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: 700 }}>
            Esagono Selezionato
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
            {selectedHex.category.label}
          </div>
        </div>
        <button
          onClick={onCancel}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            fontSize: '22px',
            cursor: 'pointer',
            padding: '4px 8px',
          }}
          title="Chiudi"
        >
          ✕
        </button>
      </div>

      {/* Input */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedEntity(null);
            onPreviewEntity(null);
            setErrorNotice(null);
          }}
          placeholder="Digita nome giocatore o allenatore..."
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#0c101a',
            border: '2px solid #2b3b55',
            borderRadius: '10px',
            color: '#ffffff',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (filteredEntities.length > 0 && !selectedEntity) {
                handleSelect(filteredEntities[0]);
              } else if (selectedEntity) {
                handleConfirm();
              }
            } else if (e.key === 'Escape') {
              onCancel();
            }
          }}
        />
      </div>

      {/* Autocomplete Results */}
      {filteredEntities.length > 0 && (
        <div
          style={{
            maxHeight: '220px',
            overflowY: 'auto',
            backgroundColor: '#0c101a',
            borderRadius: '10px',
            border: '1px solid #1e293b',
            marginBottom: '14px',
          }}
        >
          {filteredEntities.map((entity) => {
            const isMatch = matches(entity, selectedHex.category);
            const isUsed = usedSet.has(entity.id);
            const isChosen = selectedEntity?.id === entity.id;

            return (
              <div
                key={entity.id}
                onClick={() => handleSelect(entity)}
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: isChosen ? '#1e293b' : 'transparent',
                  borderBottom: '1px solid #162032',
                  transition: 'background-color 0.1s',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>
                    {entity.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {entity.metadata?.displayRole ?? (entity.type === 'coach' ? 'Allenatore' : 'Giocatore')} •{' '}
                    {entity.metadata?.displayClub ?? ''} {entity.metadata?.displayNationality ? `(${entity.metadata.displayNationality})` : ''}
                  </div>
                </div>

                <div>
                  {isUsed ? (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#f87171',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Già Usato
                    </span>
                  ) : isMatch ? (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        color: '#34d399',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      ✓ Valido
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: 'rgba(100, 116, 139, 0.2)',
                        color: '#94a3b8',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Non compatibile
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Entity Preview Box */}
      {selectedEntity && (
        <div
          style={{
            backgroundColor: '#162238',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Entità scelta:</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>{selectedEntity.name}</div>
          </div>
          <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>
            Guarda la griglia per vedere conquiste e furti!
          </div>
        </div>
      )}

      {/* Error / Feedback Message */}
      {errorNotice && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#fca5a5',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '14px',
          }}
        >
          ⚠️ {errorNotice}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: 'transparent',
            color: '#94a3b8',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Annulla
        </button>

        <button
          onClick={handleConfirm}
          disabled={!selectedEntity || usedSet.has(selectedEntity.id) || !matches(selectedEntity, selectedHex.category)}
          style={{
            flex: 2,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor:
              selectedEntity && !usedSet.has(selectedEntity.id) && matches(selectedEntity, selectedHex.category)
                ? activePlayer.color
                : '#334155',
            color: '#ffffff',
            fontWeight: 800,
            cursor:
              selectedEntity && !usedSet.has(selectedEntity.id) && matches(selectedEntity, selectedHex.category)
                ? 'pointer'
                : 'not-allowed',
            transition: 'opacity 0.2s',
            opacity: selectedEntity && !usedSet.has(selectedEntity.id) && matches(selectedEntity, selectedHex.category) ? 1 : 0.6,
          }}
        >
          Conferma Conquista
        </button>
      </div>
    </div>
  );
};
