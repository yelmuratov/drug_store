import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLink = [
    { id: 1, text: 'Monday to Sunday' },
    { id: 2, text: '7 am to 9 pm' },
    { id: 3, text: '45 Hudson Street' },
    { id: 4, text: 'Villa Rica, GA 30180' },
    { id: 5, text: 'Pharmacy Help Line' },
    { id: 6, text: 'Prescribing Tools' },
    { id: 7, text: 'Specialty Medications' },
    { id: 8, text: 'Pharmacy Claims' },
    { id: 9, text: '+ (713)534-2319' },
    { id: 10, text: '+ (733)364-5123' },
    { id: 11, text: '+ (265)445-1158' },
    { id: 12, text: '+ (713)534-2319' },
  ];

  return (
    <Fade direction="left" triggerOnce>
      <div className="bg-[#edede9] pt-8">
        <div className="max-w-screen-xl w-full mx-auto px-6 pb-8 sm:px-8 lg:px-16 grid grid-rows-3 text-center sm:grid-rows-1 grid-flow-row sm:grid-flow-col md:grid-cols-3 sm:grid-cols-12 gap-4">
        <Link to="/" className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left"><div className="flex items-center space-x-4"><img className="w-12 select-none" src="favicon.png" alt="logo"/><h1 className="text-3xl font-semibold text-blue-600 brand-font select-none">Pharmacy Uz</h1></div></Link>
          <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
            <p className="text-black-600 mb-4 font-medium text-lg">Working Hours</p>
            <ul className="text-black-500">
              {footerLink.slice(0, 4).map(item => (
                <li key={item.id} className="my-2 hover:text-orange-500 cursor-pointer transition-all">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
            <p className="text-black-600 mb-4 font-medium text-lg">Services</p>
            <ul className="text-black-500">
              {footerLink.slice(4, 8).map(item => (
                <li key={item.id} className="my-2 hover:text-orange-500 cursor-pointer transition-all">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
            <p className="text-black-600 mb-4 font-medium text-lg">Contact</p>
            <ul className="text-black-500">
              {footerLink.slice(8, 12).map(item => (
                <li key={item.id} className="my-2 hover:text-orange-500 cursor-pointer transition-all">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full bg-blue-700 py-4">
          <p className="text-center text-white font-bold">© 2024 Developed by — <a href="https://araltech.tech" target="_blank" rel="noopener noreferrer">Aral Tech</a></p>
        </div>
      </div>
    </Fade>
  );
};

export default Footer;
