import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaTimes,
  FaSave,
  FaImage,
  FaEye
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import './ManageContent.css';

const ManageContent = ({ 
  title, 
  description,
  fields, 
  initialData = [], 
  onSave, 
  onDelete,
  itemName = 'item'
}) => {
  const [items, setItems] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    setItems(initialData);
  }, [initialData]);

  const filteredItems = items.filter(item => {
    const searchableFields = fields.filter(f => f.searchable);
    return searchableFields.some(field => 
      String(item[field.name]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      const initialFormData = {};
      fields.forEach(field => {
        initialFormData[field.name] = field.defaultValue || '';
      });
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      // Handle file upload - in real implementation, upload to server/cloud
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !formData[f.name]);
    
    if (missingFields.length > 0) {
      toast.error(`Mohon isi field: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    try {
      if (editingItem) {
        // Update existing item
        if (onSave) await onSave({ ...editingItem, ...formData }, 'update');
        toast.success(`${itemName} berhasil diperbarui`);
      } else {
        // Create new item
        const newItem = {
          ...formData,
          createdAt: new Date().toISOString()
        };
        if (onSave) await onSave(newItem, 'create');
        toast.success(`${itemName} berhasil ditambahkan`);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Save error:', error);
      toast.error(`Gagal menyimpan ${itemName.toLowerCase()}`);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (onDelete) await onDelete(itemToDelete);
      toast.success(`${itemName} berhasil dihapus`);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      toast.error('Gagal menghapus');
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            rows={field.rows || 4}
          />
        );
      
      case 'select':
        return (
          <select name={field.name} value={value} onChange={handleInputChange}>
            <option value="">Pilih {field.label}</option>
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      
      case 'image':
        return (
          <div className="image-upload">
            {value && (
              <div className="image-preview">
                <img src={value} alt="Preview" />
              </div>
            )}
            <label className="upload-btn">
              <FaImage /> Pilih Gambar
              <input
                type="file"
                name={field.name}
                accept="image/*"
                onChange={handleInputChange}
              />
            </label>
            <input
              type="text"
              name={field.name}
              value={value}
              onChange={handleInputChange}
              placeholder="Atau masukkan URL gambar"
            />
          </div>
        );
      
      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              name={field.name}
              checked={value}
              onChange={handleInputChange}
            />
            <span>{field.checkboxLabel || field.label}</span>
          </label>
        );
      
      case 'number':
        return (
          <input
            type="number"
            name={field.name}
            value={value}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            name={field.name}
            value={value}
            onChange={handleInputChange}
          />
        );
      
      default:
        return (
          <input
            type={field.type || 'text'}
            name={field.name}
            value={value}
            onChange={handleInputChange}
            placeholder={field.placeholder}
          />
        );
    }
  };

  const displayFields = fields.filter(f => f.displayInTable !== false);

  return (
    <div className="manage-content-page">
      {/* Header */}
      <div className="content-header">
        <div className="header-info">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <FaPlus /> Tambah {itemName}
        </button>
      </div>

      {/* Search */}
      <div className="content-toolbar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder={`Cari ${itemName.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="items-count">{filteredItems.length} {itemName.toLowerCase()}</span>
      </div>

      {/* Table */}
      <div className="content-table-wrapper">
        <table className="content-table">
          <thead>
            <tr>
              <th>#</th>
              {displayFields.map(field => (
                <th key={field.name}>{field.label}</th>
              ))}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={displayFields.length + 2} className="empty-cell">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td>{index + 1}</td>
                  {displayFields.map(field => (
                    <td key={field.name}>
                      {field.type === 'image' ? (
                        <img src={item[field.name]} alt="" className="table-image" />
                      ) : field.type === 'checkbox' ? (
                        <span className={`status-badge ${item[field.name] ? 'active' : 'inactive'}`}>
                          {item[field.name] ? 'Aktif' : 'Nonaktif'}
                        </span>
                      ) : field.render ? (
                        field.render(item[field.name], item)
                      ) : (
                        String(item[field.name]).substring(0, 50) + (String(item[field.name]).length > 50 ? '...' : '')
                      )}
                    </td>
                  ))}
                  <td className="actions-cell">
                    <button 
                      className="action-btn edit" 
                      onClick={() => handleOpenModal(item)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete" 
                      onClick={() => {
                        setItemToDelete(item);
                        setIsDeleteModalOpen(true);
                      }}
                      title="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{editingItem ? 'Edit' : 'Tambah'} {itemName}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {fields.map(field => (
                    <div key={field.name} className={`form-group ${field.fullWidth ? 'full-width' : ''}`}>
                      <label>
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <FaSave /> Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <motion.div
              className="modal-content delete-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="delete-icon">
                <FaTrash />
              </div>
              <h2>Konfirmasi Hapus</h2>
              <p>Apakah Anda yakin ingin menghapus {itemName.toLowerCase()} ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>
                  Batal
                </button>
                <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                  <FaTrash /> Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageContent;
