import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NoteContext } from '../context/NoteContext';

const AUTO_SAVE_TIME_OUT = 800;

export default function NoteEditor() {
  const { choosenNoteId, updateNote, allNotes, updateNoteInState } = useContext(NoteContext);
  const { register, getValues, setValue } = useForm();
  let timeoutId;
  const handleTyping = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(handleTimeout, AUTO_SAVE_TIME_OUT);
  }
  const handleTimeout = () => {
    submitNote();
  }
  const submitNote = async () => {
    const updatedNote = await updateNote({
      _id: choosenNoteId,
      title: getValues('title'),
      body: getValues('body')
    })
    updateNoteInState(updatedNote._id, updatedNote);
  }

  useEffect(() => {
    const note = allNotes.map.get(choosenNoteId);
    if (note) {
      setValue('title', note.title);
      setValue('body', note.body);
    }
  }, [choosenNoteId])

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      if (choosenNoteId) submitNote();
    }
  }, [])


  return (
    <form>
      <input type="text" placeholder="title" {...register("title", {})} onInput={handleTyping} />
      <input type="text" placeholder="body" {...register("body", {})} onInput={handleTyping} />
    </form>
  );
}