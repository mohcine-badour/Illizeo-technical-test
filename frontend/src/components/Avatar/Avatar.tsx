type AvatarProps = {
  username: string;
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Avatar({ username }: AvatarProps) {
  const initials = getInitials(username);

  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-amber-500 rounded-full">
      <span className="font-medium text-white">{initials}</span>
    </div>
  );
}

