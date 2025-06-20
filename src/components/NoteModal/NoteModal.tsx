import { createPortal } from "react-dom";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm.tsx";
import css from "./NoteModal.module.css";

interface NoteModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const NoteModal = ({ onClose, onSuccess }: NoteModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = () => {
    onClose();
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={handleModalClick}>
        <NoteForm onSuccess={onSuccess} onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
