import { FC, ReactNode } from 'react';

interface LoginCardProps {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  icon: ReactNode;
}

const LoginCard: FC<LoginCardProps> = ({ title, description, linkText, linkUrl, icon }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm mx-auto text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-800 p-4 rounded-full">
          {icon}
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      <a href={linkUrl} className="text-purple-400 font-semibold flex items-center justify-center">
        {linkText} <span className="ml-2">→</span>
      </a>
    </div>
  );
};

export default LoginCard;
