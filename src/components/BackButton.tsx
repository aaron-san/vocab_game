// import { IoIosArrowBack } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ text }: { text: string }) => (
  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
    {/* <IoIosArrowBack size={24} /> */}
    <FaArrowLeft size={18} />
    {text}
  </button>
);

export default BackButton;
