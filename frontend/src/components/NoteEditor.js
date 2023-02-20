import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NoteContext } from '../context/NoteContext';

const AUTO_SAVE_TIME_OUT = 1000;

export default function NoteEditor() {
  const { register, getValues, setValue, handleSubmit } = useForm();
  const { choosenNoteId,
    updateNote,
    allNotes,
    updateNoteInState,
  } = useContext(NoteContext);
  const [createdTime, setCreatedTime] = useState(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const dateFormater = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  function handleTextareaChange(event) {
    setTextareaHeight('auto');
    const height = event.target.scrollHeight;
    setTextareaHeight(`${height}px`);
  }

  let timeoutId;
  const handleTyping = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(handleTimeout, AUTO_SAVE_TIME_OUT);
  };
  const handleTimeout = () => {
    submitNote();
  };
  const submitNote = async () => {
    const updatedNote = await updateNote({
      _id: choosenNoteId,
      title: getValues('title'),
      body: getValues('body'),
    });
    updateNoteInState(updatedNote._id, updatedNote);
  };

  useEffect(() => {
    const note = allNotes.map.get(choosenNoteId);
    if (note) {
      setValue('title', note.title);
      setValue('body', note.body);
      setCreatedTime(new Date(note.createdAt));
    }
  }, [choosenNoteId, allNotes]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      if (choosenNoteId) submitNote();
    };
  }, []);

  return (
    <div className='px-12'>
      <div className='h-5 mt-1'>
        <span className='text-gray-400 text-sm'>
          {createdTime && dateFormater.format(createdTime)}
        </span>
      </div>
      <form className='text-left' onSubmit={handleSubmit()}>
        <input
          type="text"
          placeholder="Title"
          {...register('title', {})}
          onInput={handleTyping}
          className="outline-none text-xl font-bold w-full" />
        <br />
        <textarea
          placeholder="Content" {...register('body', {})}
          onInput={(event) => {
            handleTextareaChange(event);
            handleTyping();
          }}
          style={{
            height: textareaHeight,
            minHeight: '300px',
          }}
          className="outline-none mt-2 w-full" />
      </form>
    </div>
  );
}
