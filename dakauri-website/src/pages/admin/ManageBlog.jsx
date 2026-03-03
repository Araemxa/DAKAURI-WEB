import React, { useState, useEffect } from 'react';
import ManageContent from '../../components/admin/ManageContent';
import AdminLayout from '../../components/admin/AdminLayout';
import { blogAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ManageBlog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await blogAPI.getAll();
        setData(result.map(item => ({
          ...item,
          published_at: item.published_at ? item.published_at.split('T')[0] : ''
        })));
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Gagal memuat data artikel');
      }
    };
    fetchData();
  }, []);

  const fields = [
    {
      name: 'title',
      label: 'Judul Artikel',
      type: 'text',
      required: true,
      searchable: true,
      fullWidth: true,
      placeholder: 'Masukkan judul artikel'
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: [
        { value: 'kegiatan', label: 'Kegiatan' },
        { value: 'edukasi', label: 'Edukasi' },
        { value: 'tips', label: 'Tips & Trik' },
        { value: 'berita', label: 'Berita' }
      ]
    },
    {
      name: 'author',
      label: 'Penulis',
      type: 'text',
      required: true,
      placeholder: 'Nama penulis'
    },
    {
      name: 'published_at',
      label: 'Tanggal Publikasi',
      type: 'date',
      required: true
    },
    {
      name: 'read_time',
      label: 'Waktu Baca (menit)',
      type: 'number',
      min: 1,
      placeholder: '5'
    },
    {
      name: 'excerpt',
      label: 'Ringkasan',
      type: 'textarea',
      required: true,
      searchable: true,
      fullWidth: true,
      placeholder: 'Masukkan ringkasan artikel (akan ditampilkan di halaman daftar)',
      rows: 3
    },
    {
      name: 'content',
      label: 'Konten Artikel',
      type: 'textarea',
      required: true,
      fullWidth: true,
      placeholder: 'Masukkan konten lengkap artikel',
      rows: 8
    },
    {
      name: 'image',
      label: 'Gambar Utama',
      type: 'image',
      fullWidth: true
    },
    {
      name: 'is_published',
      label: 'Status Publikasi',
      type: 'checkbox',
      checkboxLabel: 'Publikasikan artikel'
    }
  ];

  const handleSave = async (item, action) => {
    try {
      if (action === 'create') {
        const result = await blogAPI.create(item);
        setData(prev => [result, ...prev]);
      } else {
        const result = await blogAPI.update(item.id, item);
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
      await blogAPI.delete(item.id);
      setData(prev => prev.filter(d => d.id !== item.id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Gagal menghapus data');
      throw error;
    }
  };

  return (
    <AdminLayout title="Kelola Blog">
      <ManageContent
        title="Kelola Blog"
        description="Kelola artikel dan berita DAKAURI"
        fields={fields}
        initialData={data}
        onSave={handleSave}
        onDelete={handleDelete}
        itemName="Artikel"
      />
    </AdminLayout>
  );
};

export default ManageBlog;
