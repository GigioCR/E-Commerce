import { Link } from 'react-router-dom';
import { footerItems } from '../constants';

const Footer = () => {
  const handleItemClick = (item) => {
    console.log(`Item clicked: ${item.title}`);
  };

  return (
    <footer className="bg-black text-white w-full py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {footerItems.map((item, index) => (
            <Link to={item.link}>
            <div key={index} >
              <button onClick={() => handleItemClick(item)} className="group block text-left hover:text-gray-300 transition-colors">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>
              </button>
            </div>
            </Link>
          ))}
        </div>
        <div className="text-gray-400 text-sm text-center mt-8">
          © 2024 WonkaOutlet. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;