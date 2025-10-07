interface UserLogoProps {
  isHovered: boolean;
  firstName: string;
  lastName: string;
}

export default function UserLogo({ isHovered , firstName, lastName  }: UserLogoProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
      <div
        className={`flex items-center ${
          isHovered ? "justify-start" : "justify-center"
        }`}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{firstName[0] + lastName[0]}</span>
        </div>

        {isHovered && (
          <div className="ml-3 transition-opacity duration-300">
            <p className="text-white text-sm font-medium">{firstName + " " + lastName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
