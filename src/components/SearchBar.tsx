type searchProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: searchProps) => {

  return (
    <input
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
      w-full
      p-3
      rounded-lg
      border
      border-[var(--color-sand)]
      bg-white
      focus:outline-none
      focus:ring-2
      focus:ring-[var(--color-latte)]
    "
    />
  )
}