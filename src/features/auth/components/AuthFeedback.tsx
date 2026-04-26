'use client';

import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineErrorOutline } from 'react-icons/md';

type AuthFeedbackProps = {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
};

export function AuthFeedback({ type, message, onClose }: AuthFeedbackProps) {
  const isError = type === 'error';

  useEffect(() => {
    const timeout = setTimeout(onClose, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={
        isError
          ? 'flex items-center gap-2 rounded-md border border-red-700 bg-red-100 px-3 py-2 text-red-500'
          : 'flex items-center gap-2 rounded-md border border-green-700 bg-green-100 px-3 py-2 text-green-500'
      }
    >
      {isError ? (
        <MdOutlineErrorOutline className="text-xl" />
      ) : (
        <FaCheckCircle className="text-lg" />
      )}

      <span className="flex-1 text-sm">{message}</span>

      <button type="button" onClick={onClose}>
        <IoMdClose />
      </button>
    </div>
  );
}
