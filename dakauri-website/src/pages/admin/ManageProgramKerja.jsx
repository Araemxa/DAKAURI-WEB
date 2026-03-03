import React, { useState, useEffect } from 'react';
import ManageContent from '../../components/admin/ManageContent';
import AdminLayout from '../../components/admin/AdminLayout';
import { programKerjaAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ManageProgramKerja = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await programKerjaAPI.getAll();
        setData(result.map(item => ({
          ...item,
          start_date: item.start_date ? item.start_date.split('T')[0] : '',
          end_date: item.end_date ? item.end_date.split('T')[0] : ''
        })));
      } catch (error) {
        console.error('Error fetching program kerja:', error);
        toast.error('Gagal memuat data program kerja');
      }
    };
    fetchData();
  }, []);

  const fields = [
    {
      name: 'title',
      label: 'Nama Program',
      type: 'text',
      required: true,
      searchable: true,
      placeholder: 'Masukkan nama program'
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: [
        { value: 'konservasi', label: 'Konservasi' },
        { value: 'edukasi', label: 'Edukasi' },
        { value: 'sosial', label: 'Sosial' },
        { value: 'riset', label: 'Riset' },
        { value: 'ekspedisi', label: 'Ekspedisi' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'akan-datang', label: 'Akan Datang' },
        { value: 'berlangsung', label: 'Sedang Berlangsung' },
        { value: 'selesai', label: 'Selesai' }
      ]
    },
    {
      name: 'location',
      label: 'Lokasi',
      type: 'text',
      placeholder: 'Masukkan lokasi kegiatan'
    },
    {
      name: 'start_date',
      label: 'Tanggal Mulai',
      type: 'date',
      required: true
    },
    {
      name: 'end_date',
      label: 'Tanggal Selesai',
      type: 'date'
    },
    {
      name: 'participants',
      label: 'Jumlah Peserta',
      type: 'number',
      min: 0,
      placeholder: '0'
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
      required: true,
      searchable: true,
      fullWidth: true,
      placeholder: 'Masukkan deskripsi program',
      rows: 4
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
        const result = await programKerjaAPI.create(item);
        setData(prev => [result, ...prev]);
      } else {
        const result = await programKerjaAPI.update(item.id, item);
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
      await programKerjaAPI.delete(item.id);
      setData(prev => prev.filter(d => d.id !== item.id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Gagal menghapus data');
      throw error;
    }
  };

  return (
    <AdminLayout title="Kelola Program Kerja">
      <ManageContent
        title="Kelola Program Kerja"
        description="Kelola program kerja dan kegiatan DAKAURI"
        fields={fields}
        initialData={data}
        onSave={handleSave}
        onDelete={handleDelete}
        itemName="Program"
      />
    </AdminLayout>
  );
};

export default ManageProgramKerja;
