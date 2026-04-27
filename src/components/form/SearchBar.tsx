'use client';

import { CiSearch } from 'react-icons/ci';

type SearchBarProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchBar({ id, value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="flex overflow-hidden rounded-xs border border-gray-700 bg-gray-600 focus-within:border-gray-700">
      <span className="flex items-center border-r border-gray-700 bg-gray-700 px-4 py-3 text-white">
        <CiSearch className="text-xl" />
      </span>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-gray-600 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-200 placeholder:uppercase"
        placeholder={placeholder}
      />
    </div>
  );
}
