import React from 'react';
import { Pen, Code, Monitor, Cog, Search } from 'lucide-react';

const AdvantageItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 mb-8">
    <div className="flex-shrink-0">
      <div className="p-3 bg-blue-900 rounded-full">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

const SFCAdvantages = () => {
  const advantages = [
    {
      icon: Pen,
      title: "Designer",
      description: "UI/UX designers are responsible for the visual appearance and feel of a web application, including User Interface (UI) and User Experience (UX) design. They make design decisions and are in charge of the entire product design, including color, typography, navigation, and other elements."
    },
    {
      icon: Code,
      title: "Backend Developer",
      description: "Backend developers manage database structure, data processing, and third-party integrations. They develop web applications and manage everything in a timely manner, ensuring that data is exchanged securely and efficiently."
    },
    {
      icon: Monitor,
      title: "Frontend Developers",
      description: "They handle the visual aspect of a web app. Frontend developers determine how users will view and interact with the app, bringing the web app's layout to life by building scripts and collaborating with graphic libraries and frameworks."
    },
    {
      icon: Cog,
      title: "Product Manager",
      description: "The product manager keeps the team focused and protects the project scope. They are in charge of the budget, planning, and ensuring that the team is filled with the greatest minds."
    },
    {
      icon: Search,
      title: "Quality Assurance Engineer",
      description: "QA testing does not occur at the conclusion of the development process. Instead, the process begins once the team has created a UI layout and continues till the launch stage to guarantee that the design meets the criteria. QA assurance engineers use both automated and manual testing methods."
    }
  ];

  return (
    <div className="bg-gray-900/0 text-white p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">SFC Advantages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {advantages.map((advantage, index) => (
          <AdvantageItem key={index} {...advantage} />
        ))}
      </div>
    </div>
  );
};

export default SFCAdvantages;