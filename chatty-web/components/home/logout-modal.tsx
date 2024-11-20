import Modal from 'react-modal';

type LogoutModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

// Estilo del modal (opcional, lo podés ajustar)
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#1a1a1a',
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    color: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

export const LogoutModal = ({ isOpen, onConfirm, onClose }: LogoutModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Confirm Logout"
      ariaHideApp={false}
    >
      <h2 className="text-lg font-bold mb-4">¿Seguro que querés cerrar sesión?</h2>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Sí
        </button>
      </div>
    </Modal>
  );
};
