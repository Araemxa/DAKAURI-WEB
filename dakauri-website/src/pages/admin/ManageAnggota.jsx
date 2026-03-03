import React, { useState, useEffect } from 'react';
import ManageContent from '../../components/admin/ManageContent';
import AdminLayout from '../../components/admin/AdminLayout';
import { anggotaAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ManageAnggota = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await anggotaAPI.getAll();
        setData(result);
      } catch (error) {
        console.error('Error fetching anggota:', error);
        toast.error('Gagal memuat data anggota');
      }
    };
    fetchData();
  }, []);

  const fields = [
    {
      name: 'nama',
      label: 'Nama Lengkap',
      type: 'text',
      required: true,
      searchable: true,
      placeholder: 'Masukkan nama lengkap'
    },
    {
      name: 'jabatan',
      label: 'Jabatan',
      type: 'select',
      required: true,
      searchable: true,
      options: [
        { value: 'ketua', label: 'Ketua' },
        { value: 'wakil', label: 'Wakil Ketua' },
        { value: 'sekretaris_1', label: 'Sekretaris 1' },
        { value: 'sekretaris_2', label: 'Sekretaris 2' },
        { value: 'bendahara_1', label: 'Bendahara 1' },
        { value: 'bendahara_2', label: 'Bendahara 2' },
        { value: 'koordinator', label: 'Koordinator' },
        { value: 'anggota', label: 'Anggota' }
      ],
      render: (value) => {
        const labels = {
          ketua: 'Ketua',
          wakil: 'Wakil Ketua',
          sekretaris_1: 'Sekretaris 1',
          sekretaris_2: 'Sekretaris 2',
          bendahara_1: 'Bendahara 1',
          bendahara_2: 'Bendahara 2',
          koordinator: 'Koordinator',
          anggota: 'Anggota'
        };
        return labels[value] || value;
      }
    },
    {
      name: 'divisi',
      label: 'Divisi',
      type: 'select',
      searchable: true,
      options: [
        { value: 'BPH', label: 'BPH' },
        { value: 'SOSMAS', label: 'SOSMAS' },
        { value: 'PSDM', label: 'PSDM' },
        { value: 'KOMINFO', label: 'KOMINFO' },
        { value: 'KWU', label: 'KWU' }
      ]
    },
    {
      name: 'foto',
      label: 'Foto',
      type: 'image',
      fullWidth: true
    },
    {
      name: 'sort_order',
      label: 'Urutan',
      type: 'number',
      min: 0,
      placeholder: '0',
      defaultValue: 0
    },
    {
      name: 'is_active',
      label: 'Status',
      type: 'checkbox',
      checkboxLabel: 'Tampilkan di halaman publik',
      defaultValue: true
    }
  ];

  const handleSave = async (item, action) => {
    try {
      if (action === 'create') {
        const result = await anggotaAPI.create(item);
        setData(prev => [result, ...prev]);
      } else {
        const result = await anggotaAPI.update(item.id, item);
        setData(prev => prev.map(d => d.id === item.id ? result : d));
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Gagal menyimpan data anggota');
      throw error;
    }
  };

  const handleDelete = async (item) => {
    try {
      await anggotaAPI.delete(item.id);
      setData(prev => prev.filter(d => d.id !== item.id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Gagal menghapus data anggota');
      throw error;
    }
  };

  return (
    <AdminLayout title="Kelola Anggota">
      <ManageContent
        title="Kelola Anggota"
        description="Kelola data anggota, pengurus, dan koordinator DAKAURI"
        fields={fields}
        initialData={data}
        onSave={handleSave}
        onDelete={handleDelete}
        itemName="Anggota"
      />
    </AdminLayout>
  );
};

export default ManageAnggota;
