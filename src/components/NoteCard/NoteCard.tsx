/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner } from '../../icons';

import { autoGrow, bodyParser, setNewOffset, setZIndex } from '../../common/utils';
import { Note } from '../../common/types';

import styles from './NoteCard.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { db } from '../../appwrite/databases';
import { DeleteButton } from '../';
import { NoteContext } from '../../context/NoteContext';

interface Props {
  note: Note;
}

export function NoteCard({ note }: Props) {
  const { setSelectedNote } = useContext<any>(NoteContext);

  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const mouseStartPos = { x: 0, y: 0 };

  const [saving, setSaving] = useState(false);
  const [position, setPosition] = useState(JSON.parse(note.position));

  const keyUpTimer = useRef<any>(null);
  const cardRef = useRef<any>(null);  
  const bodyTextRef = useRef<any>(null);

  useEffect(() => {
    autoGrow(bodyTextRef);
    setZIndex(cardRef.current);
  }, []);

  const handleBodyTextKeyUp = async () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      handleSaveData('body', bodyTextRef.current.value);
    }, 2000);
  }

  const handleSaveData = async (key: string, value: any) => {
    const payload = { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, payload);
    } catch (err) {
      console.error(err);
    }

    setSaving(false);
  }

  const handleMouseMove = (e: any) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    const newPosition = setNewOffset(cardRef.current);
    handleSaveData('position', newPosition);
  }

  const handleMouseDown = (e: any) => {
    if (e.target.dataset.id !== 'card-header') return;

    setZIndex(cardRef.current);
    
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    setSelectedNote(note);
  }

  const handleBodyTextInputChange = () => autoGrow(bodyTextRef);

  const handleBodyTextFocus = () => {
    setZIndex(cardRef.current);
    setSelectedNote(note);
  };

  return (
    <div
      ref={cardRef}
      data-id={'card'}
      className={styles.card}
      style={{ 
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px` 
      }}
    >
      <div
        className={styles.header} 
        style={{ backgroundColor: colors.colorHeader }}
        data-id={'card-header'}
        onMouseDown={handleMouseDown}>
          <DeleteButton noteId={note.$id} />
          {saving && (
              <div className={styles.cardSaving}>
                <Spinner color={ colors.colorText }/>
                <span style={{ color: colors.colorText }}>
                  Saving...
                </span>
              </div>
          )}
      </div>
      <div className={styles.body}>
        <textarea
          ref={bodyTextRef}
          onInput={handleBodyTextInputChange}
          onFocus={handleBodyTextFocus}
          onKeyUp={handleBodyTextKeyUp}
          className={styles.bodyText}
          style={{ color: colors.colorText}} 
          defaultValue={body} 
        />
      </div>
    </div>
  )
}
