// conponents/ToggleCheckButton.js

const ToggleCheckButton = ({ id, label, isChecked, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full mb-2">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={onChange}
          />
          <div className="block bg-[#ffefd2] w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-slate-500 w-6 h-6 rounded-full transition"></div>
        </div>
        <div className="ml-3 text-gray-600 font-medium">{label}</div>
      </label>
    </div>
  );
};
export default ToggleCheckButton;
