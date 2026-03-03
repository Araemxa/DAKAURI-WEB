import React, { useState, useEffect } from 'react';
import ManageContent from '../../components/admin/ManageContent';
import AdminLayout from '../../components/admin/AdminLayout';
import { profileAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ManageProfil = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await profileAPI.getAll();
        setData(result);
      } catch (error) {
        console.error('Error fetching profil:', error);
        toast.error('Gagal memuat data profil');
      }
    };
    fetchData();
  }, []);

  const fields = [
    {
      name: 'title',
      label: 'Judul',
      type: 'text',
      required: true,
      searchable: true,
      placeholder: 'Masukkan judul'
    },
    {
      name: 'type',
      label: 'Tipe Konten',
      type: 'select',
      required: true,
      options: [
        { value: 'visi', label: 'Visi' },
        { value: 'misi', label: 'Misi' },
        { value: 'sejarah', label: 'Sejarah' },
        { value: 'struktur', label: 'Struktur Organisasi' },
        { value: 'tentang', label: 'Tentang' }
      ]
    },
    {
      name: 'content',
      label: 'Konten',
      type: 'textarea',
      required: true,
      searchable: true,
      fullWidth: true,
      placeholder: 'Masukkan konten',
      rows: 5
    },
    {
      name: 'sort_order',
      label: 'Urutan',
      type: 'number',
      min: 0,
      placeholder: '0'
    },
    {
      name: 'image',
      label: 'Gambar',
      type: 'image',
      fullWidth: true
    },
    {
      name: 'is_active',
      label: 'Status',
      type: 'checkbox',
      checkboxLabel: 'Tampilkan di halaman publik'
    }
  ];

  const handleSave = async (item, action) => {
    try {
      if (action === 'create') {
        const result = await profileAPI.create(item);
        setData(prev => [result, ...prev]);
      } else {
        const result = await profileAPI.update(item.id, item);
        setData(prev => prev.map(d => d.id === item.id ? result : d));
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Gagal menyimpan data');
      throw error;
    }
  };

  const handleDelete = async (item) => {
    try {
      await profileAPI.delete(item.id);
      setData(prev => prev.filter(d => d.id !== item.id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Gagal menghapus data');
      throw error;
    }
  };

  return (
    <AdminLayout title="Kelola Profil">
      <ManageContent
        title="Kelola Profil"
        description="Kelola informasi visi, misi, sejarah, dan struktur organisasi DAKAURI"
        fields={fields}
        initialData={data}
        onSave={handleSave}
        onDelete={handleDelete}
        itemName="Profil"
      />
    </AdminLayout>
  );
};

export default ManageProfil;
