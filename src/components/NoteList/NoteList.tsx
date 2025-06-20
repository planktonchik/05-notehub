import type { Note } from "../../types/note.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService.ts";
import css from "./NoteList.module.css";
import { toast } from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
    },
    onError: () => {
      toast.error("Failed to delete a note");
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <button
            className={css.button}
            onClick={() => handleDelete(note.id)}
            disabled={mutation.isPending}
          >
            Delete a note
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
