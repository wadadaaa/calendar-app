import PropTypes from "prop-types";

const Modal = ({ children, onClose, showModal }) => {
  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="bg-gray-800 border-dashed border-2 border-gray-200 p-4 rounded-lg w-1/2"
            style={{ zIndex: 999 }}
          >
            <button className="absolute top-10 right-10" onClick={onClose}>
              X
            </button>
            {children}
          </div>
          <div
            className="fixed top-0 left-0 w-full h-full z-40 bg-black opacity-70 backdrop-filter backdrop-blur-lg"
            style={{ zIndex: 998 }}
          ></div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default Modal;
