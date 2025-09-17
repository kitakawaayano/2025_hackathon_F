import './SortButton.css';

const SortButton = ({ sort, handleSort, className, children }) => {
  return (
    <button onClick={() => handleSort(sort)} className={className}>
      {children}
    </button>
  );
};

export default SortButton;
