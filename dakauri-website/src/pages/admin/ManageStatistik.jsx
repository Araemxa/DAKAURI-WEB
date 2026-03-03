import React, { useState, useEffect } from 'react';
import ManageContent from '../../components/admin/ManageContent';
import AdminLayout from '../../components/admin/AdminLayout';
import { statistikAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ManageStatistik = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await statistikAPI.getAll();
        setData(result);
      } catch (error) {
        console.error('Error fetching statistik:', error);
        toast.error('Gagal memuat data statistik');
      }
    };
    fetchData();
  }, []);

  const fields = [
    {
      name: 'title',
      label: 'Judul Statistik',
      type: 'text',
      required: true,
      searchable: true,
      placeholder: 'Contoh: Pohon Ditanam'
    },
    {
      name: 'value',
      label: 'Nilai',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Masukkan nilai angka'
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'select',
      options: [
        { value: 'tree', label: 'Pohon' },
        { value: 'users', label: 'Pengguna' },
        { value: 'calendar', label: 'Kalender' },
        { value: 'trophy', label: 'Piala' },
        { value: 'heart', label: 'Hati' },
        { value: 'chart', label: 'Grafik' },
        { value: 'map', label: 'Peta' }
      ]
    },
    {
      name: 'year',
      label: 'Tahun',
      type: 'number',
      min: 2000,
      max: 2100,
      placeholder: '2024'
    },
    {
      name: 'sort_order',
      label: 'Urutan',
      type: 'number',
      min: 0,
      placeholder: '0'
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
      fullWidth: true,
      placeholder: 'Masukkan deskripsi singkat',
      rows: 3
    },
    {
      name: 'is_active',
      label: 'Status',
      type: 'checkbox',
      checkboxLabel: 'Tampilkan di halaman statistik'
    }
  ];

  const handleSave = async (item, action) => {
    try {
      if (action === 'create') {
        const result = await statistikAPI.create(item);
        setData(prev => [result, ...prev]);
      } else {
        const result = await statistikAPI.update(item.id, item);
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
      await statistikAPI.delete(item.id);
      setData(prev => prev.filter(d => d.id !== item.id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Gagal menghapus data');
      throw error;
    }
  };

  return (
    <AdminLayout title="Kelola Statistik">
      <ManageContent
        title="Kelola Statistik"
        description="Kelola data statistik organisasi DAKAURI"
        fields={fields}
        initialData={data}
        onSave={handleSave}
        onDelete={handleDelete}
        itemName="Statistik"
      />
    </AdminLayout>
  );
};

export default ManageStatistik;
